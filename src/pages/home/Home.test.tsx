import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./Home.page";

import { Provider } from "react-redux";
import { store } from "../../store";

describe("<Home />", () => {
  it("name framework", () => {
    const initStore = {
      aboutMe: {},
      skills: [],
    };

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    // console.log(store.getState().aboutMe.aboutMe);
  });
});
