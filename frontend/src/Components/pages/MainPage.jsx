import { Navigate } from 'react-router-dom'
import { checkUserAuthenticated } from '../../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchChannels } from '../../slices/channelsSlice'
import { fetchMessages } from '../../slices/messagesSlice'
import Messages from '../Messages'
import Channels from '../Channels'
import { Card } from 'react-bootstrap'
import SocketProvider from '../SocketProvider'
import { toast } from 'react-toastify'

const MainPage = () => {
  const dispatch = useDispatch()

  const isAuth = useSelector(checkUserAuthenticated)

  useEffect(() => {
    if (!isAuth) {
      return
    }

    try {
      dispatch(fetchChannels()).unwrap()
      dispatch(fetchMessages()).unwrap()
    } catch (error) {
      toast.error(error)
    }
  }, [dispatch, isAuth])

  if (! isAuth)
    return <Navigate to="/login" replace />

  return (
    <SocketProvider>
      <Card
        className="h-100 flex-grow-1 d-flex flex-row shadow-sm overflow-hidden"
      >
        <div className="col-4 col-lg-3 h-100 d-flex flex-column overflow-hidden border-end bg-body-tertiary">
          <Channels />
        </div>
        <div
          className="col-8 col-lg-9 h-100 d-flex flex-column overflow-hidden bg-body"
        >
          <Messages />
        </div>
      </Card>
    </SocketProvider>
  )
}

export default MainPage
