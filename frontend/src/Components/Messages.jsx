import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { sendMessage } from '../slices/messagesSlice'
import { useTranslation } from 'react-i18next'
import profanity from '../profanity.js'

function Messages() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  )
  const messages = useSelector((state) => state.messages.items)
  const username = useSelector((state) => state.auth.user)

  const currentChannelMessages = messages.filter(
    (message) => message.channelId === currentChannelId
  )

  const currentChannelMessagesCount = currentChannelMessages ? currentChannelMessages.length : 0
  const currentChannelName = useSelector((state) => {
    const currentChannel = state.channels.channels.find(
      (channel) => Number(channel.id) === Number(state.channels.currentChannelId)
    )

    return currentChannel?.name || ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedInput = text.trim()

    if (! trimmedInput)
      return
    await dispatch(
      sendMessage({
        body: profanity.clean(trimmedInput),
        channelId: currentChannelId,
        username,
      })
    )
    setText('')
  }

  const handleChange = (event) => {
    setText(event.target.value)
  }

  return (
    <div
      className="h-100 d-flex flex-column flex-grow-1 overflow-hidden"
    >
      <div className="flex-shrink-0 border-bottom bg-body-tertiary px-4 py-3">
        <p className="fw-bold mb-1"># {currentChannelName}</p>
        <span className="small text-muted">{t('messages.count')}: {currentChannelMessagesCount}</span>
      </div>

      <div className="flex-grow-1 overflow-y-scroll px-4 py-3">
        {currentChannelMessages.map((message) => (
          <div className="mb-3" key={message.id}>
            <span className="fw-bold">{message.username}</span>
            <span className="text-break">: {message.body}</span>
          </div>
        ))}
      </div>

      <div className="flex-shrink-0 border-top bg-body p-3">
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              autoComplete="off"
              aria-label={t('messages.input.aria')}
              value={text}
              onChange={handleChange}
              placeholder={t('messages.input.placeholder')}
            />
            <Button type="submit" variant="primary" id="button-addon2">
              {t('forms.submit')}
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default Messages
