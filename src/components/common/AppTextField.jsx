import TextField from '@mui/material/TextField'
import { colors } from '../../theme/colors'

export default function AppTextField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  fullWidth = true,
  sx = {},
}) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth={fullWidth}
      variant="outlined"
      size="medium"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 1.5,
          bgcolor: colors.white,
          '& fieldset': { borderColor: colors.inputBorder },
          '&:hover fieldset': { borderColor: colors.inputBorderHover },
          '&.Mui-focused fieldset': { borderColor: colors.navy },
        },
        '& .MuiInputLabel-root': { color: colors.inputLabel },
        '& .MuiInputLabel-root.Mui-focused': { color: colors.navy },
        ...sx,
      }}
    />
  )
}
