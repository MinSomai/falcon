import Badge from "@material-ui/core/Badge";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../../../../components/UserAvatar/index";
import { getFullName } from "../../../../../utils/user.util";
import { FACULTY_PROFILES_PAGE } from "../../../../index";
import { OVERVIEW_TAB } from "../../faculty_detail_tabs/index";
import { wrap } from "./wrapper";


const getBadgeNumber = (facultyId, changeRequests) => {
    if (!changeRequests) {
        return null;
    }

    return changeRequests.filter(changeRequest => changeRequest.faculty === facultyId).length;
};

const BaseFacultyListItem = ({activeTab, classes, faculty, active, changeRequests}) => {
    const {activeListItem, listItem} = classes;
    const className = active ? [activeListItem, listItem].join(" ") : listItem;

    // Go to where the active tab is if any. If none, go to default overview tab
    const tabPath = activeTab ? activeTab : OVERVIEW_TAB.path;
    const fullName = getFullName(faculty.user);

    const badge = getBadgeNumber(faculty._id, changeRequests.changeRequests);
    const withBadge = badge && badge > 0;

    return (
        <ListItem
            button
            component={Link}
            to={`/${FACULTY_PROFILES_PAGE.path}/${faculty._id}/${tabPath}`}
            className={className}
            onClick={() => document.title = `${fullName}'s Profile - Faculty Profiles - Falcon`}
        >
            {withBadge ?
                <Badge badgeContent={badge} classes={{badge: classes.badge}}>
                    <UserAvatar user={faculty.user} />
                </Badge> :
                <UserAvatar user={faculty.user} />
            }

            <ListItemText
                primary={getFullName(faculty.user)}
                secondary={`T-${faculty.idNumber}`}
            />
        </ListItem>
    );
};

export const FacultyListItem = wrap(BaseFacultyListItem);