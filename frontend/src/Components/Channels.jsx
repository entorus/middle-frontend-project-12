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
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import profanity from '../profanity.js'

function Channels() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedChannel, setSelectedChannel] = useState(null)

  const { channels } = useSelector(
    (state) => state.channels
  )

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, t('validation.minMax'))
      .max(20, t('validation.minMax'))
      .required(t('validation.channelNameRequired'))
      .test(
        'is-unique',
        t('validation.channelNameMustBeUnique'),
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
    try {
      const filteredName = profanity.clean(channelName.trim())
      if (modalMode === 'create') {
        await dispatch(
          createChannel({
            name: filteredName
          })
        ).unwrap()
        toast.success(t('toast.channelCreated'))
      }else{
        await dispatch(
          editChannel({
            id: selectedChannel.id,
            name: filteredName
          })
        ).unwrap()
        toast.success(t('toast.channelUpdated'))
      }
      
      handleClose()
      actions.resetForm()
    } catch (error) {
      toast.error(error)
      actions.setFieldError(
        'channelName',
        error
      )
    } finally {
      actions.setSubmitting(false)
    }
    actions.setSubmitting(false)
  }

  const handleDelete = async ({ id }) => {
    try {
      await dispatch(removeChannel(id)).unwrap()
      toast.success(t('toast.channelDeleted'))
      handleClose()
    } catch (error) {
      toast.error(error)
    }
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
      <div className='d-flex justify-content-between mb-3'>
        <h2>Каналы</h2>
        <Button size="sm" variant="primary" onClick={handleShowCreate}>+</Button>
      </div>

      <ListGroup as="ul">
        {channels.map((channel) => (
          <ListGroup.Item 
            action 
            as="li" 
            key={channel.id}
            className='nav-item w-100 p-0'
          >
            {channel.removable 
              ? (
                <Dropdown as={ButtonGroup} className='w-100'>
                  <Button onClick={() => dispatch(setCurrentChannelId(channel.id))} variant="secondary" className='w-100 rounded-0 text-start text-truncate'># {channel.name}</Button>
                  <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic">
                    <span class="visually-hidden">{t('channels.actions.manage')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => showConfirmDeleteModal(e, channel)} href="#">{t('channels.actions.remove')}</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => showEditModal(e, channel)} href="#">{t('channels.actions.rename')}</Dropdown.Item>
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
            ? t('channels.modal.removeTitle')
            : isCreateMode
              ? t('channels.modal.addTitle')
              : t('channels.modal.renameTitle')

          const submitButtonText = isDeleteMode
            ? t('channels.actions.remove')
            : t('forms.submit')

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
                  <p className="mb-0">{t('channels.modal.removeConfirmation')}</p>
                ) : (
                  <Form id="channel-form">
                    <label className="form-label" htmlFor="channelName">
                      {t('channels.field.name')}
                    </label>
                    <Field
                      id="channelName"
                      type="text"
                      name="channelName"
                      innerRef={inputRef}
                      className={`form-control ${
                        errors.channelName && touched.channelName ? 'is-invalid' : ''
                      }`}
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
                  {t('channels.actions.cancel')}
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