# Dnevnik client

A cli tool for accessing Moscow Electronic School (МЭШ) system using RedGuyRu's [Dnevnik API](https://github.com/RedGuyRu/DnevnikApi)

The project us for Russian users only, as it is just kinda useless for anyone outside the country since it uses Russan school system ¯\\_(ツ)_/¯

# Клиент Дневника МЭШ

Программа для доступа к МЭШ (dnevnik.mos.ru / school.mos.ru) при помощи [Dnevnik API](https://github.com/RedGuyRu/DnevnikApi)

## Установка

Для установки программы требуется [NodeJS и npm](https://nodejs.org/en/download/current)
```bash
npm install -g dnevnik-client
```

## Аутентификация
Сначала необходимо сгенерировать токен (будет сохранен как auth.json в локальной папке) для последующего доступа, используя логин и пароль от mos.ru:
```bash
dnvk auth <логин> <пароль>
```

Если у вас [включен 2FA](https://www.mos.ru/news/item/122371073/), необходимо дополнительно предоставить TOTP ключь:
```bash
dnvk auth <логин> <пароль> -t <totp>
```

## Использование

Использовать программу можно вызывая `dnvk` с нужной коммандой
```bash
dnvk <комманда>
```

Посмотреть список всех комманд можно так
```bash
dnvk --help
```