import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import lottie from 'lottie-web'
import carouselWelcomeUrl from '../../assets/lottie/carousel_welcome.json?url'
import carouselStartUrl from '../../assets/lottie/carousel_start.json?url'
import carouselQuickUrl from '../../assets/lottie/carousel_quick.json?url'
import { colors } from '../../theme/colors'

const ANIMATION_URLS = [carouselWelcomeUrl, carouselStartUrl, carouselQuickUrl]

export default function CarouselPanel({ slides, activeIndex, onPrev, onNext }) {
  const nextIndex = (activeIndex + 1) % slides.length
  const animContainerRef = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: ANIMATION_URLS[activeIndex],
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    })
    return () => anim.destroy()
  }, [activeIndex])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 1 }}>

      {/* Dark card — animation fills it edge-to-edge */}
      <Box
        sx={{
          flex: 1,
          bgcolor: colors.navy,
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div ref={animContainerRef} style={{ position: 'absolute', inset: 0 }} />
      </Box>

      {/* Nav bar — separate white bar below the dark card */}
      <Box
        sx={{
          flexShrink: 0,
          bgcolor: colors.white,
          borderRadius: 2,
          px: 2,
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', flex: 1 }}
          noWrap
        >
          Next: {slides[nextIndex].subtitle}
        </Typography>

        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ px: 1 }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: i === activeIndex ? 20 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === activeIndex ? colors.red : colors.divider,
                transition: 'width 0.3s ease, background-color 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={0.25}>
          <IconButton onClick={onPrev} size="small" sx={{ color: colors.red, p: 0.5 }}>
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={onNext} size="small" sx={{ color: colors.red, p: 0.5 }}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  )
}
