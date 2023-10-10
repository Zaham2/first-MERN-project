import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// fetch base query is like axios
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http:localhost:3500' }),
    tagTypes: ['Note', 'User'],  //these will be used for cached data
    endpoints: builder => {()}
})
