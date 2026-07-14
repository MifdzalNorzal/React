import { useState } from 'react'
import {
  Box, Typography, Button, Tabs, Tab, Card, CardContent,
  TextField, Divider, IconButton, Stack,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import GitHubIcon from '@mui/icons-material/GitHub'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  ResponsiveContainer, XAxis,
} from 'recharts'

const revenueData = [
  { v: 40 }, { v: 42 }, { v: 38 }, { v: 45 }, { v: 43 },
  { v: 50 }, { v: 55 }, { v: 58 }, { v: 62 }, { v: 70 },
]

const subscriptionData = [
  { v: 10 }, { v: 25 }, { v: 50 }, { v: 65 }, { v: 45 }, { v: 20 },
  { v: 30 }, { v: 60 }, { v: 75 }, { v: 55 }, { v: 35 }, { v: 15 },
]

const moveGoalData = [
  { v: 30 }, { v: 60 }, { v: 20 }, { v: 80 }, { v: 45 }, { v: 65 }, { v: 35 },
  { v: 75 }, { v: 50 }, { v: 40 }, { v: 70 }, { v: 55 }, { v: 85 }, { v: 45 },
]

const exerciseData = [
  { day: 'Mon', actual: 30, base: 40 },
  { day: 'Tue', actual: 45, base: 42 },
  { day: 'Wed', actual: 85, base: 45 },
  { day: 'Thu', actual: 55, base: 47 },
  { day: 'Fri', actual: 60, base: 50 },
  { day: 'Sat', actual: 70, base: 52 },
  { day: 'Sun', actual: 65, base: 55 },
]

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const JUNE_DAYS = Array.from({ length: 30 }, (_, i) => i + 1)
const NEXT_MONTH_DAYS = [1, 2, 3, 4, 5]
const HIGHLIGHTED_DAYS = new Set([5, 13])

const GoogleG = () => (
  <Box component="svg" viewBox="0 0 24 24" sx={{ width: 18, height: 18, flexShrink: 0 }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </Box>
)

function CalendarCard() {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <IconButton size="small"><ChevronLeftIcon sx={{ fontSize: 16 }} /></IconButton>
          <Typography variant="body2" fontWeight={500}>June 2025</Typography>
          <IconButton size="small"><ChevronRightIcon sx={{ fontSize: 16 }} /></IconButton>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', mb: 0.5 }}>
          {WEEK_DAYS.map(d => (
            <Typography key={d} variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              {d}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 0.5 }}>
          {JUNE_DAYS.map(d => (
            <Box
              key={d}
              sx={{
                width: 28, height: 28, display: 'flex', alignItems: 'center',
                justifyContent: 'center', mx: 'auto', borderRadius: '50%',
                bgcolor: HIGHLIGHTED_DAYS.has(d) ? 'text.primary' : 'transparent',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.75rem',
                  color: HIGHLIGHTED_DAYS.has(d) ? 'background.paper' : 'text.primary',
                  fontWeight: HIGHLIGHTED_DAYS.has(d) ? 600 : 400,
                }}
              >
                {d}
              </Typography>
            </Box>
          ))}
          {NEXT_MONTH_DAYS.map(d => (
            <Box
              key={`n${d}`}
              sx={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}
            >
              <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.75rem' }}>{d}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

function MoveGoalCard() {
  const [calories, setCalories] = useState(350)

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" fontWeight={600}>Move Goal</Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
          Set your daily activity goal.
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={1.5}>
          <IconButton
            size="small"
            onClick={() => setCalories(c => Math.max(0, c - 10))}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
          >
            <RemoveIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700} lineHeight={1}>{calories}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', letterSpacing: 1 }}>
              CALORIES/DAY
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setCalories(c => c + 10)}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
          >
            <AddIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>

        <Box sx={{ height: 90, mb: 1.5 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moveGoalData} barSize={10} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Bar dataKey="v" fill="#111827" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Button variant="outlined" fullWidth size="small" color="inherit" sx={{ textTransform: 'none' }}>
          Set Goal
        </Button>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  return (
    <Box sx={{ maxWidth: 1280, mx: 'auto', px: 4, py: 8 }}>

      {/* ── Hero ── */}
      <Box sx={{ textAlign: 'center', mb: 10 }}>
        <Box
          sx={{
            display: 'inline-flex',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 10,
            px: 2,
            py: 0.5,
            mb: 3,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Now available: shadcn CLI 3.0 and MCP Server →
          </Typography>
        </Box>

        <Typography
          variant="h2"
          fontWeight={700}
          sx={{ mb: 2.5, fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' }, lineHeight: 1.15 }}
        >
          The Foundation for your Design System
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 520, mx: 'auto', mb: 4, lineHeight: 1.7 }}
        >
          A set of beautifully designed components that you can customize, extend, and build on.
          Start here then make it your own. Open Source. Open Code.
        </Typography>

        <Stack direction="row" spacing={1.5} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'text.primary',
              color: 'background.paper',
              '&:hover': { bgcolor: 'grey.800' },
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Get Started
          </Button>
          <Button variant="text" size="large" color="inherit" sx={{ px: 3, textTransform: 'none' }}>
            View Components
          </Button>
        </Stack>
      </Box>

      {/* ── Tabs ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderBottom: 1,
          borderColor: 'divider',
          mb: 2,
        }}
      >
        <Tabs value={0}>
          {['Examples', 'Dashboard', 'Tasks', 'Playground', 'Authentication'].map((label, i) => (
            <Tab
              key={label}
              label={label}
              sx={{ textTransform: 'none', fontWeight: i === 0 ? 600 : 400, fontSize: '0.9rem' }}
            />
          ))}
        </Tabs>
        <Button
          size="small"
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ color: 'text.secondary', mb: 0.5, textTransform: 'none' }}
        >
          Theme: Default
        </Button>
      </Box>

      {/* ── Top row: 4 cards ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 2 }}>

        {/* Total Revenue */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption" color="text.secondary">Total Revenue</Typography>
            <Typography variant="h5" fontWeight={700} my={0.5}>$15,231.89</Typography>
            <Typography variant="caption" color="text.secondary">+20.1% from last month</Typography>
            <Box sx={{ height: 90, mt: 1.5 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="#111827"
                    strokeWidth={2}
                    dot={{ fill: '#111827', r: 3, strokeWidth: 0 }}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* Subscriptions */}
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">Subscriptions</Typography>
              <Typography
                variant="caption"
                sx={{ textDecoration: 'underline', cursor: 'pointer', color: 'text.primary' }}
              >
                View More
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight={700} my={0.5}>+2,350</Typography>
            <Typography variant="caption" color="text.secondary">+180.1% from last month</Typography>
            <Box sx={{ height: 90, mt: 1.5 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={subscriptionData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="subFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111827" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#111827"
                    strokeWidth={2}
                    fill="url(#subFill)"
                    dot={false}
                    activeDot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* Calendar */}
        <CalendarCard />

        {/* Move Goal */}
        <MoveGoalCard />
      </Box>

      {/* ── Bottom row: 3 cards ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>

        {/* Upgrade your subscription */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Upgrade your subscription
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
              You are currently on the free plan. Upgrade to the pro plan to get access to all features.
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Name</Typography>
                <TextField placeholder="Evil Rabbit" size="small" fullWidth />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Email</Typography>
                <TextField placeholder="example@acme.com" size="small" fullWidth />
              </Box>
            </Box>

            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Card Number</Typography>
            <TextField placeholder="1234 1234 1234 1234" size="small" fullWidth sx={{ mb: 1 }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1.5 }}>
              <TextField placeholder="MM/YY" size="small" fullWidth />
              <TextField placeholder="CVC" size="small" fullWidth />
            </Box>

            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Plan</Typography>
            <Typography variant="caption" color="text.secondary">
              Select the plan that best fits your needs.
            </Typography>
          </CardContent>
        </Card>

        {/* Create an account */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Create an account
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
              Enter your email below to create your account
            </Typography>

            <Stack direction="row" spacing={1} mb={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleG />}
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Google
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ px: 1, fontSize: '0.65rem', letterSpacing: 1 }}
              >
                OR CONTINUE WITH
              </Typography>
            </Divider>

            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Email</Typography>
            <TextField placeholder="m@example.com" size="small" fullWidth sx={{ mb: 1.5 }} />

            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Password</Typography>
            <TextField type="password" size="small" fullWidth />
          </CardContent>
        </Card>

        {/* Exercise Minutes */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Exercise Minutes
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
              Your exercise minutes are ahead of where you normally are.
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exerciseData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#111827"
                    strokeWidth={2}
                    dot={{ fill: '#111827', r: 3, strokeWidth: 0 }}
                    activeDot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="base"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    dot={{ fill: '#9ca3af', r: 3, strokeWidth: 0 }}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

      </Box>
    </Box>
  )
}
