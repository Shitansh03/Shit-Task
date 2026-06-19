import { useNavigate } from "react-router-dom";

import {
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} from "../../api/taskApi";

const useTaskActions = () => {

    const navigate = useNavigate();

    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();


    const openEdit = (task) => {
        navigate("/add-task", {
            state: { task },
        });
    };


    const handleDelete = async (id, e) => {

        e.stopPropagation();

        try {
            await deleteTask(id).unwrap();
        } catch {
            alert("Delete failed");
        }
    };


    const toggleComplete = async (task, e) => {

        e.stopPropagation();

        try {
            await updateTask({
                id: task._id,
                status:
                    task.status === "completed"
                        ? "pending"
                        : "completed",
            }).unwrap();
        } catch {
            alert("Update failed");
        }
    };


    const updateField = async (task, field, value, e) => {

        e.stopPropagation();

        try {
            await updateTask({
                id: task._id,
                [field]: value,
            }).unwrap();

        } catch {
            alert("Update failed");
        }
    };

    return {
        openEdit,
        handleDelete,
        toggleComplete,
        updateField
    };
};

export default useTaskActions;