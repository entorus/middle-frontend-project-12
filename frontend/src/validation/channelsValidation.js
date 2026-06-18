import * as Yup from 'yup'

export default (channels, t) => {
  return Yup.object({
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
}