
# Projet Web VueJS 4A ESIEA - LetsMeet
#### Réalisé par Stephen SAKOVITCH, Théo MACHON et Florian PINSARD

## Project setup
```
npm install
```

## Préambule

LetsMeet est un site Web permettant à des utilisateurs de créer, partager et gérer des événements et des idées de sorties, ainsi que de voir qui participe aux événements créés.

### Page principale
La page principale liste tous les événements chronologiquement. Il suffit de cliquer sur l'un deux pour le localiser sur la carte à leur droite.

<p align="center"><img src="https://image.noelshack.com/fichiers/2019/44/2/1572355304-home-convertimage.png" width="100%"></p>

### Connexion et inscription
Il suffit d'être inscrit et connecté pour pouvoir participer aux événements. Voici les écrans de connexion et d'inscription.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572358028-login.png" width="100%">
<br><br>
<img src="https://image.noelshack.com/fichiers/2019/44/2/1572358010-inscription.png" width="100%">

### Participer à un événement
Une fois connecté, l'utilisateur peut participer aux événements de son choix.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572358121-participe.png" width="100%">

### Compte

La chips dans la NavBar permet d'accéder au compte de l'utilisateur connecté et de modifier ses informations personnelles ainsi que son mot de passe.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572358266-compte.png" width="100%">

### Mes événements

Ce menu permet d'accéder à la page listant tous les événements créés par l'utilisateur.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572359958-my-events.png" width="100%">

Il est alors possible de modifier et supprimer ses événements.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572360020-my-events-modif.png" width="100%">

### Mes participations

Nous pouvons également lister nos participations à des événements, les visualiser sur la carte ainsi que les annuler.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572359102-participations.png" width="100%">

###  Création d'événement

Enfin la fonctionnalité de création d'événement est disponible grâce au FAB depuis la page principale.

Il faut alors renseigner le titre, la description, l'adresse / le lieu, la date prévue dans les champs texte. Pour localiser l'événement sur la carte à droite, il suffit juste de cliquer à l'endroit souhaité.

<img src="https://image.noelshack.com/fichiers/2019/44/2/1572359340-create.png" width="100%">

#### Déconnexion
Enfin, la dernière icône nous permet de nous déconnecter et nous ramène à la page principale.

## Technologies utilisées
- <a href="https://vuejs.org/">VueJS</a>
- <a href="https://vuetifyjs.com/">Vuetify</a>
- <a href="https://nodejs.org/en/">NodeJS</a>
- <a href="https://github.com/KoRiGaN/Vue2Leaflet">vue2-leaflet</a> et <a href="https://leafletjs.com/">leaflet</a> pour l'affichage de la Map
- Etant donné que nous avions déjà une bonne expérience avec MySQl et phpmyadmin, nous avons héberger une base de données sur l'herbergeur Web <a href="https://www.alwaysdata.com/fr/">AlwaysData</a>. Voici la structure des tables :

### EVENEMENT
| Colonne           | Type    | Nullable |
|:-----------------:|:-------:|:--------:|
| Id_EVENEMENT (PK) | integer | Non      |
| Titre             | varchar | Non      |
| Resume            | text    | Oui      |
| DateEvenement     | date    | Non      |
| Adresse           | varchar | Oui      |
| Longitude         | float   | Non      |
| Latitude          | float   | Non      |

### UTILISATEUR
| Colonne             | Type    | Nullable |
|:-------------------:|:-------:|:--------:|
| Id_UTILISATEUR (PK) | integer | Non      |
| Prenom              | varchar | Non      |
| Nom                 | varchar | Non      |
| Password            | varchar | Non      |
| Email               | varchar | Non      |
| ImageProfil         | text    | Oui      |

### POST
| Colonne             | Type    | Nullable |
|:-------------------:|:-------:|:--------:|
| Id             (PK) | integer | Non      |
| Id_UTILISATEUR (FK) | integer | Non      |
| Id_EVENEMENT   (FK) | integer | Non      |
| DateCreation        | date    | Non      |

### POST
| Colonne             | Type    | Nullable |
|:-------------------:|:-------:|:--------:|
| Id             (PK) | integer | Non      |
| Id_UTILISATEUR (FK) | integer | Non      |
| Id_EVENEMENT   (FK) | integer | Non      |

## Difficultés rencontrées
* Les plus grandes difficultés pour nous ont été l'affichage et l’interaction avec le composant Map de <a href="https://github.com/KoRiGaN/Vue2Leaflet">vue2-leaflet</a> en raison de peu de documentation.
* Les sessions nous ont également donné du fil a retordre.
