import * as Yup from 'yup'

export default (t) => {
  return Yup.object({
    username: Yup.string()
      .min(3, t('validation.minMax'))
      .max(20, t('validation.minMax'))
      .required(t('validation.usernameRequired')),

    password: Yup.string()
      .min(6, t('validation.min6'))
      .required(t('validation.passwordRequired')),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.confirmPassword.match'))
      .required(t('validation.confirmPassword.accept')),
  })
}