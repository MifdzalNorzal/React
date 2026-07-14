import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'
import App from './App.jsx'
import { colors } from './theme/colors'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: colors.navy },
    secondary:  { main: colors.red },
    info:       { main: colors.blue },
    background: { default: colors.pageBg, paper: colors.white },
  },
  typography: {
    fontFamily: '"Roboto", system-ui, sans-serif',
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
