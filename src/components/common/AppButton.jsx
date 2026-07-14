import Button from '@mui/material/Button'

const MUI_VARIANT = {
  primary:  'contained',
  outlined: 'outlined',
  ghost:    'text',
}

export default function AppButton({
  variant = 'primary',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  startIcon,
  endIcon,
  sx = {},
  children,
}) {
  return (
    <Button
      variant={MUI_VARIANT[variant] ?? 'contained'}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disableElevation
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 1.5,
        py: 1.5,
        '&.Mui-disabled': {
          bgcolor: '#D4D4D4',
          color: 'rgba(0,0,0,0.38)',
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  )
}
