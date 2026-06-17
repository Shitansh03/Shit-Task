import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, setAuthReady } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch(setCredentials({
        user: JSON.parse(user),
        token
      }));
    }

    dispatch(setAuthReady(true));
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;