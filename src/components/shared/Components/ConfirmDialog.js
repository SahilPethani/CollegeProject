import React from "react";
import {
  Avatar,
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  PaperProps,
  Typography,
} from "@mui/material";
import CloseIcon from "../../../assets/icons/ic-close-white.svg";

const ConfirmDialog = ({
  scroll,
  maxWidth,
  openDialog,
  handleDialogClose,
  handleDialogAction,
  title,
  className,
  message,
  paperProps,
  cancelButtonText,
  confirmButtonText,
}) => {
  return (
    <Dialog
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
      fullWidth
      sx={{ zIndex: "9999" }}
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

      <DialogContent
        style={{
          backgroundColor: "#FFF",
          padding: "20px 0px",
          minHeight: "40px",
        }}
      >
        <DialogContentText id="alert-dialog-description">
          <Typography
            sx={{
              px: "20px",
              fontSize: "1rem",
              lineHeight: "1.4",
              color: "#242424",
            }}
          >
            {message}
          </Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#fff", padding: "20px" }}>
        <Button
          onClick={handleDialogClose}
          variant="outlined"
          sx={{
            color: "#3f51b5",
            border: "1px solid #3f51b5",
            textTransform: "capitalize",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "24px",
            marginLeft: "20px !important",
          }}
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={handleDialogAction}
          variant="contained"
          autoFocus
          sx={{
            backgroundColor: "#3f51b5",
            textTransform: "capitalize",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "24px",
            marginLeft: "20px !important",
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
