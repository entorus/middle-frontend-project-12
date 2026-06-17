import { useState } from 'react'
import { useRollbar } from '@rollbar/react'
import { Alert, Button, Stack } from 'react-bootstrap'

function TestRollbar() {
  const rollbar = useRollbar()
  const [status, setStatus] = useState('')
  const [statusVariant, setStatusVariant] = useState('success')

  const isRollbarEnabled = Boolean(rollbar?.options?.enabled)

  const reportStatus = (message, variant = 'success') => {
    setStatus(message)
    setStatusVariant(variant)
  }

  const sendTestEvent = (sendEvent) => {
    if (!isRollbarEnabled) {
      reportStatus('Rollbar is disabled: set VITE_ROLLBAR_ACCESS_TOKEN', 'warning')
      return
    }

    const result = sendEvent()
    reportStatus(`Rollbar event queued${result?.uuid ? `: ${result.uuid}` : ''}`)
  }

  const sendInfoEvent = () => {
    sendTestEvent(() => rollbar.info('Rollbar test event from Test.jsx', {
      component: 'Test',
      source: 'manual-test-button',
    }))
  }

  const sendErrorEvent = () => {
    sendTestEvent(() => rollbar.error(new Error('Rollbar test error from Test.jsx'), {
      component: 'Test',
      source: 'manual-test-button',
    }))
  }

  return (
    <div className="mb-3">
      <Stack direction="horizontal" gap={2}>
        <Button type="button" size="sm" variant="outline-primary" onClick={sendInfoEvent}>
          Send Rollbar info
        </Button>
        <Button type="button" size="sm" variant="outline-danger" onClick={sendErrorEvent}>
          Send Rollbar error
        </Button>
      </Stack>
      {status && (
        <Alert className="mt-2 mb-0 py-2" variant={statusVariant}>
          {status}
        </Alert>
      )}
    </div>
  )
}

export default TestRollbar
