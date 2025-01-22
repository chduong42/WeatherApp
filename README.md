# Weather App

## Description
Une application météo moderne et intuitive développée avec React Native et Expo, utilisant l'API Open-Meteo pour fournir des prévisions météorologiques précises et fiables. Cette application permet aux utilisateurs de consulter la météo actuelle et les prévisions pour n'importe quelle ville dans le monde.

## Fonctionnalités

- **Météo en Temps Réel**
  - Température actuelle
  - Conditions météorologiques
  - Humidité et vitesse du vent
  - Indice UV

- **Prévisions**
  - Prévisions horaires sur 24h
  - Prévisions quotidiennes sur 7 jours
  - Détails des précipitations

- **Géolocalisation**
  - Détection automatique de la position de l'utilisateur
  - Recherche de villes par nom

## Installation

1. Clonez le repository
   ```bash
   git clone https://github.com/votre-username/weather-app.git
   ```

2. Installez les dépendances
   ```bash
   npm install
   ```

3. Lancez l'application
   ```bash
   npx expo start
   ```

## Technologies Utilisées

- [Expo](https://expo.dev) - Framework de développement React Native
- [React Native](https://reactnative.dev) - Framework mobile
- [Open-Meteo API](https://open-meteo.com/) - API météorologique gratuite
- [React Navigation](https://reactnavigation.org/) - Navigation entre les écrans
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - Géolocalisation
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations fluides

## Comment Utiliser

L'application propose une interface simple et intuitive :

- **Écran Principal** : Affiche la météo actuelle de votre position
- **Prévisions Horaires** : Faites défiler horizontalement pour voir les prévisions heure par heure
- **Prévisions Hebdomadaires** : Consultez les prévisions des 7 prochains jours
- **Recherche** : Utilisez la barre de recherche pour trouver la météo d'autres villes
- **Paramètres** : Personnalisez vos préférences (unités de mesure, notifications)

## Environnement de Développement

Vous pouvez exécuter l'application sur :
- iOS (via simulateur ou appareil physique)
- Android (via émulateur ou appareil physique)
- [Expo Go](https://expo.dev/go)

## Structure du Projet

```
app/
├── components/     # Composants réutilisables
│   ├── WeatherCard/
│   ├── ForecastList/
│   └── SearchBar/
├── screens/       # Écrans de l'application
│   ├── HomeScreen/
│   ├── ForecastScreen/
│   └── SearchScreen/
├── services/      # Services API et utilitaires
│   ├── api/
│   └── location/
├── assets/        # Images, fonts, icônes
└── constants/     # Constants et configuration
```

## Contribution

Si vous souhaitez contribuer au projet, n'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Push sur la branche
5. Créer une Pull Request

## Contact

Développé par [Votre Nom]
- GitHub: [@votre-username](https://github.com/votre-username)
- LinkedIn: [Votre Profil](https://linkedin.com/in/votre-profil)

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
