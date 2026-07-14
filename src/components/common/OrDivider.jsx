import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

export default function OrDivider({ text = 'or', sx = {} }) {
  return (
    <Divider sx={{ my: 2, ...sx }}>
      <Typography variant="body2" sx={{ px: 1.5, color: 'text.secondary' }}>
        {text}
      </Typography>
    </Divider>
  )
}
