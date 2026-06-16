import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <>
      <h1>{t('pages.notFound.title')}</h1>
    </>
  )
}

export default NotFoundPage
