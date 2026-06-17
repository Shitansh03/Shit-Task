const ViewToggle = ({ view, setView }) => {
    return (
        <div className="flex gap-2">
            
            <button
                onClick={() => setView("grid")}
                className={`px-3 py-1 rounded border ${
                    view === "grid" ? "bg-black text-white" : ""
                }`}
            >
                ⬜ Grid
            </button>

            <button
                onClick={() => setView("list")}
                className={`px-3 py-1 rounded border ${
                    view === "list" ? "bg-black text-white" : ""
                }`}
            >
                ☰ List
            </button>

        </div>
    );
};

export default ViewToggle;