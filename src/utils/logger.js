const LEVEL_PREFIX = {
  debug:   '🔵 [DEBUG]',
  info:    '🟢 [INFO]',
  warning: '🟡 [WARN]',
  error:   '🔴 [ERROR]',
}

const _subscribers = []

function _notify(entry) {
  _subscribers.forEach(fn => fn(entry))
}

function _log(level, message, tag) {
  if (!import.meta.env.DEV) return
  const ts = new Date().toISOString()
  console.log(`${ts} ${LEVEL_PREFIX[level]}${tag ? ` [${tag}]` : ''}: ${message}`)
  _notify({ id: Date.now() + Math.random(), type: 'log', level, message, tag: tag ?? null, timestamp: ts, method: null, url: null, response: null, errorCode: null, errorMessage: null, errorData: null })
}

export const logger = {
  debug(message, tag)   { _log('debug',   message, tag) },
  info(message, tag)    { _log('info',    message, tag) },
  warning(message, tag) { _log('warning', message, tag) },
  error(message, tag)   { _log('error',   message, tag) },

  subscribe(fn) {
    _subscribers.push(fn)
    return () => {
      const i = _subscribers.indexOf(fn)
      if (i !== -1) _subscribers.splice(i, 1)
    }
  },

  apiInfo(method, url, params, body, response) {
    if (!import.meta.env.DEV) return
    const ts = new Date().toISOString()
    console.log('')
    console.log(`ℹ️  [INFO] ${ts}`)
    console.log('*********************** HTTP REQUEST ***********************')
    console.log(`* [${method.toUpperCase()}] ${url}`)
    console.log('* PARAMETER     :', params)
    console.log('* BODY          :', body)
    console.log('* REQUEST HEADERS:', response?.config?.headers ?? response?.headers ?? null)
    console.log(' ')
    console.log('----------------------- HTTP RESPONSE -----------------------')
    console.log('* ✅ RESPONSE    :', response)
    console.log('*************************************************************')
    console.log('')
    _notify({ id: Date.now() + Math.random(), type: 'apiInfo', level: 'info', message: null, tag: null, timestamp: ts, method: method.toUpperCase(), url, response, errorCode: null, errorMessage: null, errorData: null })
  },

  apiError(method, url, params, body, error) {
    if (!import.meta.env.DEV) return
    const ts = new Date().toISOString()
    const res = error?.response
    const code    = res?.status    ?? error?.status    ?? null
    const message = error?.message ?? String(error)
    const data    = res?.data      ?? null
    const status  = res?.statusText ?? error?.statusText ?? null
    console.log('')
    console.log(`❌ [ERROR] ${ts}`)
    console.log('*********************** HTTP REQUEST ***********************')
    console.log(`* [${method.toUpperCase()}] ${url}`)
    console.log('* PARAMETER     :', params)
    console.log('* BODY          :', body)
    console.log(' ')
    console.log('----------------------- HTTP ERROR -----------------------')
    console.log('* Code     :', code)
    console.log('* Message  :', message)
    console.log('* Response :', data)
    console.log('* Status   :', status)
    console.log('*************************************************************')
    console.log('')
    _notify({ id: Date.now() + Math.random(), type: 'apiError', level: 'error', message: null, tag: null, timestamp: ts, method: method.toUpperCase(), url, response: null, errorCode: code, errorMessage: message, errorData: data })
  },
}
