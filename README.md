# Mrs. Sizemore

Mrs. Sizemore est une web-app destiné à améliorer ses connaissances et s’entraîner sur des exercices d'anglais. Cette application s’adresse principalement aux étudiants de l'ESIPE.

## Prérequis
Pour pouvoir installer le projet sur votre machine vous devez avoir les prérequis ci-dessous:

    nodejs
    npm (avec node)
    un navigateur
    une bonne connaissance de Javascript

Nous vous conseillons également d'installer les Redux DevTools (https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) si vous développez sous chrome.

## Installation
Pour installer le projet tapez dans votre terminal :

    git clone https://github.com/Sipee/Bob-s-your-uncle.git
    cd mrs.sizemore
    npm install

## Lancement
Pour lancer le projet tapez dans votre terminal :

    npm start

## Spec principal
Old wood est un projet entièrement client. Il repose sur 4 outils principaux :

 1. React
 2. Redux
 3. Immutable.js
 4. Firebase

### React
React est un moteur de rendu de vue créé par Facebook. Il est utilisé dans old wood afin de structurer l'application par "composent". La particularité de react est qu'il est peu orienté et très rapide à rende les vues. Pour plus d'information sur React vous pouvez lire la documentation officiel : https://facebook.github.io/react/v

### Redux
Redux est un outils qui permet d'intégrer plus rapidement le paradigme "Flux" dans une application, c'est un outils développer par Facebook. Ce paradigme à été inventé par Facebook afin de résoudre des problèmes communs dans la création d'application Javascript. Pour plus d'informations sur Redux vous pouvez lire la documentation officiel : http://redux.js.org/

### Immutable.js
Immutable.js est une librairie développé par Facebook qui permet d'avoir des objets immuable en Javascript. Ce concept permet, quand il est couplé avec Redux, d'avoir des états (states) uniques tout au long de l'application. C'est une librairie très pratique car elle permet d'indiquer à React quand un état à bel et bien était modifié et elle empêche un état d'être modifié dans un contexte non désiré. Pour plus d'informations sur Immutable.js vous pouvez lire la documentation officiel : https://facebook.github.io/immutable-js/

### Firebase
Firebase est un outils développé par Google qui permet d'avoir une base de donnée client disponible en Javacript. Pour plus d'informations sur Firebase vous pouvez lire la documentation officiel : https://firebase.google.com/

## Spec secondaire
### Bootstrap
http://getbootstrap.com/

### Redux form
http://redux-form.com/6.5.0/

### Reselect
https://github.com/reactjs/reselect

### React redux router
https://github.com/reactjs/react-router-redux

## Je souhaite participer 
Pour pouvoir participer au développement de old wood vous devez avoir compris React (simple) et Redux (plus compliqué). Sans avoir compris ces deux concepts/outils cœurs du projet vous ne serez pas en mesure de pouvoir participer efficacement sur le projet.

### Marche à suivre
Une fois que vous avez bien maitrisé ces deux outils, munissez-vous de git et une fois votre travail terminé faite une pull request. Elle sera évalué, voir corrigé si necessaire. Une fois validé elle sera intégré au projet.
