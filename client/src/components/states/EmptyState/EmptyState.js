import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Folder from "@material-ui/icons/Folder";
import React from "react";


export const EmptyState = ({
    classes,
    onAddButtonClick,
    addButtonText,
    bigMessage,
    smallMessage
}) => (
    <div className={classes.blankState}>
        <div className={classes.messageWrapper}>
            <Folder className={`${classes.messageColor} ${classes.icon}`} />
            <Typography variant="headline" className={classes.messageColor}>
                {bigMessage}
            </Typography>
            <Typography variant="subheading" className={classes.messageColor}>
                {smallMessage}
            </Typography>

            {onAddButtonClick &&
            <Button color="primary" onClick={onAddButtonClick}>
                {addButtonText}
            </Button>
            }
        </div>
    </div>
);