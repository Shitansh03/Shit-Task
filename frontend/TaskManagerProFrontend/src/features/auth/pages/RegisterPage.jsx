import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterAuthMutation } from "../../api/taskApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";


const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [registerAuth] = useRegisterAuthMutation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerAuth({ name, email, password }).unwrap();

            dispatch(
                setCredentials({
                    user: res.user,
                    token: res.token,
                })
            );

            navigate("/tasks/all-tasks");

        } catch (error) {
            alert(error?.data?.message || "Register failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-80 shadow">

                <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full mb-3 p-2 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white py-2 rounded mb-3">
                    Register
                </button>

                <p className="text-sm mt-3 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>

            </form>
        </div>
    );
};

export default RegisterPage;