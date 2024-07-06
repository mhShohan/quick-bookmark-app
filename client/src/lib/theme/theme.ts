import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {

  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained"
      },
      styleOverrides: {
        root: {
          padding: '5px 30px',
          fontWeight: 'bold',
        }
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg"
      }
    },
  },
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
  }
})


export default theme