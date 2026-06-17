const taskSchema = require("../models/taskSchema");

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "title can't be empty" });
        }

        const task = await taskSchema.create({
            title: title.trim(),
            description: description?.trim() || "",
            status,
            priority,
            dueDate,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getAllTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = { user: req.user._id };
        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        if (req.query.dueDate) {
            filter.dueDate = { $lte: new Date(req.query.dueDate) };
        }

        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: "i" };
        }

        let sortBy = {};
        if (req.query.sort) {
            const [field, order] = req.query.sort.split(":");
            sortBy[field] = order === "asc" ? 1 : -1;
        }


        const total = await taskSchema.countDocuments(filter);

        const tasks = await taskSchema.find(filter).sort(sortBy).skip(skip).limit(limit);

        res.status(200).json({
            success: true,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: tasks,
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getTaskById = async (req, res) => {
    try {
        const task = await taskSchema.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            success: true,
            data: task,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const task = await taskSchema.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (title !== undefined && title.trim() === "") {
            return res.status(400).json({ message: "Title cannot be empty" });
        }

        if (title) task.title = title.trim();
        if (description !== undefined) task.description = description.trim();
        if (status) task.status = status;
        if (priority) task.priority = priority;
        if (dueDate) task.dueDate = dueDate;

        const updatedTask = await task.save();

        res.status(200).json({
            success: true,
            data: updatedTask,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteTask = async (req, res) => {
    try {
        const result = await taskSchema.deleteOne({ _id: req.params.id, user: req.user._id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };