import { useSelector } from 'react-redux'
import { Button, Form, InputGroup } from 'react-bootstrap'

function Messages() {
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  )

  const messages = useSelector((state) => state.messages.items)

  const currentChannelMessages = messages.filter(
    (message) => message.channelId === currentChannelId
  )

  return (
    <div>
      <h2>Сообщения</h2>

      {currentChannelMessages.map((message) => (
        <div key={message.id}>
          <b>{message.username}</b>: {message.body}
        </div>
      ))}

      <InputGroup className="mb-3">
        <Form.Control placeholder="Введите сообщение..." />
        <Button variant="outline-secondary" id="button-addon2">
          Отправить
        </Button>
      </InputGroup>
    </div>
  )
}

export default Messages