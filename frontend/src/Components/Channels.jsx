import { useSelector } from 'react-redux'
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

      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <button
              type="button"
              //   onClick={() => dispatch(setCurrentChannelId(channel.id))}
              disabled={channel.id === currentChannelId}
            >
              # {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Channels