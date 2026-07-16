import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { logger } from '../../utils/logger'

const LEVEL_COLOR = {
  debug:   '#1565C0',
  info:    '#2e7d32',
  warning: '#e65100',
  error:   '#c62828',
}

const LEVEL_LABEL = {
  debug:   'DEBUG',
  info:    'INFO',
  warning: 'WARN',
  error:   'ERROR',
}

function LogEntry({ entry }) {
  const color = LEVEL_COLOR[entry.level]
  const time  = entry.timestamp.slice(11, 23)

  if (entry.type === 'apiInfo') {
    return (
      <Box sx={{ borderLeft: `3px solid ${color}`, pl: 1, py: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Chip label="INFO" size="small" sx={{ bgcolor: color, color: '#fff', fontSize: '0.6rem', height: 16 }} />
          <Typography variant="caption" sx={{ color: '#888', fontFamily: 'monospace' }}>{time}</Typography>
          <Typography variant="caption" sx={{ color, fontFamily: 'monospace', fontWeight: 700 }}>✅ {entry.method} {entry.url}</Typography>
        </Box>
      </Box>
    )
  }

  if (entry.type === 'apiError') {
    return (
      <Box sx={{ borderLeft: `3px solid ${color}`, pl: 1, py: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip label="ERROR" size="small" sx={{ bgcolor: color, color: '#fff', fontSize: '0.6rem', height: 16 }} />
          <Typography variant="caption" sx={{ color: '#888', fontFamily: 'monospace' }}>{time}</Typography>
          <Typography variant="caption" sx={{ color, fontFamily: 'monospace', fontWeight: 700 }}>❌ {entry.method} {entry.url}</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#aaa', fontFamily: 'monospace', display: 'block', pl: 0.5 }}>
          {entry.errorCode} — {entry.errorMessage}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ borderLeft: `3px solid ${color}`, pl: 1, py: 0.25 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
        <Chip label={LEVEL_LABEL[entry.level]} size="small" sx={{ bgcolor: color, color: '#fff', fontSize: '0.6rem', height: 16 }} />
        <Typography variant="caption" sx={{ color: '#888', fontFamily: 'monospace' }}>{time}</Typography>
        {entry.tag && <Typography variant="caption" sx={{ color: '#aaa', fontFamily: 'monospace' }}>[{entry.tag}]</Typography>}
        <Typography variant="caption" sx={{ color: '#e0e0e0', fontFamily: 'monospace' }}>{entry.message}</Typography>
      </Box>
    </Box>
  )
}

export default function LoggerOverlay() {
  const [logs, setLogs]     = useState([])
  const [open, setOpen]     = useState(true)
  const bottomRef           = useRef(null)

  useEffect(() => {
    return logger.subscribe(entry => {
      setLogs(prev => [entry, ...prev].slice(0, 50))
    })
  }, [])

  if (!import.meta.env.DEV) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 0.5,
      }}
    >
      {open && (
        <Paper
          elevation={8}
          sx={{
            width: 420,
            maxHeight: 320,
            bgcolor: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, py: 0.75, borderBottom: '1px solid #333', bgcolor: '#111' }}>
            <Typography variant="caption" sx={{ color: '#888', fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1 }}>
              DEV LOGGER {logs.length > 0 && `(${logs.length})`}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setLogs([])}
              sx={{ color: '#666', fontSize: '0.65rem', p: 0.25, '&:hover': { color: '#aaa' } }}
              title="Clear logs"
            >
              CLR
            </IconButton>
          </Box>

          {/* Log list */}
          <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {logs.length === 0
              ? <Typography variant="caption" sx={{ color: '#555', fontFamily: 'monospace' }}>No logs yet — click a button.</Typography>
              : logs.map(entry => <LogEntry key={entry.id} entry={entry} />)
            }
            <div ref={bottomRef} />
          </Box>
        </Paper>
      )}

      {/* Toggle button */}
      <IconButton
        onClick={() => setOpen(o => !o)}
        size="small"
        sx={{
          bgcolor: '#1a1a1a',
          border: '1px solid #333',
          color: '#aaa',
          fontSize: '1rem',
          width: 36,
          height: 36,
          borderRadius: 2,
          '&:hover': { bgcolor: '#2a2a2a' },
        }}
        title="Toggle logger"
      >
        🪲
      </IconButton>
    </Box>
  )
}
