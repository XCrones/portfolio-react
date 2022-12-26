import { createSlice } from "@reduxjs/toolkit";

interface IStateInitial {
  value: boolean;
}

const initialStateValue: IStateInitial = {
  value: true,
};

export const NeonSlice = createSlice({
  name: "neon",
  initialState: initialStateValue,
  reducers: {
    toggleNeon: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleNeon } = NeonSlice.actions;
export default NeonSlice.reducer;
