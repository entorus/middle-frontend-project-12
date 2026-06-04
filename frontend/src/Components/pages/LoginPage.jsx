import { Formik } from 'formik'

const LoginPage = () => (
  <>
    <Formik>
      <form>
        <input
          type="email"
          name="email"
        />
        <input
          type="password"
          name="password"
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </Formik>
  </>
)
export default LoginPage