import { FiX, FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";

const TaskActions = ({
    task,
    toggleComplete,
    openEdit,
    handleDelete,
}) => {

    return (

        <div
            className="flex gap-2 opacity-0 translate-y-2
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300 shrink-0"
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(task, e);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full
                bg-white shadow-sm border border-gray-100
                hover:bg-green-50 hover:border-green-200
                hover:scale-110 active:scale-95 transition"
            >
                <span className="text-green-600 text-sm">
                    {task.status === "completed" ? <FiX /> : <FiCheck />}
                </span>
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    openEdit(task);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full
                bg-white shadow-sm border border-gray-100
                hover:bg-blue-50 hover:border-blue-200
                hover:scale-110 active:scale-95 transition"
            >
                <span className="text-blue-600 text-sm">
                    <FiEdit2 />
                </span>
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(task._id, e);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full
                bg-white shadow-sm border border-gray-100
                hover:bg-red-50 hover:border-red-200
                hover:scale-110 active:scale-95 transition"
            >
                <span className="text-red-600 text-sm">
                    <FiTrash2 />
                </span>
            </button>
        </div>
    );
};

export default TaskActions;