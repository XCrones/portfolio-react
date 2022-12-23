import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ITodoApi {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const todoApi = createApi({
  // highlight-start
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  // highlight-end
  endpoints: (build) => ({
    // ...endpoints
    fetchAllPosts: build.query<ITodoApi[], number>({
      query: (limit = 5) => ({
        url: "/posts",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});
