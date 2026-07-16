import { useState } from 'react'
import Box from '@mui/material/Box'
import AppHeader from '../components/layout/AppHeader'
import AppFooter from '../components/layout/AppFooter'
import CarouselPanel from '../components/auth/CarouselPanel'
import AuthFormCard from '../components/auth/AuthFormCard'
import { layout } from '../theme/layout'
import { colors } from '../theme/colors'
import { logger } from '../utils/logger'
import { secureLoginCredentials } from '../controllers/secure.controller'

const SLIDES = [
  { title: '',  subtitle: 'How it works' },
  { title: '',  subtitle: 'Security features' },
  { title: '',  subtitle: 'Welcome to affordable investing' },
]

export default function LoginPage() {
  const [slideIndex, setSlideIndex] = useState(2)
  const [isLoading, setIsLoading]   = useState(false)

  const handlePrev = () =>
    setSlideIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)

  const handleNext = () =>
    setSlideIndex((i) => (i + 1) % SLIDES.length)

  const handleLogin = async (email) => {
    setIsLoading(true)
    try {
      const res = await secureLoginCredentials(email)
      if (res.code === 200) {
        logger.apiInfo('POST', '/api/secure/login/credentials', null, { email }, res)
      } else {
        logger.apiError('POST', '/api/secure/login/credentials', null, { email }, {
          message: res.message,
          response: { status: res.code, statusText: res.message, data: res.data },
        })
      }
    } catch (e) {
      logger.apiError('POST', '/api/secure/login/credentials', null, { email }, e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAccount = () => {
    logger.debug('Navigate to create account', 'LoginPage')
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
            isLoading={isLoading}
          />
        </Box>
      </Box>

      <AppFooter />
    </Box>
  )
}
