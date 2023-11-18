import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

// entity adapter gives us normalized state here (work with data that has an organized entities and IDs)
const notesAdapter = createEntityAdapter({})

// if initialstate exists
const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => 'notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [...result.ids.map(id => ({type: 'Note', id})), {type: 'Note', id: 'LIST'}]
                }
                else return [{type: 'Note', id: 'LIST'}]

        }}),
        
})
})

export const { useGetNotesQuery } = notesApiSlice

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

export const selectNotesData = createSelector(
    selectNotesResult,
    noteResult => noteResult.data,
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)