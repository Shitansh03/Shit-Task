import useTaskActions from "../hooks/useTaskActionsHook";
import TaskActions from "./TaskActions";

const TaskCard = ({ task, view = "grid" }) => {

    const {
        openEdit,
        handleDelete,
        toggleComplete,
        updateField,
    } = useTaskActions();

    const statusStyle =
        task.status === "pending"
            ? "bg-yellow-50 border-yellow-200 text-yellow-700"
            : task.status === "in-progress"
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-green-50 border-green-200 text-green-700";

    const priorityStyle =
        task.priority === "Low"
            ? "bg-gray-50 border-gray-200 text-gray-600"
            : task.priority === "Medium"
                ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                : "bg-red-50 border-red-200 text-red-600";

    // ================= GRID VIEW =================

    if (view === "grid") {
        return (
            <div
                onClick={() => openEdit(task)}
                className="group relative flex flex-col
                rounded-3xl p-5 cursor-pointer
                bg-white/70 backdrop-blur-xl
                border border-gray-200/60
                shadow-[0_6px_25px_rgba(0,0,0,0.05)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                hover:-translate-y-2 hover:scale-[1.02]
                transition-all duration-300 ease-out
                min-h-[210px] overflow-hidden"
            >

                <div
                    className="absolute inset-0 opacity-0
                    group-hover:opacity-100 transition duration-500
                    bg-gradient-to-br from-blue-50/40 via-transparent
                    to-purple-50/40 pointer-events-none"
                />

                <div className="relative flex justify-between items-start mb-3">
                    <h3
                        className={`font-semibold text-lg pr-2 line-clamp-2 ${task.status === "completed"
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                            }`}
                    >
                        {task.title}
                    </h3>

                    <TaskActions
                        task={task}
                        toggleComplete={toggleComplete}
                        openEdit={openEdit}
                        handleDelete={handleDelete}
                    />
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-5">
                    {task.description || "No description"}
                </p>

                <div className="mt-auto flex justify-between items-center">
                    <div className="flex gap-2">
                        <select
                            value={task.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                                updateField(task, "status", e.target.value, e)
                            }
                            className={`text-xs px-3 py-1.5 rounded-full border
                            focus:outline-none transition ${statusStyle}`}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <select
                            value={task.priority}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                                updateField(task, "priority", e.target.value, e)
                            }
                            className={`text-xs px-3 py-1.5 rounded-full border
                            focus:outline-none transition ${priorityStyle}`}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <input
                        type="date"
                        value={task.dueDate ? task.dueDate.split("T")[0] : ""}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                            updateField(task, "dueDate", e.target.value, e)
                        }
                        className="text-xs text-gray-500 border border-gray-200
                        rounded-lg px-2 py-1.5
                        focus:outline-none hover:bg-gray-50 transition"
                    />
                </div>
            </div>
        );
    }

    // ================= LIST VIEW =================
    return (
        <div
            onClick={() => openEdit(task)}
            className="group relative flex flex-col justify-between
        p-5 rounded-2xl cursor-pointer
        bg-white/80 backdrop-blur-xl
        border border-gray-100
        shadow-sm hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300
        min-h-[140px]"
        >

            <div className="flex justify-between items-start mb-2">
                <h3
                    className={`font-semibold text-lg pr-2 truncate ${task.status === "completed"
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                >
                    {task.title}
                </h3>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition shrink-0">
                    <TaskActions
                        task={task}
                        toggleComplete={toggleComplete}
                        openEdit={openEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>

            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {task.description || "No description"}
            </p>

            <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-2">
                    <select
                        value={task.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                            updateField(task, "status", e.target.value, e)
                        }
                        className={`text-xs px-3 py-1 rounded-full border ${statusStyle}`}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <select
                        value={task.priority}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                            updateField(task, "priority", e.target.value, e)
                        }
                        className={`text-xs px-3 py-1 rounded-full border ${priorityStyle}`}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <input
                    type="date"
                    value={task.dueDate ? task.dueDate.split("T")[0] : ""}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                        updateField(task, "dueDate", e.target.value, e)
                    }
                    className="text-xs text-gray-500 border border-gray-200
                rounded-lg px-2 py-1 hover:bg-gray-50 transition"
                />
            </div>

        </div>
    );
};

export default TaskCard;