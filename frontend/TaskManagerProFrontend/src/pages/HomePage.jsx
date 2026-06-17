import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    const handleProtectedClick = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        } else {
            navigate("/tasks/all-tasks");
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center text-center">

            <h1 className="text-4xl font-bold mb-4">
                Manage Your Tasks Efficiently 🚀
            </h1>

            <p className="text-gray-600 mb-6">
                Organize, prioritize and track your tasks in one place.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={handleProtectedClick}
                    className="px-6 py-2 bg-black text-white rounded"
                >
                    Get Started
                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 border rounded"
                >
                    Login
                </button>
            </div>

        </div>
    );
};

export default HomePage;