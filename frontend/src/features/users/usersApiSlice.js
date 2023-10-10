import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

// entity adapter gives us normalized state here (work with data that has an organized entities and IDs)
const usersAdapter = createEntityAdapter({})

// if initialstate exists
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => {
    }
})