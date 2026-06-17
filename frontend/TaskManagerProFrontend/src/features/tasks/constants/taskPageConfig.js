export const taskPageConfig = {
    "all-tasks": {
        title: "📋 All Tasks",
        emptyText: "No tasks found 🚀",
        filters: { limit: 1000 },
    },

    completed: {
        title: "✅ Completed Tasks",
        emptyText: "No completed tasks yet 🎯",
        filters: {
            status: "completed",
            limit: 1000,
        },
    },

    pending: {
        title: "⏳ Pending Tasks",
        emptyText: "No pending tasks 🚀",
        filters: {
            status: "pending",
            limit: 1000,
        },
    },

    "in-progress": {
        title: "🚧 In Progress Tasks",
        emptyText: "No tasks in progress 🚀",
        filters: {
            status: "in-progress",
            limit: 1000,
        },
    },

    "high-priority": {
        title: "🔥 High Priority Tasks",
        emptyText: "No high priority tasks ⚡",
        filters: {
            priority: "High",
            limit: 1000,
        },
    },
};