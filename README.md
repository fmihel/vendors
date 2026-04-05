# vendors
cache, zip, backup, packagist, composer, php

#### Сохранение и использование готовых билдов composer

#### Установка
```bash
$ git clone git@github.com:fmihel/vendors.git
```
далее используется следующая файловая структура :
```
 |--path
     |--vendors
     |--project
         |--dist
         |   |--vendor
         |--vendor 
```

использование ( при нахождении в папке ``project``)
#### Сохранение созданных билдов
#### development
```bash
$ node ../vendors -m dev
```
#### production
```bash
$ node ../vendors -m prod
```
#### Установка сохраненных билдов
#### development
```bash
$ node ../vendors -o install -m dev
```
#### production
```bash
$ node ../vendors -o install -m prod
```




