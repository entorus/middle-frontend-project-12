import { useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import { auth } from '../../api/queries/auth'
import { setCredentials } from '../../slices/authSlice'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .required('Введите имя пользователя'),

    password: Yup.string()
      .min(6, 'Минимум 6 символов')
      .required('Введите пароль'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
  })

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
      const errorMessage = (error.status === 401) ? 'Неверный логин пароль' : error.response?.data?.message ||
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
                  <div className="form-group">
                    <label htmlFor="username">Имя пользователя</label>
                    <Field
                      type="text"
                      name="username"
                      className={`form-control ${
                        errors.username && touched.username ? 'is-invalid' : ''
                      }`}
                      placeholder="Имя пользователя"
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <Field
                      type="password"
                      name="password"
                      className={`form-control ${
                        errors.password && touched.password ? 'is-invalid' : ''
                      }`}
                      placeholder="Пароль"
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Подтвердите пароль</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'is-invalid'
                          : ''
                      }`}
                      placeholder="Подтвердите пароль"
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmPassword"
                      className="invalid-feedback"
                    />
                  </div>
                  {serverError && <div>{serverError}</div>}
                  <Button type='submit'>Зарегистрироваться</Button>
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