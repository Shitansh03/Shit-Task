import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../api/taskApi";

const AddTask = () => {

    const location = useLocation();
    const editTask = location.state?.task;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");

    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.title || "");
            setDescription(editTask.description || "");
            setStatus(editTask.status || "pending");
            setPriority(editTask.priority || "Low");
            setDueDate(editTask.dueDate ? editTask.dueDate.split("T")[0] : "");
        }
    }, [editTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editTask) {
            await updateTask({
                id: editTask._id,
                title,
                description,
                status,
                priority,
                dueDate,
            });
        } else {
            await createTask({
                title,
                description,
                status,
                priority,
                dueDate,
            });
        }

        navigate("/tasks/all-tasks");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

            <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-8 transition-all">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {editTask ? "✏️ Edit Task" : "➕ Create New Task"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {editTask ? "Update your task details" : "Fill details to add a new task"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="text-sm text-gray-600">Title</label>
                        <input
                            type="text"
                            placeholder="Enter task title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm text-gray-600">Description</label>
                        <textarea
                            placeholder="Write something..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition resize-none h-24"
                        />
                    </div>

                    {/* Status + Priority */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="text-sm text-gray-600">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="text-sm text-gray-600">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">

                        <button
                            type="submit"
                            className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition"
                        >
                            {editTask ? "Update Task" : "Create Task"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/tasks/all-tasks")}
                            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddTask;