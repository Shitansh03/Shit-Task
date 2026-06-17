import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",

    prepareHeaders: (headers, { getState }) => {

        const token = getState().auth.token;

        if (token) {
            headers.set(
                "authorization",
                `Bearer ${token}`
            );
        }

        return headers;
    },
});


const baseQueryWithAuth = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (
        result?.error?.status === 401 &&
        result?.error?.data?.message === "Token Failed"
    ) {
        api.dispatch(logout());
    }

    return result;
};


export const taskApi = createApi({
    reducerPath: "taskApi",

    baseQuery: baseQueryWithAuth,

    tagTypes: ["Tasks"],

    endpoints: (builder) => ({

        googleAuth: builder.mutation({
            query: (data) => ({
                url: "/auth/google",
                method: "POST",
                body: data, // 🔥 Ab yeh direct { credential: "..." } bhejeha
            }),
        }),

        registerAuth: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        }),

        loginAuth: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),


        getAllTasks: builder.query({
            query: (params = {}) => {

                const queryString =
                    new URLSearchParams(params).toString();

                return queryString ? `/tasks?${queryString}` : "/tasks";
            },

            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({
                            type: "Tasks",
                            id: _id,
                        })),

                        {
                            type: "Tasks",
                            id: "LIST",
                        },
                    ]
                    : [
                        {
                            type: "Tasks",
                            id: "LIST",
                        },
                    ],
        }),


        getTaskById: builder.query({
            query: (id) => `/tasks/${id}`,

            providesTags: (result, error, id) => [
                {
                    type: "Tasks",
                    id,
                },
            ],
        }),


        createTask: builder.mutation({
            query: (newTask) => ({
                url: "/tasks",
                method: "POST",
                body: newTask,
            }),

            invalidatesTags: [
                {
                    type: "Tasks",
                    id: "LIST",
                },
            ],
        }),


        updateTask: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/tasks/${id}`,
                method: "PUT",
                body: data,
            }),

            invalidatesTags: [
                {
                    type: "Tasks",
                    id: "LIST",
                },
            ],
        }),


        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: [
                {
                    type: "Tasks",
                    id: "LIST",
                },
            ],
        }),
    }),
});


export const {
    useGetAllTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useRegisterAuthMutation,
    useLoginAuthMutation,
    useGoogleAuthMutation,
} = taskApi;