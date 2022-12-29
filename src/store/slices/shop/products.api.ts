import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ITodoApi {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const todoApi = createApi({
  // highlight-start
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  // highlight-end
  endpoints: (build) => ({
    // ...endpoints
    getllProducts: build.query<ITodoApi[], number>({
      query: (limit = 5) => ({
        url: "/products",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const { useGetllProductsQuery } = todoApi;
