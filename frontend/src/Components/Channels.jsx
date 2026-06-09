import { useSelector } from 'react-redux'
import { Button, ListGroup } from 'react-bootstrap'
// import {
//   setCurrentChannelId,
// } from "../features/channels/channelsSlice";

function Channels() {

  const { channels, currentChannelId } = useSelector(
    (state) => state.channels
  )

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2>Каналы</h2>
        <Button size="sm">+</Button>
      </div>

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