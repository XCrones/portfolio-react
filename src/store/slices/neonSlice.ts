import { createSlice } from "@reduxjs/toolkit";

interface Neon {
  value: boolean;
}

const initialStateValue: Neon = {
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
