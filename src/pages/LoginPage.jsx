import { useState } from 'react'
import Box from '@mui/material/Box'
import AppHeader from '../components/layout/AppHeader'
import AppFooter from '../components/layout/AppFooter'
import CarouselPanel from '../components/auth/CarouselPanel'
import AuthFormCard from '../components/auth/AuthFormCard'
import { layout } from '../theme/layout'
import { colors } from '../theme/colors'

const SLIDES = [
  { title: '',  subtitle: 'How it works' },
  { title: '',  subtitle: 'Security features' },
  { title: '',  subtitle: 'Welcome to affordable investing' },
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
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          bgcolor: colors.divider,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <AppHeader />

      {/* Main two-column content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: layout.contentPaddingX,
          py: layout.contentPaddingY,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: `${layout.carouselColumn} ${layout.formColumn}` },
            gap: layout.columnGap,
            width: '100%',
            maxWidth: layout.contentMaxWidth,
            alignItems: 'stretch',
            gridAutoRows: layout.cardHeight,
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
