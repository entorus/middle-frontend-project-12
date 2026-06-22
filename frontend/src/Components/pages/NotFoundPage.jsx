import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className='text-center'>
      <h1>{t('pages.notFound.title')}</h1>
      <p>{t('pages.notFound.goTo')} <a href="/">{t('pages.notFound.mainPage')}</a></p>
    </div>
  )
}

export default NotFoundPage
