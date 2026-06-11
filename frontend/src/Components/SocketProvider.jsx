import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { socket } from '../api/socket'
import { checkUserAuthenticated } from '../slices/authSlice'
import { addMessage } from '../slices/messagesSlice'

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
      dispatch(addMessage(payload))
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [dispatch, isAuth])

  return children
}
export default SocketProvider