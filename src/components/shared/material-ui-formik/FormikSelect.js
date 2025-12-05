import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  select: {
    "& .MuiOutlinedInput-root": {
      height: "38px",
      width: "62px",
      color: "#646464",
      border: "1px solid #B4ADAD",
    },
  },
}));

const FormikSelect = (props) => {
  const classes = useStyles();

  const {
    customValues,
    customOption,
    defaultOption,
    sx,
    fullWidth = true,
    hasObject = false,
    className,
    ...rest
  } = props;

  const [customValue, setCustomValue] = useState(customValues ? customValues : '');

  return (
    <FormControl fullWidth={fullWidth} className={`${className}`}>
      {/* <Typography
        style={{
          marginBottom: "11px",
          color: "#1E1E1E",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {props?.label}
      </Typography> */}
      <InputLabel title={props.label}>{props.label}</InputLabel>
      <Select
        {...props.field}
        {...rest}
        MenuProps={{
          PaperProps: {
            className: "select-wrapper",
          },
        }}
        className={classes.select}
        sx={sx}
      >
        {defaultOption && !customOption && (
          <MenuItem value={typeof props.field.value === "string" ? "" : 0}>
            {" "}
            -- Select --{" "}
          </MenuItem>
        )}
        {customOption && (
          <Input
            className="w-100"
            value={customValue}
            type="number"
            onChange={(e) => setCustomValue(e.target.value)}
          />
        )}
        {customOption && (
          <MenuItem value={"." + customValue}>
            Custom {customValue} %
          </MenuItem>
        )}
        {props.options &&
          props.options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option?.disabled ? option?.disabled : false}
            >
              {option.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FormikSelect;
