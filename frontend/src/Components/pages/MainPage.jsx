import { Navigate } from 'react-router-dom'
import { checkUserAuthenticated } from '../../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchChannels } from '../../slices/channelsSlice'
import { fetchMessages } from '../../slices/messagesSlice'
import Messages from '../Messages'
import Channels from '../Channels'

const MainPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChannels())
    dispatch(fetchMessages())
  }, [dispatch])

  const isAuth = useSelector(checkUserAuthenticated)

  if (! isAuth) {
    return <Navigate to="/login" replace />
  }

  return <div>
    <Channels />
    <Messages />
  </div>
}

export default MainPage
