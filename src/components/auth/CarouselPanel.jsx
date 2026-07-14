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
  const currentSlide = slides[activeIndex]
  const animContainerRef = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: ANIMATION_URLS[activeIndex],
    })
    return () => anim.destroy()
  }, [activeIndex])

  return (
    <Box
      sx={{
        bgcolor: colors.navy,
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 400,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Slide title */}
      <Typography
        variant="h5"
        sx={{
          color: colors.white,
          fontWeight: 700,
          textAlign: 'center',
          mt: 2,
          lineHeight: 1.3,
          whiteSpace: 'pre-line',
        }}
      >
        {currentSlide.title}
      </Typography>

      {/* Lottie animation */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
        }}
      >
        <div ref={animContainerRef} style={{ width: '100%', maxWidth: 320 }} />
      </Box>

      {/* Bottom carousel bar */}
      <Box
        sx={{
          bgcolor: colors.carouselBar,
          borderRadius: 2,
          px: 2,
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        {/* Next label */}
        <Typography
          variant="caption"
          sx={{ color: colors.carouselText, flex: 1 }}
          noWrap
        >
          Next: {slides[nextIndex].subtitle}
        </Typography>

        {/* Dot indicators */}
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ px: 1 }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: i === activeIndex ? 20 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === activeIndex ? colors.red : colors.carouselDotInactive,
                transition: 'width 0.3s ease, background-color 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </Stack>

        {/* Prev / Next buttons */}
        <Stack direction="row" spacing={0.25}>
          <IconButton
            onClick={onPrev}
            size="small"
            sx={{ color: colors.carouselIcon, p: 0.5 }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={onNext}
            size="small"
            sx={{ color: colors.carouselIcon, p: 0.5 }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  )
}
