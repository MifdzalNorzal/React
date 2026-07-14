import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BursaLogomarkSvg from '../../assets/Bursa Logomark.svg'

export default function CarouselPanel({ slides, activeIndex, onPrev, onNext }) {
  const nextIndex = (activeIndex + 1) % slides.length
  const currentSlide = slides[activeIndex]

  return (
    <Box
      sx={{
        bgcolor: '#0A1764',
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
          color: '#FFFFFF',
          fontWeight: 700,
          textAlign: 'center',
          mt: 2,
          lineHeight: 1.3,
        }}
      >
        {currentSlide.title}
      </Typography>

      {/* Decorative centre area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          position: 'relative',
        }}
      >
        {/* Large coin (Bursa Logomark) */}
        <Box
          component="img"
          src={BursaLogomarkSvg}
          alt="Bursa Malaysia"
          sx={{
            width: 180,
            height: 180,
            opacity: 0.95,
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
          }}
        />
        {/* Small coin top-right */}
        <Box
          component="img"
          src={BursaLogomarkSvg}
          alt=""
          sx={{
            width: 80,
            height: 80,
            position: 'absolute',
            top: 8,
            right: { xs: 16, md: 40 },
            opacity: 0.85,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
          }}
        />
        {/* Small coin bottom-left */}
        <Box
          component="img"
          src={BursaLogomarkSvg}
          alt=""
          sx={{
            width: 72,
            height: 72,
            position: 'absolute',
            bottom: 8,
            left: { xs: 16, md: 40 },
            opacity: 0.85,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
          }}
        />
      </Box>

      {/* Bottom carousel bar */}
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.08)',
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
          sx={{ color: 'rgba(255,255,255,0.7)', flex: 1, noWrap: true }}
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
                bgcolor: i === activeIndex ? '#CC0000' : 'rgba(255,255,255,0.4)',
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
            sx={{ color: 'rgba(255,255,255,0.8)', p: 0.5 }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={onNext}
            size="small"
            sx={{ color: 'rgba(255,255,255,0.8)', p: 0.5 }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  )
}
