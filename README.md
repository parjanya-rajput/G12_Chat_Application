# G12 Chat Application Architecture 🚀

A project for the Software Engineering (IT-314) course, guided by Prof. Saurabh Tiwari.

## 📖 Table of Contents

1. Introduction
2. Tech Stack
3. Project Structure
4. Data Flow
5. Key Features
6. Best Practices

## 🌟 Introduction

The G12 SpringTalk - A Chat Application is designed to provide a seamless and responsive chatting experience. It leverages a modular and scalable architecture combining the _Atomic Design Pattern_ and _MVC principles_.

Watch the demo video here: [G12 SprintTalk - A Chat Application | Demo Video](https://youtu.be/amOgt-EhnI4)
<br>
Download the app here: [G12 SprintTalk - A Chat Application | Download](https://drive.google.com/file/d/1iMVfAD9C3DObcRSB124j0gFhpYVWClNJ/view?usp=sharing)

## 🛠️ Tech Stack

This project leverages the following technologies:

![React Native](https://img.shields.io/badge/-React%20Native-61DAFB?logo=react&logoColor=white&style=flat)

![Expo](https://img.shields.io/badge/-Expo-000020?logo=expo&logoColor=white&style=flat)

![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=white&style=flat)

![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white&style=flat)

## 🏗️ Project Structure

### ⚛️ Atomic Design Pattern

Our component hierarchy follows the atomic design methodology, which is inspired by chemistry's hierarchical organization of matter. This approach helps in creating a consistent, reusable, and scalable design system:

- atoms/: The smallest, indivisible UI components. These are the basic building blocks of our interface.  
  Examples: buttons, input fields, icons, labels.

- molecules/: Simple groups of UI elements functioning together as a unit.  
  Examples: search bars (combining input and button atoms), menu items (combining icon and text atoms).

- organisms/: Complex UI components composed of molecules and/or atoms. These form distinct sections of the interface.  
  Examples: headers, forms, chat message bubbles.

The atomic design pattern allows for:

- Reusability: Atoms and molecules can be reused across different organisms and screens.
- Consistency: By using the same atoms throughout, we maintain a consistent look and feel.
- Scalability: New components can be easily created by combining existing atoms and molecules.

### 🛠️ Application Architecture

The application follows a modified MVC (Model-View-Controller) pattern:

#### 🗂️ Model (Data Layer)

- data/: Contains data models and schemas
- domain/: Business logic and domain-specific rules
- firebase/: Firebase configuration and services for real-time data and authentication

#### 🎨 View (Presentation Layer)

- components/: UI components following atomic design (atoms, molecules, organisms)
- screens/: Full application screens/pages
- globalStyles.js: Global styling configurations

#### 🧠 Controller (Logic Layer)

- api/: API configurations and network requests
- helper/: Utility functions and helpers
- navigations/: Navigation logic and routing

## 🔄 Data Flow

1. _User Interaction_

   - User interacts with components (atoms/molecules/organisms)
   - Actions are triggered from the UI components
   - For Enhanced Query Suggestions, the user taps the "Enhance" button to get refined suggestions.

2. _Action Processing_

   - Helper functions process data when needed
   - API calls are made if required

3. _Data Management_

   - Firebase handles real-time data and authentication
   - Domain logic processes business rules

4. _UI Updates_
   - Components receive updated data through props or local state
   - Screen components render updated UI
   - Navigation updates if required

## ✨ Key Features

- _Atomic Design_: Modular and reusable component architecture
- _Real-time Updates_: Firebase integration for live data
- _Navigation_: Structured routing system
- _API Integration_: Organized API communication
- _Enhanced Query Suggestion_: A feature where users can tap the "Enhance" button while typing, allowing the system to generate refined suggestions (e.g., "happy birthday" → "Wishing you a very joyous birthday filled with laughter and cheer").

## ✅ Best Practices

- Components are organized by complexity (atoms → molecules → organisms)
- Business logic is separated from UI components
- API calls are isolated in the api directory
- Helper functions are modularized for reusability

This architecture ensures a scalable, maintainable, and organized codebase while following modern development practices and patterns.
