import { Form, Field, Formik } from 'formik'

const LoginPage = () => {
  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
    }, 1000)
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      )}
    </Formik>
  )
}
export default LoginPage
