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
import { colors } from '../../theme/colors'

export default function AppHeader() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: colors.white, borderBottom: `1px solid ${colors.borderLight}` }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 4 },
          minHeight: 64,
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {/* Left: Bursa Malaysia logos */}
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
        <Box sx={{ width: '1px', bgcolor: colors.divider, flexShrink: 0 }} />

        {/* Bursa Gold Dinar logomark */}
        <Box
          component="img"
          src={BursaGoldDinarLogomarkSvg}
          alt="Bursa Gold Dinar"
          sx={{ height: 14, alignSelf: 'center', ml: 2 }}
        />

        {/* Right: BGD Microsite + language */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 'auto', pr: 1, alignSelf: 'center' }}>
          <AppButton variant="microsite">BGD Microsite</AppButton>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <IconButton sx={{ color: colors.iconBrown, p: 0.1 }}>
              <LanguageIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: colors.navy, fontWeight: 700, fontSize: '0.65rem' }}
            >
              EN
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
