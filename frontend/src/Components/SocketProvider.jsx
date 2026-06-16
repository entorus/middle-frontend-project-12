import { 
  useDispatch, 
  useSelector 
} from 'react-redux'
import { useEffect } from 'react'
import { socket } from '../api/socket'
import { checkUserAuthenticated } from '../slices/authSlice'
import { addMessageToState, removeMessagesById } from '../slices/messagesSlice'
import { 
  addChannelToState,
  removeChannelFromState, 
  renameChannelInState 
} from '../slices/channelsSlice'

function SocketProvider({ children }) {
  const dispatch = useDispatch()

  const isAuth = useSelector(checkUserAuthenticated)

  useEffect(() => {
    if (! isAuth) {
      socket.disconnect()
      return
    }

    socket.connect()

    const handleNewMessage = (payload) => {
      dispatch(addMessageToState(payload))
    }

    const handleNewChannel = (payload) => {
      dispatch(addChannelToState(payload))
    }

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannelFromState(payload))
      dispatch(removeMessagesById(payload))
    }

    const handleRenameChannel = (payload) => {
      dispatch(renameChannelInState(payload))
    }

    socket.on('newMessage', handleNewMessage)

    socket.on('newChannel', handleNewChannel)

    socket.on('removeChannel', handleRemoveChannel)

    socket.on('renameChannel', handleRenameChannel)

    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.off('newChannel', handleNewChannel)
      socket.off('removeChannel', handleRemoveChannel)
      socket.off('renameChannel', handleRenameChannel)
    }
  }, [dispatch, isAuth])

  return children
}
export default SocketProvider