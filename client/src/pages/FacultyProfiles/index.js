import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import style from "./styles";
import FacultyProfilesPage from "./FacultyProfiles";
import { setActivePage as makeSetActivePageAction } from "../../actions/pages.actions";


function mapStateToProps(state) {
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setActivePage(page) {
            dispatch(makeSetActivePageAction(page));
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(style),
)(FacultyProfilesPage);