import React from "react";
import { FormControl, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  label: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  label_shrinked: {
    minWidth: "200px",
    display: "flex",
  },
  textField: {
    borderRadius: "6px !important",
  },
  textTransform: {
    textTransform: "uppercase",
  },
});

const FormikInput = function (props) {
  const styles = useStyles();
  const {
    id,
    maxLength,
    isDefaultValue,
    multiline,
    className,
    hasObject = false,
    controlClassName,
    placeHolder,
    readOnly,
    textTransform,
    sx,
    rows,
    noMaxLength,
    ...rest
  } = props;

  return (
    <FormControl fullWidth className={controlClassName} sx={sx}>
      <Typography
        style={{
          marginBottom: "11px",
          color: "#1E1E1E",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {props?.label}
      </Typography>
      {isDefaultValue ? (
        <TextField
          {...props.field}
          {...rest}
          id={id}
          // label={props.label}
          label={""}
          className={className}
          multiline={multiline}
          placeholder={placeHolder}
          rows={rows}
          autoComplete="off"
          inputProps={{
            maxLength: noMaxLength ? -1 : maxLength ? maxLength : 100,
            className: textTransform ? styles.textTransform : styles.textField,
            readOnly: readOnly,
          }}
        />
      ) : (
        <TextField
          {...props.field}
          {...rest}
          id={id}
          className={className}
          placeholder={placeHolder}
          // label={props.label}
          label={""}
          rows={rows}
          value={props.type === "number" ? props.field.value : props.field.value}
          multiline={multiline}
          autoComplete="off"
          inputProps={{
            maxLength: noMaxLength ? -1 : maxLength ? maxLength : 100,
            className: textTransform ? styles.textTransform : styles.textField,
            readOnly: readOnly,
          }}
        />
      )}
    </FormControl>
  );
};

export default FormikInput;
