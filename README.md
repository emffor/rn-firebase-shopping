# rn-myshopping-backend-firebase

**Modelo para implementação do firebase**

# Criando Projeto EXPO e Executar CLI
**start expo**
- expo start

**start cli**
- yarn react-native start
- npx react-native run-android

**instalar dependências**
- yarn add react-native-reanimated
- yarn add react-native-gesture-handler

- yarn add styled-components
- yarn add @types/styled-components-react-native -D
- yarn add @react-navigation/native
- yarn add react-native-screens react-native-safe-area-context
- yarn add @react-navigation/bottom-tabs
- yarn add react-native-iphone-x-helper

- expo install expo-font @expo-google-fonts/roboto
- expo install expo-app-loading
- expo install expo-image-picker

**caso aparece msg de warning**
- expo doctor --fix-dependencies

# Trabalhando com FIREBASE

**Rodar com CLI - FIREBASE não funciona no expo GO**
terminal 1- yarn react-native start
terminal 2- npx react-native run-android

**Instalação React Native FireBase**
1 - yarn add @react-native-firebase/app

**Para obter Certificado de assinatura de depuração SHA-1**
2 - cd android && gradlew signingReport
