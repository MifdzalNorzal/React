import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'
import App from './App.jsx'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#0A1764' },
    secondary:  { main: '#CC0000' },
    info:       { main: '#1565C0' },
    background: { default: '#F0F0F0', paper: '#FFFFFF' },
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
