import { createSlice } from "@reduxjs/toolkit";

interface State {
	list: [];
	isLoading: boolean;
}

const initialState: State = {
	list: [],
	isLoading: false,
};

export const spletnikSlice = createSlice({
	name: "spletnik",
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export default spletnikSlice.reducer;
