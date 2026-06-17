import { Navigate } from 'react-router-dom'
import { checkUserAuthenticated } from '../../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchChannels } from '../../slices/channelsSlice'
import { fetchMessages } from '../../slices/messagesSlice'
import Messages from '../Messages'
import Channels from '../Channels'
import { Row, Col } from 'react-bootstrap'
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
      <Row className="g-3">
        <Col md={4} lg={3}>
          <Channels />
        </Col>
        <Col md={8} lg={9}>
          <Messages />
        </Col>
      </Row>
    </SocketProvider>
  )
}

export default MainPage
