import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { sendMessage } from '../slices/messagesSlice'
import { useTranslation } from 'react-i18next'

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedInput = text.trim()

    if (! trimmedInput)
      return
    await dispatch(
      sendMessage({
        body: trimmedInput,
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
    <div>
      <h2>{t('messages.title')}</h2>

      {currentChannelMessages.map((message) => (
        <div key={message.id}>
          <b>{message.username}</b>: {message.body}
        </div>
      ))}

      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control 
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
  )
}

export default Messages