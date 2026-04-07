## vendors 
```v0.0.1```\
cache, zip, backup, packagist, composer, php

#### Сохранение и использование готовых билдов composer

#### Установка
```bash
$ git clone git@github.com:fmihel/vendors.git 
$ cd ./vendors 
$ npm i
```
далее для примера используется следующая файловая структура :
```
 |--path
     |--vendors
     |--project
         |--dist
         |   |--vendor
         |--vendor 
```

использование ( при нахождении в папке ``project``)
#### Сохранение/обновление созданных vendor папок
```bash
# development
$ node ../vendors -o update -m dev
# production
$ node ../vendors -o update -m prod
```
#### Установка сохраненных билдов
```bash
# development
$ node ../vendors -o install -m dev
# production
$ node ../vendors -o install -m prod
```
#### Очистка архива
Будут удалены все архивы для несуществующих(удаленных) в текущем проекте веток git
```bash
$ node ../vendors -o clear
```

#### Получить подсказку по все командам
```bash
$ node ../vendors -o help
```



