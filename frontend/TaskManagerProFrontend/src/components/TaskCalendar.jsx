import { useMemo, useState } from "react";
import { useGetAllTasksQuery } from "../features/api/taskApi";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";

const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "";

    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};


const getTasksByDate = (tasks) => {
    const map = {};

    tasks.forEach((task) => {
        if (!task?.dueDate) return;

        const date = formatDate(task.dueDate);
        if (!date) return;

        if (!map[date]) {
            map[date] = {
                pending: 0,
                progress: 0,
                high: 0,
                completed: 0,
                total: 0,
            };
        }

        map[date].total += 1;

    
        const taskStatus = task.status ? task.status.trim().toLowerCase() : "";

        
        if (taskStatus === "pending") {
            map[date].pending += 1;
        }
        else if (
            taskStatus === "in-progress" ||
            taskStatus === "inprogress" ||
            taskStatus === "progress" ||
            taskStatus === "in_progress"
        ) {
            map[date].progress += 1;
        }
        else if (taskStatus === "completed" || taskStatus === "complete") {
            map[date].completed += 1;
        }

        
        const taskPriority = task.priority ? task.priority.trim().toLowerCase() : "";
        if (taskPriority === "high") {
            map[date].high += 1;
        }
    });

    return map;
};


const colorMap = {
    high: "#ef4444",      // Red
    progress: "#3b82f6",  // Blue
    pending: "#f59e0b",   // Yellow
    completed: "#22c55e"  // Green
};


const DayCircle = ({
    day,
    counts,
    isToday,
    isSelected,
    onClick,
    gridIndex, 
}) => {
    const activeTypes = [];
    if (counts?.high > 0) activeTypes.push("high");
    if (counts?.progress > 0) activeTypes.push("progress");
    if (counts?.pending > 0) activeTypes.push("pending");
    if (counts?.completed > 0) activeTypes.push("completed");

    let bgStyle = "rgba(255,255,255,0.75)";
    let textColor = "#1f2937";

    if (activeTypes.length === 1) {
        bgStyle = colorMap[activeTypes[0]];
        textColor = "#ffffff";
    }
    else if (activeTypes.length === 2) {
        bgStyle = `linear-gradient(135deg, ${colorMap[activeTypes[0]]} 50%, ${colorMap[activeTypes[1]]} 50%)`;
        textColor = "#ffffff";
    }
    else if (activeTypes.length === 3) {
        bgStyle = `conic-gradient(
            ${colorMap[activeTypes[0]]} 0% 33%,
            ${colorMap[activeTypes[1]]} 33% 66%,
            ${colorMap[activeTypes[2]]} 66% 100%
        )`;
        textColor = "#ffffff";
    }
    else if (activeTypes.length >= 4) {
        bgStyle = `conic-gradient(
            ${colorMap[activeTypes[0]]} 0% 25%,
            ${colorMap[activeTypes[1]]} 25% 50%,
            ${colorMap[activeTypes[2]]} 50% 75%,
            ${colorMap[activeTypes[3]]} 75% 100%
        )`;
        textColor = "#ffffff";
    }

    //positioning based on weekday index (0-6)
    const dayOfWeek = gridIndex % 7; 
    let tooltipAlignClass = "left-1/2 -translate-x-1/2";
    let arrowAlignClass = "mx-auto";

    if (dayOfWeek === 0 || dayOfWeek === 1) {
        tooltipAlignClass = "left-0 translate-x-0";
        arrowAlignClass = "ml-3.5 mr-auto";
    } else if (dayOfWeek === 5 || dayOfWeek === 6) {
        tooltipAlignClass = "right-0 translate-x-0";
        arrowAlignClass = "mr-3.5 ml-auto";
    }

    return (
        <div className="relative group">
            <button
                onClick={onClick}
                type="button"
                className="w-7 h-7 flex items-center justify-center focus:outline-none flex-shrink-0"
            >
                <div
                    className={`
                        relative
                        w-[26px]
                        h-[26px]
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-[10px]
                        font-bold
                        transition-all
                        duration-300
                        ease-out
                        hover:scale-110
                        hover:shadow-md
                        hover:border-transparent
                        border
                        border-gray-200/50
                        shadow-sm
                        flex-shrink-0
                        aspect-square
                        ${isSelected ? "ring-2 ring-violet-500 scale-105" : ""}
                        ${isToday ? "ring-1.5 ring-black" : ""}
                    `}
                    style={{
                        background: bgStyle,
                        color: textColor
                    }}
                >
                    {day}

                    
                    {counts?.total > 0 && (
                        <div
                            className={`
                                absolute
                                bottom-10
                                opacity-0
                                translate-y-2
                                scale-95
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                group-hover:scale-100
                                transition-all
                                duration-300
                                ease-out
                                pointer-events-none
                                z-[9999]
                                ${tooltipAlignClass}
                            `}
                        >
                            
                            <div 
                                className="absolute inset-0 blur-xl opacity-40 rounded-2xl" 
                                style={{
                                    background: activeTypes.length > 0 
                                        ? `radial-gradient(circle, ${colorMap[activeTypes[0]]} 0%, transparent 70%)` 
                                        : 'rgba(139, 92, 246, 0.2)'
                                }}
                            />

                            
                            <div
                                className="
                                    relative
                                    bg-zinc-950/90
                                    text-white
                                    text-[10px]
                                    px-3.5
                                    py-3
                                    rounded-xl
                                    shadow-[0_12px_30px_-5px_rgba(0,0,0,0.5)]
                                    border
                                    border-white/10
                                    backdrop-blur-md
                                    min-w-[145px]
                                "
                            >
                          
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[8px] text-zinc-400 font-semibold tracking-wider uppercase">
                                        Tasks Summary
                                    </span>
                                    <span className="flex h-1.5 w-1.5 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
                                    </span>
                                </div>

                               
                                <div className="space-y-1.5">
                                    {counts.pending > 0 && (
                                        <div className="flex justify-between items-center text-zinc-300">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                                                <span>Pending</span>
                                            </div>
                                            <span className="font-semibold text-zinc-200">{counts.pending}</span>
                                        </div>
                                    )}

                                    {counts.progress > 0 && (
                                        <div className="flex justify-between items-center text-zinc-300">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                                                <span>In Progress</span>
                                            </div>
                                            <span className="font-semibold text-zinc-200">{counts.progress}</span>
                                        </div>
                                    )}

                                    {counts.high > 0 && (
                                        <div className="flex justify-between items-center text-zinc-300">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                                                <span>High Priority</span>
                                            </div>
                                            <span className="font-semibold text-zinc-200">{counts.high}</span>
                                        </div>
                                    )}

                                    {counts.completed > 0 && (
                                        <div className="flex justify-between items-center text-zinc-300">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                                                <span>Completed</span>
                                            </div>
                                            <span className="font-semibold text-zinc-200">{counts.completed}</span>
                                        </div>
                                    )}

                        
                                    <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-1.5" />

                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-400 font-medium">Total Balance</span>
                                        <span className="text-white text-[11px] font-bold">
                                            {counts.total || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className={`w-2.5 h-2.5 bg-zinc-950 rotate-45 -mt-1.5 border-r border-b border-white/10 ${arrowAlignClass}`} />
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
};


const TaskCalendar = () => {
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    const authReady = useSelector(
        (state) => state.auth.authReady
    );

    const shouldFetch = authReady && isAuthenticated;

    const {
        data,
        isLoading,
        isError,
    } = useGetAllTasksQuery(
        shouldFetch ? { limit: 1000 } : skipToken
    );

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const tasks = data?.data || [];

    const tasksByDate = useMemo(() => {
        return getTasksByDate(tasks);
    }, [tasks]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    const totalCells = 42;

    for (let i = 0; i < totalCells; i++) {
        const dayNumber = i - firstDay + 1;

        if (dayNumber < 1 || dayNumber > totalDays) {
            days.push(null);
        } else {
            days.push(dayNumber);
        }
    }

    const getKey = (day) => {
        if (!day) return "";

        return (
            `${year}-` +
            `${String(month + 1).padStart(2, "0")}-` +
            `${String(day).padStart(2, "0")}`
        );
    };

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    if (isLoading) {
        return (
            <div className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
                <div className="flex justify-center items-center py-6">
                    <div
                        className="
                            w-6
                            h-6
                            rounded-full
                            border-[2px]
                            border-gray-200
                            border-t-black
                            animate-spin
                        "
                    />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-center">
                <p className="text-xs font-medium text-red-500">
                    Failed to load calendar
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white/95
                shadow-sm
                p-2.5
                flex
                flex-col
                h-auto
                w-full
                max-w-[340px]
                mx-auto
                overflow-visible
                flex-shrink-0
            "
        >

            <div className="flex items-center justify-between mb-2 flex-shrink-0">
                <button
                    onClick={prevMonth}
                    type="button"
                    className="
                        w-6
                        h-6
                        rounded-full
                        bg-gray-100
                        hover:bg-gray-200
                        transition
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-bold
                    "
                >
                    ‹
                </button>

                <div className="text-center">
                    <h2 className="text-[11px] font-bold text-gray-800">
                        {currentDate.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        })}
                    </h2>

                    <p className="text-[9px] text-gray-400">
                        Task Overview
                    </p>
                </div>

                <button
                    onClick={nextMonth}
                    type="button"
                    className="
                        w-6
                        h-6
                        rounded-full
                        bg-gray-100
                        hover:bg-gray-200
                        transition
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-bold
                    "
                >
                    ›
                </button>
            </div>


            <div className="grid grid-cols-7 mb-1.5 text-center flex-shrink-0">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div
                        key={i}
                        className="
                            text-[8px]
                            font-bold
                            text-gray-400
                        "
                    >
                        {d}
                    </div>
                ))}
            </div>


            <div className="grid grid-cols-7 gap-y-1 gap-x-1 auto-rows-max justify-items-center flex-grow flex-shrink-0">
                {days.map((day, i) => {
                    if (!day) {
                        return (
                            <div
                                key={`empty-${i}`}
                                className="w-7 h-7 flex-shrink-0"
                            />
                        );
                    }

                    const dateKey = getKey(day);
                    const counts = tasksByDate?.[dateKey] || {};

                    const isToday =
                        day === today.getDate() &&
                        month === today.getMonth() &&
                        year === today.getFullYear();

                    return (
                        <div
                            key={dateKey}
                            className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                        >
                            <DayCircle
                                day={day}
                                counts={counts}
                                isToday={isToday}
                                isSelected={selectedDate === dateKey}
                                onClick={() => setSelectedDate(dateKey)}
                                gridIndex={i} // Pass grid index for dynamic boundary checks
                            />
                        </div>
                    );
                })}
            </div>

  
            <div className="mt-2 pt-2 border-t border-gray-100 flex-shrink-0">
                <div className="flex flex-wrap gap-2 justify-center">
                    <div className="flex items-center gap-1 text-[8px] text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        Pending
                    </div>

                    <div className="flex items-center gap-1 text-[8px] text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                        Progress
                    </div>

                    <div className="flex items-center gap-1 text-[8px] text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                        High
                    </div>

                    <div className="flex items-center gap-1 text-[8px] text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                        Completed
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCalendar;