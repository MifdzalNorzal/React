import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '../common/AppButton'
import BursaGoldDinarLogomarkSvg from '../../assets/Bursa Gold Dinar Logomark.svg'
import AppTextField from '../common/AppTextField'
import OrDivider from '../common/OrDivider'

export default function AuthFormCard({ onSubmit, onCreateAccount }) {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (email.trim() && onSubmit) onSubmit(email.trim())
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        px: { xs: 3, md: 5 },
        py: { xs: 4, md: 5 },
        bgcolor: '#FFFFFF',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      {/* Welcome heading */}
      <Typography
        variant="body1"
        sx={{ textAlign: 'center', color: 'text.secondary', mb: 0.5 }}
      >
        Welcome to
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box
          component="img"
          src={BursaGoldDinarLogomarkSvg}
          alt="Bursa Gold Dinar"
          sx={{ height: 20, alignSelf: 'center' }}
        />
      </Box>

      {/* Email field */}
      <AppTextField
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        sx={{ mb: 2 }}
      />

      {/* Continue button */}
      <AppButton
        variant="primary"
        fullWidth
        disabled={!email.trim()}
        onClick={handleSubmit}
        sx={{ mb: 1 }}
      >
        Continue
      </AppButton>

      {/* Or divider */}
      <OrDivider sx={{ my: 3 }} />

      {/* Create account prompt */}
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: 'text.secondary', mb: 0.75 }}
      >
        Don&apos;t have an account?
      </Typography>

      <Typography
        component="button"
        variant="body2"
        onClick={onCreateAccount}
        sx={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          color: '#1565C0',
          fontWeight: 700,
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          p: 0,
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        Create an Account
      </Typography>
    </Paper>
  )
}
