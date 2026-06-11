import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// import {
//   setCurrentChannelId,
// } from "../features/channels/channelsSlice";

function Channels() {
  const [showAddModal, setShowAddModal] = useState(false)

  const { channels, currentChannelId } = useSelector(
    (state) => state.channels
  )

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .required('Введите название канала')
      .test(
        'is-unique',
        'Канал с таким названием уже существует',
        (value) => {
          if (! value)
            return true

          const normalizedValue = value.trim().toLowerCase()

          const alreadyExists = channels.some(
            (channel) => channel.name.trim().toLowerCase() === normalizedValue
          )

          return ! alreadyExists
        }
      )
  })

  const handleClose = () => setShowAddModal(false)
  const handleShow = () => setShowAddModal(true)

  const handleSubmit = async ({ channelName }, actions) => {
    console.log(111, channelName)
    actions.setSubmitting(false)
    handleClose()
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2>Каналы</h2>
        <Button size="sm" variant="primary" onClick={handleShow}>+</Button>
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

      <Formik
        initialValues={{ channelName: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
              <Form id="add-channel-form">
                <Field
                  type="text"
                  name="channelName"
                  className="form-control"
                  className={`form-control ${
                    errors.channelName && touched.channelName ? 'is-invalid' : ''
                  }`}
                  placeholder="Название канала"
                />
                <ErrorMessage
                  component="div"
                  name="channelName"
                  className="invalid-feedback"
                />
              </Form>
            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Отменить
              </Button>
              <Button type="submit" form="add-channel-form" variant="primary">
                Отправить
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </div>
  )
}

export default Channels