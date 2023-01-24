import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectLanding = (state) => state.landing || initialState;

const selectFiles = createSelector(selectLanding, (state) => state.files);

export { selectFiles };
