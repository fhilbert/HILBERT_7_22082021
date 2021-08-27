Welcome to Groupomania 👋
Logo: groupomania

Réseau social d'entreprise

Stack technique
Frontend : Application VueJS & Framework Bootstrap.
Vue3 Bootstrap
Backend : NodeJS, Application Express, Typescript & Passport Auth.
node Express Typescript passport
Database : mySQL générée par Sequelize ORM au niveau du backend.
Sequelize mySQL
Compétences évaluées
Personnaliser le contenu envoyé à un client web
Gérer un stockage de données à l'aide de SQL
Implémenter un stockage de données sécurisé en utilisant SQL
Authentifier un utilisateur et maintenir sa session
Spécifications thechniques
guidelines.pdf
🏠 Homepage
Frontend
Backend
Setup
npm install
npm run serve
API Routes
Verb Setting Body Response type Function
Auth
POST /api/auth/signup { email: string, password:string } { message: string } Crypte l'email et hash le mot de passe de l'utilisateur, ajoute le nouvel utilisateur à la base de données
POST /api/auth/login { email: string, password: string } { userId: string, token: string } Vérifie les informations d'identification de l'utilisateur, en renvoyant l'identifiant userID depuis la base de données et un jeton Web JSON signé( contenant également l'identifiant userID )
POST /api/auth/logout ? ? Déconnecte l'utilisateur
Profile
GET api/profile _ Objet de profil Renvoie l'objet représentant les données de l'utilisateur
PUT api/profile _ Objet de profil Modifie les données du profil en base de données
DELETE api/profile _ { message: String } Supprime le compte utilisateur ainsi que ses données, ses posts et ses commentaires.
POST api/profile/avatar { image: File } { message: String } Upload une photo de profil.
PUT api/profile/avatar { image: File } { message: String } Update la photo de profil.
Posts
POST /api/post _ Tableau des posts Créé une publication et l'enregistre dans la base de données
GET /api/post \_ Post unique Renvoie le tableau de tous les posts dans la base de données
GET /api/post/:id { post: String, image: File } { message: String } Renvoie le post avec l'ID fourni
PUT /api/post/:id - - Modifie le post
DELETE /api/post/:id - - Supprime le post
Comments
POST api/posts/id/comments - - Créé une commentaire pour une publication donnée.
GET api/posts/id/comments - - Renvoie tous les commentaires pour une publication donnée.
GET api/posts/id/comments/id - - Renvoie le commentaires correspondant à l' ID fourni pour une publication donnée.
PUT api/posts/id/comments/id - - Modifie le commentaires correspondant à l' ID fourni pour une publication donnée.
Likes
GET /api/like - - Récupère les likes d'un post et son auteur
POST /api/like - - Renvoie la sauce avec l'ID fourni
PUT /api/like - - Modifie le statut d'un like.
Database
Author
👤 Virgile Guglielmi

Twitter : @virgilegug
Github : @VGMSoft
Show your support
Give a ⭐️ if this documentation helped you!

This README was generated️ by readme-md-generator
