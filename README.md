
# Projet Web VueJS 4A ESIEA - LetsMeet
#### Réalisé par Stephen SAKOVITCH, Théo MACHON et Florian PINSARD

**Adresse du site**
https://stephsako-letsmeet.glitch.me/

## Project setup
```
npm install
```

## Préambule

LetsMeet est un site Web permettant à des utilisateurs de créer, partager et
gérer des événements et des idées de sorties, ainsi que de voir qui participe à
ses événements créés.<br>
Certaines fonctionnalités du site sont accessibles en mode hors-connecté,
comme lister les événements et les visualiser sur la Map, mais il faut se
connecter pour accéder à son compte, créer un événement, lister ceux qu’on a
créer et lister ses participations.
<br><br>
*CRUD* est donc bien respecté:
- **Create** : création d’événements ;
- **Read** : liste de ses propres événements et participations ;
- **Update** : modifications des données relatives à son compte ainsi que ceux de
ses événements ;
- Delete : suppression de ses événements et de ses participations.

### Page principale
La page principale liste tous les événements chronologiquement créés. Il suffit
de cliquer sur l'un deux pour le localiser sur la carte à droite.<br>
Nous pouvons nous connecter et nous inscrire depuis cette page.

<p align="center"><img src="https://image.noelshack.com/fichiers/2019/44/2/1572355304-home-convertimage.png" width="100%"></p>

Une fois connecté, les boutons pour participer aux événements apparaissent
alors dans la liste. Il est alors maintenant possible d’accéder à notre compte,
au listing de nos événements et nos participations, et de nous déconnecter.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572358121-participe.png" width="100%">

### Connexion et inscription
Voici les écrans de connexion et d'inscription.<br>
* Le mail et le mot de passe doivent être renseignés pour se connecter.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572358028-login.png" width="100%">
<br>

* Pour s’inscrire, il faut renseigner au moins le prénom, nom, mail et mot
de passe, l’image de profil (URL demandée) étant facultative.<br>

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572358010-inscription.png" width="100%">

### Compte

La chips dans la Navbar permet d'accéder au compte de l'utilisateur connecté
et de modifier ses informations personnelles, ainsi que son mot de passe.<br>
* L’utilisateur peut voir en direct la modification de son image de profil en
modifiant la valeur du champ.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572358266-compte.png" width="100%">

### Mes événements

Ce menu permet d'accéder à la page listant tous les événements créés par
l'utilisateur. Il peut les modifier et les supprimer.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572359958-my-events.png" width="100%">

* Modification d’un événement :

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572360020-my-events-modif.png" width="100%">

### Mes participations

Nous pouvons également lister nos participations à des événements et les
visualiser sur la carte, ainsi que les annuler.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572359102-participations.png" width="100%">

###  Création d'événement

Enfin la fonctionnalité de créer un événement est disponible grâce au bouton
flottant depuis la page principale.

* Il faut alors renseigner le titre, la description, l'adresse/lieu, la date
prévue dans les champs texte. Pour localiser l'événement sur la carte à
droite, il suffit juste de cliquer à l'endroit souhaité.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572359340-create.png" width="100%">

### Déconnexion
Enfin, la dernière icône nous permet de nous déconnecter et nous ramène à la page principale.

#### Déploiement
Nous avons déployé notre projet sur glitch.com.<br>
URL Glitch du projet : https://stephsako-letsmeet.glitch.me/

## Technologies utilisées
- <a href="https://vuejs.org/">VueJS</a>
- <a href="https://vuetifyjs.com/">Vuetify</a>
- <a href="https://nodejs.org/en/">NodeJS</a>
- <a href="https://github.com/KoRiGaN/Vue2Leaflet">vue2-leaflet</a> et <a href="https://leafletjs.com/">leaflet</a> pour l'affichage de la Map
<br>
Étant donné que nous avions déjà une bonne expérience avec MySQL et
phpmyadmin grâce à notre DUT Informatique, nous avons hébergé une base de
données sur <a href="https://www.alwaysdata.com/fr/">AlwaysData</a>.<br>
Voici le schéma relationnel de la base de données :

<img src="https://image.noelshack.com/fichiers/2019/44/3/1572438260-sr-letsmeet.png" width="100%">

## Difficultés rencontrées
* Les plus grandes difficultés pour nous ont été l'affichage et l’interaction
avec le composant Map de vue2-leaflet en raison de peu de
documentation.
* Nous n’avons pas réussi à mettre en évidence le fait que l’utilisateur ait
déjà participé à des événements dans la liste de la page principale.
