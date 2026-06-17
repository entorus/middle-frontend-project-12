import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ru: {
    translation: {
      navigation: {
        logout: 'Выйти',
      },
      toast: {
        channelCreated: 'Канал создан',
        channelDeleted: 'Канал удален',
        channelUpdated: 'Канал переименован'
      },
      forms: {
        nickname: 'Ваш ник',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        enter: 'Войти',
        noAccount: 'Нет аккаунта?',
        registration: 'Регистрация',
        signin: 'Зарегистрироваться',
        errors: {
          invalidCredentials: 'Неверные имя пользователя или пароль',
          userExists: 'Такой пользователь уже существует',
        },
        submit: 'Отправить',
      },
      validation: {
        minMax: 'От 3 до 20 символов',
        usernameRequired: 'Обязательное поле',
        min6: 'Не менее 6 символов',
        passwordRequired: 'Введите пароль',
        confirmPassword: {
          match: 'Пароли должны совпадать',
          accept: 'Подтвердите пароль',
        },
        channelNameRequired: 'Введите название канала',
        channelNameMustBeUnique: 'Канал с таким названием уже существует',
      },
      pages: {
        notFound: {
          title: 'Страница не найдена',
        },
      },
      channels: {
        title: 'Каналы',
        actions: {
          add: 'Добавить канал',
          remove: 'Удалить',
          rename: 'Переименовать',
          cancel: 'Отменить',
          submit: 'Отправить',
          manage: 'Управление каналом'
        },
        field: {
          name: 'Имя канала',
        },
        modal: {
          addTitle: 'Добавить канал',
          renameTitle: 'Переименовать канал',
          removeTitle: 'Удалить канал',
          removeConfirmation: 'Уверены?',
        },
        errors: {
          fetch: 'Ошибка загрузки каналов',
          create: 'Ошибка создания канала',
          rename: 'Ошибка переименования канала',
          remove: 'Ошибка удаления канала',
        },
      },
      messages: {
        title: 'Сообщения',
        input: {
          placeholder: 'Введите сообщение...',
          aria: 'Новое сообщение'
        },
      },
      errors: {
        network: 'Ошибка соединения',
        unknown: 'Неизвестная ошибка',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', 
    interpolation: {
      escapeValue: false
    }
  })

export default i18n