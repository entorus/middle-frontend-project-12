import { useSelector } from 'react-redux'

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
    </div>
  )
}

export default Messages