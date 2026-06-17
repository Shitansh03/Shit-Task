import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";

import ProtectedLayout from "./ProtectedLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import AddTask from "../features/tasks/components/AddTask";
import TasksPage from "../features/tasks/pages/TasksPage";


const router = createBrowserRouter([

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/register",
        element: <RegisterPage />
    },

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },

            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: "add-task",
                        element: <AddTask />
                    },

                    {
                        path: "tasks/:type",
                        element: <TasksPage />
                    }
                ]
            }
        ]
    }
])

export default router;