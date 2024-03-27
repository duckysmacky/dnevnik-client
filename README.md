# Dnevnik client

A tool for accessing Moscow Electronic School (МЭШ) system using RedGuyRu's [Dnevnik API](https://github.com/RedGuyRu/DnevnikApi)

The project us for Russian users only, as it is just kinda useless for anyone outside the country

# Клиент Дневника МЭШ

Инструмент для доступа к МЭШ (dnevnik.mos.ru / school.mos.ru) при помощи [Dnevnik API](https://github.com/RedGuyRu/DnevnikApi)

## Установка

Проект пока еще находится в разработке, поэтому полноценного CLI пока нету, придется пользоваться через локальную папку с **клонированной репозиторией**

Для работы необходимо установить [Dnevnik API](https://github.com/RedGuyRu/DnevnikApi)
```bash
npm install dnevnik-mos-ru-api
yarn add dnevnik-mos-ru-api
```

Затем просто клонируем репозиторию куда то и пользуемся через [NodeJS](https://nodejs.org/en)
```bash
git clone https://github.com/duckysmacky/dnevnik-client.git
```

## Аутентификация
Сначала необходим сгенерировать токен для последующего доступа используя логин и пароль от mos.ru
```bash
node auth <логин> <пароль>
```

Если у вас [включен 2FA](https://www.mos.ru/news/item/122371073/), необходимо предоставить TOTP ключь
```bash
node auth <логин> <пароль> <totp>
```

## Использование

### Список всех комманд
```bash
node client help
```

### Информацию о школе
```bash
node client schoolInfo
```

### Профиль
```bash
node client profile
```