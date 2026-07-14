import Button from '@mui/material/Button'
import { colors } from '../../theme/colors'

const MUI_VARIANT = {
  primary:   'contained',
  outlined:  'outlined',
  ghost:     'text',
  microsite: 'outlined',
}

const VARIANT_SX = {
  microsite: {
    borderRadius: '50px',
    px: 3,
    py: 0.75,
    fontSize: '0.75rem',
    fontWeight: 700,
    border: `1px solid ${colors.red}`,
    color: colors.red,
    '&:hover': { border: `1px solid ${colors.redHover}`, bgcolor: colors.redOverlay },
  },
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
        '&.Mui-disabled': { bgcolor: colors.disabled, color: colors.disabledText },
        ...(VARIANT_SX[variant] ?? {}),
        ...sx,
      }}
    >
      {children}
    </Button>
  )
}
