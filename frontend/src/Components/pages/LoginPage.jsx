import { useState, useEffect } from 'react'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { auth } from '../../api/queries/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials, checkUserAuthenticated } from '../../slices/authSlice'
import { Card, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(checkUserAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const [serverError, setServerError] = useState('')
  const handleSubmit = async ({ username, password }, actions) => {
    setServerError('')
    try {
      const authInfo = await auth.login({ username, password })
      const token = authInfo.token
      const user = { user: username, token }
      dispatch(setCredentials(user))
      navigate('/')
    } catch(error) {
      const errorMessage = (error.status === 401) ? t('forms.errors.invalidCredentials') : error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
      setServerError(errorMessage)
    }
    actions.setSubmitting(false)
  }
  return (
    <Row className='justify-content-center align-content-center'>
      <Col md={8} xxl={6}>
        <Card>
          <Card.Body>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">{t('forms.nickname')}</label>
                    <Field
                      id="username"
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder={t('forms.nickname')}
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">{t('forms.password')}</label>
                    <Field
                      id="password"
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder={t('forms.password')}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>
                  {serverError && <div className='alert alert-danger'>{serverError}</div>}
                  <button type="submit" className="btn btn-primary w-100 mt-2">{t('forms.enter')}</button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <Card.Footer>
            {t('forms.noAccount')} <Link to='/signup'>{t('forms.registration')}</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  )
}
export default LoginPage
