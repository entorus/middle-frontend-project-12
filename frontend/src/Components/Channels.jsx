import { 
  useRef,
  useState 
} from 'react'
import { 
  useDispatch, 
  useSelector 
} from 'react-redux'
import { 
  Button, 
  ListGroup, 
  Modal, 
  Dropdown, 
  ButtonGroup 
} from 'react-bootstrap'
import { 
  Form, 
  Field, 
  Formik, 
  ErrorMessage 
} from 'formik'
import * as Yup from 'yup'
import { 
  createChannel, 
  removeChannel, 
  setCurrentChannelId, 
  editChannel 
} from '../slices/channelsSlice'

function Channels() {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedChannel, setSelectedChannel] = useState(null)

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

  const handleClose = () => setShowModal(false)
  const handleShowCreate = () => {
    setModalMode('create')
    setShowModal(true)
  }

  const handleSubmit = async ({ channelName }, actions) => {
    if (modalMode === 'create') {
      await dispatch(
        createChannel({
          name: channelName
        })
      )
    }else{
      await dispatch(
        editChannel({
          id: selectedChannel.id,
          name: channelName
        })
      )
    }
    actions.setSubmitting(false)
    handleClose()
  }

  const handleDelete = async ({ id }) => {
    await dispatch(removeChannel(id))
    handleClose()
  }

  const showEditModal = async (e, channel) => {
    e.preventDefault()
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
    setModalMode('edit')
    setSelectedChannel(channel)
    setShowModal(true)
  }

  const showConfirmDeleteModal = async (e, channel) => {
    e.preventDefault()
    setModalMode('delete')
    setSelectedChannel(channel)
    setShowModal(true)
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2>Каналы</h2>
        <Button size="sm" variant="primary" onClick={handleShowCreate}>+</Button>
      </div>

      <ListGroup as="ul">
        {channels.map((channel) => (
          <ListGroup.Item 
            action 
            as="li" 
            key={channel.id}
            disabled={channel.id === currentChannelId}
            className='nav-item w-100 p-0'
          >
            {channel.removable 
              ? (
                <Dropdown as={ButtonGroup} className='w-100'>
                  <Button onClick={() => dispatch(setCurrentChannelId(channel.id))} variant="secondary" className='w-100 rounded-0 text-start text-truncate'># {channel.name}</Button>
                  <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => showConfirmDeleteModal(e, channel)} href="#">Удалить</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => showEditModal(e, channel)} href="#">Переименовать</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>) 
              : (<Button onClick={() => dispatch(setCurrentChannelId(channel.id))} variant="light" className='w-100 rounded-0 text-start'># {channel.name}</Button>)}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Formik
        initialValues={{
          channelName:
      modalMode === 'create'
        ? ''
        : selectedChannel?.name || '',
        }}
        validationSchema={modalMode === 'delete' ? null : validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => {
          const isDeleteMode = modalMode === 'delete'
          const isCreateMode = modalMode === 'create'

          const modalTitle = isDeleteMode
            ? 'Удалить канал'
            : isCreateMode
              ? 'Добавить канал'
              : 'Переименовать канал'

          const submitButtonText = isDeleteMode
            ? 'Удалить'
            : 'Отправить'

          const submitButtonVariant = isDeleteMode
            ? 'danger'
            : 'primary'

          return (
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {isDeleteMode ? (
                  <p className="mb-0">Уверены?</p>
                ) : (
                  <Form id="channel-form">
                    <Field
                      type="text"
                      name="channelName"
                      innerRef={inputRef}
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
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>

                {isDeleteMode ? (
                  <Button
                    type="button"
                    variant={submitButtonVariant}
                    onClick={() => handleDelete(selectedChannel)}
                  >
                    {submitButtonText}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    form="channel-form"
                    variant={submitButtonVariant}
                  >
                    {submitButtonText}
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          )
        }}
      </Formik>
    </div>
  )
}

export default Channels