import { useState } from 'react'
import Box from '@mui/material/Box'
import AppHeader from '../components/layout/AppHeader'
import AppFooter from '../components/layout/AppFooter'
import CarouselPanel from '../components/auth/CarouselPanel'
import AuthFormCard from '../components/auth/AuthFormCard'

const SLIDES = [
  {
    title: 'Start investing in gold today',
    subtitle: 'How it works',
  },
  {
    title: 'Secure and regulated platform',
    subtitle: 'Security features',
  },
  {
    title: 'Quick and\nfree registration',
    subtitle: 'Welcome to affordable investing',
  },
]

export default function LoginPage() {
  const [slideIndex, setSlideIndex] = useState(2)

  const handlePrev = () =>
    setSlideIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)

  const handleNext = () =>
    setSlideIndex((i) => (i + 1) % SLIDES.length)

  const handleLogin = (email) => {
    console.log('Continue with:', email)
  }

  const handleCreateAccount = () => {
    console.log('Navigate to create account')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#F0F0F0',
      }}
    >
      <AppHeader />

      {/* Main two-column content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 3, md: 5 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 3 },
            width: '100%',
            maxWidth: 960,
            alignItems: 'stretch',
          }}
        >
          <CarouselPanel
            slides={SLIDES}
            activeIndex={slideIndex}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          <AuthFormCard
            onSubmit={handleLogin}
            onCreateAccount={handleCreateAccount}
          />
        </Box>
      </Box>

      <AppFooter />
    </Box>
  )
}
