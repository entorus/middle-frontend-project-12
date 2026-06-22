import { useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../api/queries/auth'
import { setCredentials } from '../../slices/authSlice'
import { useTranslation } from 'react-i18next'
import signupFormValidation from '../../validation/signupFormValidation'

function RegisterPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = signupFormValidation(t)

  const [serverError, setServerError] = useState('')
  const handleSubmit = async ({ username, password }, actions) => {
    setServerError('')
    try {
      const authInfo = await auth.signup({ username, password })
      const token = authInfo.token
      const user = { user: username, token }
      dispatch(setCredentials(user))
      navigate('/')
    } catch(error) {
      const errorMessage = (error.status === 409) ? t('forms.errors.userExists') : error.response?.data?.message ||
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
              initialValues={{ username: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-3">
                    <label className='form-label' htmlFor="username">{t('forms.username')}</label>
                    <Field
                      id="username"
                      autoComplete="off"
                      type="text"
                      name="username"
                      className={`form-control ${
                        errors.username && touched.username ? 'is-invalid' : ''
                      }`}
                      placeholder={t('forms.username')}
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label className='form-label' htmlFor="password">{t('forms.password')}</label>
                    <Field
                      id="password"
                      autoComplete="off"
                      type="password"
                      name="password"
                      className={`form-control ${
                        errors.password && touched.password ? 'is-invalid' : ''
                      }`}
                      placeholder={t('forms.password')}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label className='form-label' htmlFor="confirmPassword">{t('forms.confirmPassword')}</label>
                    <Field
                      id="confirmPassword"
                      autoComplete="off"
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'is-invalid'
                          : ''
                      }`}
                      placeholder={t('forms.confirmPassword')}
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmPassword"
                      className="invalid-feedback"
                    />
                  </div>
                  {serverError && <div className="alert alert-danger">{serverError}</div>}
                  <Button className="w-100 mt-2" type='submit'>{t('forms.signin')}</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default RegisterPage
