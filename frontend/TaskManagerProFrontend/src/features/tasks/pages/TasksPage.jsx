import { useParams } from "react-router-dom";
import { taskPageConfig } from "../constants/taskPageConfig";
import { useGetAllTasksQuery } from "../../api/taskApi";
import TaskCard from "../components/TaskCard";
import { useViewModeHook } from "../hooks/useViewModeHook";
import ViewToggle from "../components/ViewToggle";


const TasksPage = () => {

    const { type } = useParams();

    const currentPage = taskPageConfig[type];

    const query = currentPage?.filters || {};

    const { view, setView } = useViewModeHook();

    const { data, isLoading, isError } = useGetAllTasksQuery(query);


    if (isLoading) {
        return (
            <h1 className="text-center mt-10 text-gray-500">
                Loading tasks...
            </h1>
        );
    }

    if (isError) {
        return (
            <h1 className="text-center mt-10 text-red-500">
                Error loading tasks
            </h1>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                    {currentPage?.title}
                </h2>

                <ViewToggle
                    view={view}
                    setView={setView}
                />
            </div>

            {data?.data?.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                    {currentPage?.emptyText}
                </div>

            ) : (

                <div>
                    {view === "grid" ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {data?.data?.map((task) => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    view="grid"
                                />
                            ))}

                        </div>

                    ) : (

                        <div className="flex flex-col gap-4">

                            {data?.data?.map((task) => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    view="list"
                                />
                            ))}

                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default TasksPage;