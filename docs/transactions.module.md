# Transactions module


> **Base Url**: http://localhost:3000/api/v1/transactions


## Post Transaction

> **Base Url**: http://localhost:3000/api/v1/transactions
> **Method POST**

### Тело Запроса
```
    fromAddress,
    toAddress,
    value,
    txnHash,
    block,
    timestampString,
    status
```

### Описание параметоров
```
    "fromAddress": EOA адресс отправителя,
    "toAddress": EOA адресс получателя,
    "value": количество эфиора | number | ether,
    "txnHash": хэш транзакции | string,
    "block": номер блока | number,
    "timestampString": дата транзакции,
    "status": статус транзакции
```

##### Пример
```
http://localhost:3000/api/v1/transactions
body: 
{
    "fromAddress": "0x2a9A61E6B35bf92438917C14D01E8d201682A932",
    "toAddress": "0xD155b2B8450B016dc399f939f0aA59D6b17C722a",
    "value": 10000,
    "txnHash": "0x10e442b5b528a9e9b34e5f8416793918ab1c76eb016a2aa107cff184364a9728",
    "block": 14194268,
    "timestampString": "Sun Feb 20 2022 06:50:14 GMT+0600 (East Kazakhstan Time)",
    "status": "Success"
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





## Get Transactions

> **Base Url**: http://localhost:3000/api/v1/transactions
> **Method GET**

### Необезательные параметры
```
    limit,
    page
```

### Описание параметоров
```
    limit: лимит пагинции
    page: страница пагинации
```

##### Пример
```
http://localhost:3000/api/v1/transactions?limit=5&page=1
```

##### Ответ
code: 200
```
{
    "message": {
        "items": [
            {
                "id": 1,
                "txnHash": "0x10e442b5b528a9e9b34e5f8416793918ab1c76eb016a2aa107cff184364a9728",
                "block": "14194268",
                "timestamp": "2022-02-20T00:50:14.000Z",
                "status": "Success           ",
                "value": "10000"
            }
        ],
        "meta": {
            "totalItems": 1,
            "itemCount": 1,
            "itemsPerPage": 5,
            "totalPages": 1,
            "currentPage": 1
        }
    },
    "status": 200
}
```





## Get Transaction

> **Base Url**: http://localhost:3000/api/v1/transactions/:txnHash

> **Method Get**

### Обязятельные параметры
```
 txnHash
```

### Описание параметоров
```
    txnHash: хэш транзакции
```

##### Пример
```
http://localhost:3000/api/v1/transactions/0x10e442b5b528a9e9b34e5f8416793918ab1c76eb016a2aa107cff184364a9728
```

##### Ответ
code: 200
```
{
    "message": {
        "id": 1,
        "txnHash": "0x10e442b5b528a9e9b34e5f8416793918ab1c76eb016a2aa107cff184364a9728",
        "block": "14194268",
        "timestamp": "2022-02-20T00:50:14.000Z",
        "status": "Success           ",
        "value": "10000"
    },
    "status": 200
}
```





