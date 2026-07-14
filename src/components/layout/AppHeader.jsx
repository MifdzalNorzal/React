import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LanguageIcon from '@mui/icons-material/Language'
import IconButton from '@mui/material/IconButton'
import AppButton from '../common/AppButton'
import BursaMalaysiaSvg from '../../assets/Bursa Malaysia.svg'
import BursaLogomarkSvg from '../../assets/Bursa Logomark.svg'
import BursaGoldDinarLogomarkSvg from '../../assets/Bursa Gold Dinar Logomark.svg'

export default function AppHeader() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #E0E0E0' }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 4 },
          minHeight: 64,
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {/* Left: Bursa Malaysia logos — content centred within the stretched column */}
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ pr: 2 }}>
          <Box
            component="img"
            src={BursaMalaysiaSvg}
            alt="Bursa Malaysia"
            sx={{ height: 28, alignSelf: 'center', ml: 2 }}
          />
          <Box
            component="img"
            src={BursaLogomarkSvg}
            alt=""
            sx={{ height: 32, alignSelf: 'center', ml: 2 }}
          />
        </Stack>

        {/* Full-height divider */}
        <Box sx={{ width: '1px', bgcolor: '#CCCCCC', flexShrink: 0 }} />

        {/* Bursa Gold Dinar logomark */}
        <Box
          component="img"
          src={BursaGoldDinarLogomarkSvg}
          alt="Bursa Gold Dinar"
          sx={{ height: 14, alignSelf: 'center', ml: 2 }}
        />

        {/* Right: BGD Microsite + language */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 'auto', pr: 1, alignSelf: 'center' }}>
          <AppButton
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: '50px',
              px: 3,
              py: 0.75,
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid #CC0000',
              color: '#CC0000',
              '&:hover': { border: '1px solid #AA0000', bgcolor: 'rgba(204,0,0,0.04)' },
            }}
          >
            BGD Microsite
          </AppButton>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <IconButton sx={{ color: '#64320a', p: 0.1 ,}}>
              <LanguageIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: '#0A1764', fontWeight: 700, fontSize: '0.65rem' }}
            >
              EN
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
