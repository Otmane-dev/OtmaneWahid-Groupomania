Projet 7 - Groupomania 
Créer un réseau social d'entreprise.

stack utilisée pour ce projet:

React + Redux + Sequelize

NodeJs + Express + Sequelize

Mysql

///////////////   FRONTEND   /////////////////

aller dans la racine du dossier client créer un fichier : .env coller y  REACT_APP_API_URL=http://localhost:5000/

ouvrir terminal mettez vous sur le dossier client : cd client,
ensuite faite un :  npm install ,
puis : npm start  

//////////////   BACKEND   /////////////////////////

aller dans la racine du dossier backend créer un dossier: images,
toujours a la racine du dossier backend créer un fichier : .env
coller y : PORT=5000
            CLIENT_URL=http://localhost:3000
            TOKEN_SECRET="votre token" 


            DB_NAME="nom de votre data base normalement groupomania"
            DB_USER="votre root"
            DB_PASS="votre mots de passe database"
            DB_HOST=localhost
            DB_DIALECT=mysql

ouvrez le terminal aller sur le backend : cd backend,
puis : npm install ,

assurez vous d'avoir nodemon, 
ensuite lancé le backend avec : nodemon server,

toujours dans le backend aller au fichier server.js décommenté la ligne de 31 à 31 et de 35 à 37, se qui théoriquement va créer votre data base et vos tables après avois vérifier recommenté ces ligne sinon a chaque enregistrement toute la data base et tables serons recréer et supprimeront vos donnés 