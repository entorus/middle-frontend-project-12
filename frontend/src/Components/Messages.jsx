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
    <div className='d-flex flex-column h-100'>
      <div className='border border-secondary rounded'>
        <p><b># {currentChannelName}</b></p>
        <span className='text-muted'>{t('messages.count')}: {currentChannelMessagesCount}</span>
      </div>

      {currentChannelMessages.map((message) => (
        <div  className='mb-2' key={message.id}>
          <b>{message.username}</b>: {message.body}
        </div>
      ))}

      <div className='mt-auto px-5 py-3'>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              autoComplete="off"
              aria-label={t('messages.input.aria')}
              value={text}
              onChange={handleChange}
              placeholder={t('messages.input.placeholder')}
            />
            <Button type="submit" variant="outline-secondary" id="button-addon2">
              {t('forms.submit')}
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default Messages