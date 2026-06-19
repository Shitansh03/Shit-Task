import { FiGrid, FiList } from "react-icons/fi";

const ViewToggle = ({ view, setView }) => {
    return (
        <div className="flex gap-2">
            
            <button
                onClick={() => setView("grid")}
                className={`px-3 py-1 rounded border ${
                    view === "grid" ? "bg-black text-white" : ""
                }`}
            >
                <FiGrid className="inline mr-1" /> Grid
            </button>

            <button
                onClick={() => setView("list")}
                className={`px-3 py-1 rounded border ${
                    view === "list" ? "bg-black text-white" : ""
                }`}
            >
                <FiList className="inline mr-1" /> List
            </button>

        </div>
    );
};

export default ViewToggle;