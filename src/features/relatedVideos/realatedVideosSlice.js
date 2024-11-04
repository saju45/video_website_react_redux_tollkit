import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRelatedVideos } from "./relatedVideosAPI";
const initialState = {
  relatedVideos: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchRelatedVideos = createAsyncThunk(
  "video/fetchRelatedVideos",
  async ({ tags, id }) => {
    const relatedVides = await getRelatedVideos({ tags, id });

    return relatedVides;
  }
);

const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedVideos.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedVideos = action.payload;
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.relatedVideos = [];
        state.isError = true;
        state.error = action.payload.error?.message;
      });
  },
});

export default relatedVideosSlice.reducer;
