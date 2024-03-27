# Dnevnik client

A tool for accessing Moscow Electronic School (МЭШ) system using RedGuyRu's [Dnevnik API](https://github.com/RedGuyRu/DnevnikApi)

The project us for Russian users only, as it is just kinda useless for anyone outside the country since it uses Russan school system ¯\\_(ツ)_/¯

# Клиент Дневника МЭШ

Программа для доступа к МЭШ (dnevnik.mos.ru / school.mos.ru) при помощи [Dnevnik API](https://github.com/RedGuyRu/DnevnikApi)

## Установка

Проект пока еще находится в разработке, поэтому полноценного CLI пока нету, придется пользоваться через локальную папку с **клонированной репозиторией**

Для работы необходимо установить [Dnevnik API](https://github.com/RedGuyRu/DnevnikApi)
```bash
npm install dnevnik-mos-ru-api
yarn add dnevnik-mos-ru-api
```

Затем просто клонируем репозиторию и уже оттуда пользуемся через [NodeJS](https://nodejs.org/en)
```bash
git clone https://github.com/duckysmacky/dnevnik-client.git
cd dnevnik-client
```

## Аутентификация
Сначала необходимо сгенерировать токен (будет сохранен как auth.json в локальной папке) для последующего доступа, используя логин и пароль от mos.ru:
```bash
node auth <логин> <пароль>
```

Если у вас [включен 2FA](https://www.mos.ru/news/item/122371073/), необходимо дополнительно предоставить TOTP ключь:
```bash
node auth <логин> <пароль> <totp>
```

## Использование

### Пользоваться данной программой можно (пока только) через node, вызывая client.js с нужными аргументами
```bash
node client <комманда> [дополнительные аргументы]
```

### Посмотреть список всех комманд самому можно так
```bash
node client help
```

## Полный список комманд

*< > - необходимо ввести*
*[ ] - опционально*

Общие

```bash
help
schoolInfo
profile
```

Академические

```bash
subjects
averageMarks
quarterMarks
progress
```

Зависимые от времяни (дней / месяцев)

```bash
schedule [дней с сегодня]
homework [дней с сегодня] [до какого кол-ва дней]
visits [дней с сегодня] [до какого кол-ва дней]
balance [месяцев с текущего] [до какого кол-ва месяцев]
```

Требуют айди

```bash
getTeacher <айди учителя>
getAnswers <айди теста>
```

Остальные

```bash
notifications [тип уведомления]
menu
```