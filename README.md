#GROUPOMANIA

## Introduction

Le projet consiste à construire un réseau social interne pour les employés de Groupomania.
Le but de cet outil est de faciliter les interactions entre collègues.

Le projet a été développé à l'aide des technologies suivantes :

Node Js , Express , MySql , Sequelize , Vue Js, Vue CLI

## Installation

L'installation de NodeJS, Express, Sequelize et Mysql est requise sur votre ordinateur.

**FRONTEND**

Clônez le repo sur lequel vous vous trouvez.

À la racine du dossier frontend => npm install

Puis npm run serve

Vous verrez ensuite 2 urls: copier et coller l'url Network dans votre navigateur web.

(Exemple:
App running at:

- Local: http://localhost:8080/
- Network: http://192.168.1.64:8080/)

**Installation de la base de données**
Entrez: - npm i sequelize - sequelize init

Dans le dossier backend modifer le mot de passe dans config/config.json

Créez une base de données nommée "groupomania" dans votre base de données mysql. Command : CREATE DATABASE groupomania;

Pour finaliser la base de données, executez dans la racine du dossier backend : Command : "sequelize db:migrate"

Puis lancez le serveur avec "npm start"

Installer le logiciel MAMP
Dans preférences/ports cliquez sur le ports 80 & 3306
Ensuite cliquez sur START

**BACKEND**

Installer mysql dans le backend => npm i mysql
(par default le User=root et il n'y a pas de mot de passe)
Pour modifier le mot de passe faites la commande:
mysqladmin -u -root password VOTRE MOT DE PASSE

À la racine du dossier backend, faites un npm install

Faites un node server ou nodemon server (node recquis pour cette aplication)
