import { NavLink, useNavigate } from "react-router-dom";
import TaskCalendar from "../components/TaskCalendar";


const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <div className="w-72 h-screen bg-gradient-to-b from-white to-gray-50 border-r shadow-sm p-5 flex flex-col">
            <button
                className="mb-8 bg-black text-white py-2.5 rounded-xl font-medium shadow hover:shadow-md hover:bg-gray-900 transition-all duration-200"
                onClick={() => navigate("/add-task")}
            >
                + Add Task
            </button>

            <ul className="space-y-2 text-sm">
                <li>
                    <NavLink
                        to="/tasks/all-tasks"
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-black text-white shadow-md scale-[1.02]"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-black hover:scale-[1.02]"
                            }`
                        }
                    >
                        📋 <span className="ml-2">All Tasks</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/tasks/pending"
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-yellow-500 text-white shadow-md scale-[1.02]"
                                    : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 hover:scale-[1.02]"
                            }`
                        }
                    >
                        ⏳ <span className="ml-2">Pending</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/tasks/in-progress"
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-blue-500 text-white shadow-md scale-[1.02]"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-[1.02]"
                            }`
                        }
                    >
                        🚧 <span className="ml-2">In Progress</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/tasks/completed"
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-green-500 text-white shadow-md scale-[1.02]"
                                    : "text-gray-600 hover:bg-green-50 hover:text-green-600 hover:scale-[1.02]"
                            }`
                        }
                    >
                        ✅ <span className="ml-2">Completed</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/tasks/high-priority"
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? "bg-red-500 text-white shadow-md scale-[1.02]"
                                    : "text-gray-600 hover:bg-red-50 hover:text-red-600 hover:scale-[1.02]"
                            }`
                        }
                    >
                        🔥 <span className="ml-2">High Priority</span>
                    </NavLink>
                </li>
            </ul>

            <div className="mt-auto pt-6">
                <TaskCalendar />
            </div>

            <div className="pt-4 mt-4 border-t text-xs text-gray-400 flex justify-between">
                <span>v1.0</span>
                <span>•</span>
                <span className="italic">Premium UI</span>
            </div>

        </div>
    );
};

export default Sidebar;