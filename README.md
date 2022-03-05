# reactnative-memes-ionix

Para ejecutar este proyecto, debes tener habiliado un ambiente de desarrollo adecuado para React Native
    Guia: https://reactnative.dev/docs/environment-setup

## Ir a la carpeta raiz del proyecto y ejecutar lo siguiente en Terminal:

- Instalación de dependencias **npm install**
- Instalación de Pods, ir a **cd ios**, luego ejecutar **pod install**
- Volver a la carpeta raiz **cd ..**, y ejecutar el comando **npx react-native run-ios**


## IDE utilizado
Visual Studio Code

## Dependencias
- NPM 6.14.16
- Node v14.19.0

- "@react-native-async-storage/async-storage": "^1.16.1"
- "@react-navigation/native": "^6.0.8"
- "@react-navigation/native-stack": "^6.5.0"
- "axios": "^0.26.0"
- "react": "17.0.2"
- "react-native": "0.67.3"
- "react-native-permissions": "^3.3.0"
- "react-native-safe-area-context": "^4.1.2"
- "react-native-screens": "^3.13.1"
- "react-native-splash-screen": "^3.3.0"

## Patrones de diseño
- Context (Inyección de dependencias)
- Stateless Components (para componentes reutilizables)
- Conditional Rendering
- Render Props y Container - View (ej. en la navegación)

## Arquitectura utilizada
Clean Architecture

App.js
-src
--View
----Loading
----Main
----Search
----Configuration
----Common
--Infrastructure
----Services
--Application
----Context
------User
----Hooks
--Assets

