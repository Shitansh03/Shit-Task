import { useState } from "react";
import { taskApi, useGoogleAuthMutation, useLoginAuthMutation } from "../../api/taskApi";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { GoogleLogin } from "@react-oauth/google";
import { setCredentials } from "../authSlice";


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [googleAuth] = useGoogleAuthMutation();

    const [loginAuth] = useLoginAuthMutation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginAuth({ email, password }).unwrap();

            dispatch(
                setCredentials({
                    user: res.user,
                    token: res.token,
                })
            );

            navigate("/tasks/all-tasks", { replace: true });

        } catch (error) {
            alert(error?.data?.message || "Login failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-80 shadow">

                <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white py-2 rounded mb-3">
                    Login
                </button>

                <div className="flex items-center my-3">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-2 text-sm text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        try {
                            if (!credentialResponse.credential) {
                                alert("No credential received");
                                return;
                            }

                            const data = await googleAuth({
                                credential: credentialResponse.credential
                            }).unwrap();

                            dispatch(
                                setCredentials({
                                    user: data.user,
                                    token: data.token
                                })
                            );
                            dispatch(taskApi.util.resetApiState());

                            navigate("/tasks/all-tasks");

                        } catch (err) {
                            alert(err?.data?.message || "Google login failed");
                        }
                    }}
                    onError={() => alert("Google Login Failed")}
                />

                <p className="text-sm mt-3 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>

            </form>
        </div>
    );
};

export default LoginPage;