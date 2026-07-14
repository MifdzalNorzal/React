import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import GraphicPatternSvg from '../../assets/Graphic Pattern.svg'
import { colors } from '../../theme/colors'

const DEFAULT_LINKS = [
  { label: 'Platform Rules', href: '#' },
  { label: 'Personal Data Notice', href: '#' },
  { label: 'General Terms and Conditions', href: '#' },
]

const DEFAULT_COPYRIGHT =
  'Copyright © 2025 Bursa Malaysia Berhad 197601004668 (30632-P). All rights reserved.'

export default function AppFooter({
  copyrightText = DEFAULT_COPYRIGHT,
  links = DEFAULT_LINKS,
}) {
  return (
    <Box component="footer" sx={{ mt: 'auto' }}>
      <Box sx={{ lineHeight: 0, overflow: 'hidden' }}>
        <Box
          component="img"
          src={GraphicPatternSvg}
          alt=""
          sx={{ width: '100%', display: 'block', height: 'auto' }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          bgcolor: colors.white,
          borderTop: `2px solid ${colors.navy}`,
          px: { xs: 2, md: 4 },
          py: 2,
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {copyrightText}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2}>
          {links.map((link) => (
            <Typography
              key={link.label}
              component="a"
              href={link.href}
              variant="caption"
              sx={{
                color: colors.linkBlue,
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
