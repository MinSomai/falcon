import { combineReducers } from "redux";
import { SIGN_OUT_SUCCESS } from "../actions/authentication.actions";
import { authentication } from "./authentication.reducer";
import { faculty } from "./faculty.reducer";
import { facultyLoading } from "./faculty_loading.reducer";
import { facultyProfiles } from "./faculty_profiles.reducer";
import { subject } from "./subject.reducer";


const appReducer = combineReducers({
    authentication,
    facultyProfiles,
    facultyLoading,
    faculty,
    subject,
});

export const reducer = (state, action) => {
    if (action.type === SIGN_OUT_SUCCESS) {
        state = undefined;
    }

    return appReducer(state, action);
};