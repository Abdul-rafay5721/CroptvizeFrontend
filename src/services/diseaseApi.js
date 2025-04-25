import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const diseaseApi = createApi({
    reducerPath: "diseaseApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        addDisease: builder.mutation({
            query: (disease) => ({
                url: "/disease/addDisease",
                method: "POST",
                body: disease,
            }),
        }),
        predictDisease: builder.mutation({
            query: (disease) => ({
                url: "/disease/predict",
                method: "POST",
                body: disease,
            }),
        }),
    }),
})

export const { useAddDiseaseMutation, usePredictDiseaseMutation } = diseaseApi