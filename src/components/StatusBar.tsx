import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface HeartbeatResponse {
  status: string
  timestamp: string
  server_time: string
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

const StatusBar: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting')
  const [lastCheck, setLastCheck] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const API_BASE_URL =
    process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

  const checkHeartbeat = async () => {
    try {
      const response = await axios.get<HeartbeatResponse>(
        `${API_BASE_URL}/heartbeat/`,
        {
          timeout: 5000, // 5 second timeout
        },
      )

      if (response.data.status === 'healthy') {
        setStatus('connected')
        setErrorMessage('')
        setLastCheck(new Date().toLocaleTimeString())
      } else {
        setStatus('error')
        setErrorMessage('Server unhealthy')
      }
    } catch (error: any) {
      setStatus('disconnected')
      if (error.code === 'ECONNREFUSED') {
        setErrorMessage('Server not running')
      } else if (error.code === 'ECONNABORTED') {
        setErrorMessage('Request timeout')
      } else {
        setErrorMessage('Connection failed')
      }
    }
  }

  useEffect(() => {
    // Initial check
    checkHeartbeat()

    // Set up polling every 10 seconds
    const interval = setInterval(checkHeartbeat, 10000)

    return () => clearInterval(interval)
  }, [])

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'disconnected':
        return 'Disconnected'
      case 'error':
        return 'Error'
      case 'connecting':
      default:
        return 'Connecting...'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return '●'
      case 'disconnected':
        return '●'
      case 'error':
        return '⚠'
      case 'connecting':
      default:
        return '○'
    }
  }

  return (
    <div className="pixel-font fixed left-0 top-0 z-50">
      <div
        className={`flex items-center space-x-2 px-3 py-2 text-xs ${
          status === 'connected' ? 'text-green-300/70' : 'text-white'
        }`}
        title={
          errorMessage
            ? `${getStatusText()}: ${errorMessage}`
            : `${getStatusText()}${lastCheck ? ` - Last check: ${lastCheck}` : ''}`
        }
      >
        <span className="font-mono text-xs">{getStatusIcon()}</span>
        <span className="text-xs">{getStatusText()}</span>
        {status === 'connected' && lastCheck && (
          <span className="text-xs opacity-50">({lastCheck})</span>
        )}
        {errorMessage && status !== 'connected' && (
          <span className="opacity-90">- {errorMessage}</span>
        )}
      </div>
    </div>
  )
}

export default StatusBar
