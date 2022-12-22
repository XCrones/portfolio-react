import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isHide: boolean;
}

const initialStateValue: State = {
  isHide: false,
};

export const ProjectsSlice = createSlice({
  name: "projects",
  initialState: initialStateValue,
  reducers: {
    toggleHideProjects: (state, action: PayloadAction<boolean>) => {
      state.isHide = action.payload;
    },
  },
});

export const { toggleHideProjects } = ProjectsSlice.actions;
export default ProjectsSlice.reducer;
