import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { taskApi } from "../features/api/taskApi";
import { logout } from "../features/auth/authSlice";


const Navbar = () => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch(logout());

        dispatch(
            taskApi.util.resetApiState()
        );

        navigate("/login");
    };

    return (
        <div className="h-14 bg-white border-b flex items-center justify-between px-6">

            <h1
                className="text-xl font-semibold tracking-wide cursor-pointer"
                onClick={() => {
                    if (user) {
                        navigate("/tasks/all-tasks");
                    } else {
                        navigate("/");
                    }
                }}
            >
                TaskShit
            </h1>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-sm text-gray-600">
                            Welcome, {user.name}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800"
                    >
                        Login
                    </button>
                )}

            </div>

        </div>
    );
};

export default Navbar;