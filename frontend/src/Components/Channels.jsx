import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
// import {
//   setCurrentChannelId,
// } from "../features/channels/channelsSlice";

function Channels() {

  const { channels, currentChannelId } = useSelector(
    (state) => state.channels
  )

  return (
    <div>
      <h2>Каналы</h2>

      <ListGroup as="ul">
        {channels.map((channel) => (
          <ListGroup.Item 
            action 
            //   onClick={() => dispatch(setCurrentChannelId(channel.id))}
            as="li" 
            key={channel.id}
            disabled={channel.id === currentChannelId}
          >
            # {channel.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Channels