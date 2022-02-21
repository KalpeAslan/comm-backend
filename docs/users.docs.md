# Users module


> **Base Url**: http://localhost:3000/api/v1/users



> **Base Url**: http://localhost:3000/api/v1/users
> **Method POST**

### Тело Запроса
```
    address,
    name,
    surname,
    photo,
    birthDate,
    passportId
```

### Описание параметоров
```
    "address": Адресс EOA пользователя,
    "name": Имя,
    "surname": Фамилия,
    "photo": ССЫЛКА на фото пользоватлея,
    "birthDate": Дата рождения пользователя,
    "passportId": id пасспорта пользователя / ИИН / 12 знаков
```

##### Пример
```
http://localhost:3000/api/v1/users

body: 
{
    "address": "0x2a9A61E6B35bf92438917C14D01E8d201682A932",
    "name": "Tirion",
    "surname": "Lanister",
    "photo": "ssssss",
    "birthDate": "Sun Feb 13 2022 07:24:42",
    "passportId": "020808550522"
}
```

##### Ответ
code: 200
```
{
    message: "Users is added",
    status: 200
}
```

