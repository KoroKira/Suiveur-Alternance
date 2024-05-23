# Suiveur d'Alternance

Suiveur d'Alternance est une application de bureau permettant de suivre les entreprises contactées pour une alternance. L'application est construite avec Electron, ce qui permet une utilisation hors ligne et une gestion locale des fichiers.

## Prérequis

- Node.js (version 12 ou supérieure)
- npm (gestionnaire de paquets de Node.js)

## Installation

1. **Cloner le dépôt ou télécharger les fichiers de l'application** :
   ```sh
   git clone https://github.com/KoroKira/Suiveur-Alternance.git
   cd suiveur_dalternance
   ```

2. **Installer les dépendances** :
   ```sh
   npm install
   ```

## Utilisation

1. **Démarrer l'application** :
   ```sh
   npm start
   ```

2. **Naviguer dans l'application** :
   - **Page principale** : Sélectionnez les actions souhaitées (voir les entreprises contactées, ajouter une entreprise, éditer des données).
   - **Ajouter une entreprise** : Remplissez le formulaire avec les détails de l'entreprise et cliquez sur "Ajouter". Les données seront sauvegardées localement.
   - **Voir les entreprises contactées** : Consultez la liste des entreprises ajoutées. Vous pouvez supprimer une entreprise si nécessaire.
   - **Éditer des données** : Fonctionnalité pour éditer les informations des entreprises (à implémenter).

## Structure des Fichiers

```plaintext
/suiveur_dalternance
├── main.html
├── voir_entreprises.html
├── ajouter_entreprise.html
├── editer_donnees.html
├── style.css
├── meca.js
├── main.js
├── preload.js
├── package.json
├── Entreprise 1
│   ├── cv.pdf
│   ├── lettre_motivation.pdf
│   └── datas.json
├── Entreprise 2
│   ├── cv.pdf
│   ├── lettre_motivation.pdf
│   └── datas.json
└── Entreprise 3
    ├── cv.pdf
    ├── lettre_motivation.pdf
    └── datas.json
```

### Explications des Fichiers

- **main.html** : Page principale de l'application.
- **voir_entreprises.html** : Page affichant la liste des entreprises contactées.
- **ajouter_entreprise.html** : Page permettant d'ajouter une nouvelle entreprise.
- **editer_donnees.html** : Page pour éditer les données des entreprises (à implémenter).
- **style.css** : Fichier de style pour l'application.
- **meca.js** : Logique JavaScript pour les interactions dans les pages HTML.
- **main.js** : Script principal d'Electron pour démarrer l'application.
- **preload.js** : Script pour charger des fonctionnalités Node.js dans le contexte de la fenêtre Electron.
- **package.json** : Fichier de configuration de l'application et des dépendances.
- **Entreprise X** : Dossiers contenant les fichiers associés à chaque entreprise (CV, lettre de motivation, données JSON).

## Développement et Contributions

Si vous souhaitez contribuer à cette application, veuillez suivre ces étapes :

1. **Fork le dépôt**.
2. **Créer une branche de fonctionnalité** :
   ```sh
   git checkout -b feature-nom_de_la_fonctionnalité
   ```
3. **Commiter vos changements** :
   ```sh
   git commit -m 'Ajouter une nouvelle fonctionnalité'
   ```
4. **Pousser la branche** :
   ```sh
   git push origin feature-nom_de_la_fonctionnalité
   ```
5. **Ouvrir une Pull Request**.

## Licence

Cette application est sous licence [MIT](LICENSE).