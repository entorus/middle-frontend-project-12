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
  addChannel, 
  removeChannel, 
  setCurrentChannelId, 
  editChannel 
} from '../slices/channelsSlice'

function Channels() {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [showAddModal, setShowModal] = useState(false)
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
          if (! value || modalMode === 'edit')
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
        addChannel({
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

  const handleRemove = async (e, id) => {
    e.preventDefault()
    await dispatch(removeChannel(id)) // todo add approvial
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
            onClick={() => dispatch(setCurrentChannelId(channel.id))}
            as="li" 
            key={channel.id}
            disabled={channel.id === currentChannelId}
            className='nav-item w-100 p-0'
          >
            {channel.removable 
              ? (
                <Dropdown as={ButtonGroup} className='w-100'>
                  <Button variant="secondary" className='w-100 rounded-0 text-start text-truncate'># {channel.name}</Button>
                  <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => handleRemove(e, channel.id)} href="#">Удалить</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => showEditModal(e, channel)} href="#">Переименовать</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>) 
              : (<Button variant="light" className='w-100 rounded-0 text-start'># {channel.name}</Button>)}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Formik
        initialValues={{ channelName: (modalMode === 'create') ? '' : selectedChannel.name }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{modalMode === 'create' ? 'Добавить' : 'Переименовать'} канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
              <Form id="add-channel-form">
                <Field
                  type="text"
                  name="channelName"
                  ref={inputRef}
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