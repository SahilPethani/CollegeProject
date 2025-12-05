import React from "react";
import {
  Avatar,
  Breakpoint,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "../../../assets/icons/ic-close-white.svg";

const DialogForm = ({
  scroll,
  maxWidth,
  openDialog,
  handleDialogClose,
  title,
  className,
  bodyContent,
  paperProps,
}) => {
  return (
    <Dialog
      sx={{ zIndex: "9999" }}
      open={openDialog}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleDialogClose();
        }
      }}
      className={`${className}`}
      scroll={scroll}
      maxWidth={maxWidth}
      PaperProps={paperProps}
      disableAutoFocus
      disableEnforceFocus
      fullWidth="100%"
    >
      {title && (
        <DialogTitle
          sx={{
            backgroundColor: "#8182EE",
            padding: "6px 16px",
            color: "#fff",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "5px 5px 0px 0px",
          }}
        >
          {title}
          <IconButton
            size="small"
            className="close-action"
            onClick={handleDialogClose}
          >
            <Avatar sx={{ width: 22, height: 22 }} src={CloseIcon} />
          </IconButton>
        </DialogTitle>
      )}
      {bodyContent}
    </Dialog>
  );
};

export default DialogForm;
