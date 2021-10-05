import { createTheme } from "@material-ui/core/styles";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#416474",
    },
    secondary: {
      main: "#009dde",
    },
  },
  overrides: {
    MuiFormHelperText: {
      contained: {
        marginLeft: 0,
      },
    },
    MuiTableRow: {
      head: {
        height: "30px",
        backgroundColor: "#ffff",
      },
      root: {
        height: "30px",
      },
    },
 
    MuiPaper: {
      rounded: {
        borderRadius: "3px",
      },
      elevation1: {
        boxShadow:
          "rgb(0 0 0 / 12%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 0px 0px 1px",
      },
    },
    MuiIconButton: {
      root: {
        padding: "0px",
        "&:hover": {
          backgroundColor: "none",
        },
      },
      label: {
        color: "#416474",
      },
      edgeEnd: {
        marginRight: "0px",
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1.5px solid rgba(224, 224, 224, 1)",
      },
      head: {
        position: "sticky",
        top: "0px",
        backgroundColor: "#ffff",
        zIndex: 100,
      },
      stickyHeader: {
        backgroundColor: "#FFFFFF",
      },
    },
    MuiSelect: {
      selectMenu: {
        minWidth: "90px",
        display: "flex",
        textTransform: "capitalize",
      },
    },
    MuiFormControl: {
      root: {
        marginTop: "30px",
        marginBottom: "10px",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "16px",
        fontWeight: 700,
        color: "#546e7a",
      },
      shrink: {
        whiteSpace: "nowrap",
        transform: "translate(1px, -20px)",
      },
      outlined: {
        "&$shrink": {
          whiteSpace: "nowrap",
          transform: "translate(1px, -20px)",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "3px",
      },
      input: {
        padding: "8px",
        backgroundColor: "#FFFFFF",
      },
      notchedOutline: {
        "& legend": {
          maxWidth: "0px",
        },
      },
      adornedStart: {
        minWidth: "330px",
      },
    },
    MuiTextField: {
      root: {
        marginTop: "30px !important",
        marginBottom: "10px !important",
      },
    },

    MuiTypography: {
      body1: {
        fontWeight: "inherit",
      },
      h3: {
        fontSize: "1.4996rem",
        fontWeight: 500,
        color: "#263238",
      },
      h4: {
        fontSize: "1.1rem",
        fontWeight: 500,
        color: "#263238",
      },
    },
    MuiButton: {
      root: {
        minWidth: "120px",
      },
      containedSizeSmall: {
        minWidth: "60px",
        fontSize: "12px",
      },
      outlinedSizeSmall: {
        minWidth: "60px",
        fontSize: "12px",
      },
    },
    MuiButtonBase: {
      root: {
        margin: "4px",
      },
    },

    MuiFormControlLabel: {
      label: {
        "&$disabled": {
          color: "#0d82b1",
        },
      },
    },

    MuiFormLabel: {
      root: {
        "&$disabled": {
          color: "#416474",
        },
      },
    },
    MuiSwitch: {
      switchBase: {
        padding: "6px",
      },
    },
    MuiInputBase: {
      input: {
        "&$disabled": {
          textTransform: "capitalize",
          color: "gray",
        },
      },
    },
    MuiMenuItem: {
      root: {
        textTransform: "capitalize",
      },
    },
    MuiBreadcrumbs: {
      li: {
        textTransform: "capitalize",
      },
      ol: {
        fontWeight: 500,
        color: "#263238",
        cursor: "pointer",
      },
    },
  },
});
