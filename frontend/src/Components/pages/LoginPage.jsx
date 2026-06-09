import { useState, useEffect } from 'react'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { auth } from '../../api/queries/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setCredentials, checkUserAuthenticated } from '../../slices/authSlice'

const LoginPage = () => {
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
      const errorMessage = (error.status === 401) ? 'Неверный логин пароль' : error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
      setServerError(errorMessage)
    }
    actions.setSubmitting(false)
  }
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field
              type="text"
              name="username"
              className="form-control"
            />
            <ErrorMessage
              component="div"
              name="username"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              className="form-control"
            />
            <ErrorMessage
              component="div"
              name="password"
              className="invalid-feedback"
            />
          </div>
          {serverError && <div>{serverError}</div>}
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      )}
    </Formik>
  )
}
export default LoginPage
