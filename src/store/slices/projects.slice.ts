import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IStateInitial {
  isHide: boolean;
}

const initialStateValue: IStateInitial = {
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
