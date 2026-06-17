import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const Layout = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <Navbar/>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar/>

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default Layout;