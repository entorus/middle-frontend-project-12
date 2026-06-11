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

const MainPage = () => {
  const dispatch = useDispatch()

  const isAuth = useSelector(checkUserAuthenticated)

  useEffect(() => {
    if (!isAuth) {
      return
    }

    dispatch(fetchChannels())
    dispatch(fetchMessages())
  }, [dispatch, isAuth])

  if (! isAuth)
    return <Navigate to="/login" replace />

  return (
    <SocketProvider>
      <Row>
        <Col md={2}>
          <Channels />
        </Col>
        <Col>
          <Messages />
        </Col>
      </Row>
    </SocketProvider>
  )
}

export default MainPage
