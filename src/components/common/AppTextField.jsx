import TextField from '@mui/material/TextField'

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
          bgcolor: '#FFFFFF',
          '& fieldset': { borderColor: '#CCCCCC' },
          '&:hover fieldset': { borderColor: '#AAAAAA' },
          '&.Mui-focused fieldset': { borderColor: '#0A1764' },
        },
        '& .MuiInputLabel-root': { color: '#9E9E9E' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#0A1764' },
        ...sx,
      }}
    />
  )
}
