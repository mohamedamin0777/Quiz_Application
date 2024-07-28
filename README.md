# Quiz Application

## Project Overview
This is a quiz application that allows users to take various quizzes, track their scores, and view their quiz history. The app uses Firebase for authentication, data storage, and hosting.

## Project Structure
- `src/`: Source code for the application
  - `assets/`: Images, icons, etc.
  - `styles/`: CSS files
  - `components/`: Reusable UI components
  - `pages/`: Page components (e.g., Login, Registration, Quiz)
  - `utils/`: Utility functions
- `README.md`: Project documentation

## Getting Started

### Prerequisites
- Node.js and npm installed
- Git installed
- Firebase account

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/quiz-app.git

2. **Navigate to the Project Directory**:

    ```bash
    cd quiz-app
    
3. **Install Dependencies**:
   ```bash
    npm install
4.**Set Up Firebase**:

  #### . reate a new Firebase project in the Firebase Console.
  #### . Set up Firebase Authentication and Firestore Database.
  #### . Add Firebase SDK to the project:
    ```bash
    src/firebase.js
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore';
    
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    
    firebase.initializeApp(firebaseConfig);
    export const auth = firebase.auth();
    export const firestore = firebase.firestore();
5. **Run the Application**:
   ### Branching Strategy
   ##### Main Branch: Contains the production-ready code.
   ##### Development Branch: Contains the latest development code.
   ##### Feature Branches: For developing new features. Name convention: feature/feature-name.
   ##### Bugfix Branches: For fixing bugs. Name convention: bugfix/bug-description.



## Git Workflow
 ### this is the most git commands you may need in your work on development the project:

### Git Workflow

1. **Pull Latest Changes**:
   ```bash
   git pull origin main
   ```

2. **Create a New Branch**:
   ```bash
   git checkout -b feature/feature-name
   ```

3. **Make Changes and Commit**:
   ```bash
   git add .
   git commit -m "Description of the changes"
   ```

4. **Push the Branch**:
   ```bash
   git push origin feature/feature-name
   ```

5. **Create a Pull Request**:
   - Go to the GitHub repository.
   - Click on the "Pull requests" tab.
   - Click "New pull request" and select your branch.
   - Add a description and request a review from team members.

### Essential Git Commands

- **Clone a Repository**: Download a copy of the repository to your local machine.
  ```bash
  git clone https://github.com/your-username/quiz-app.git
  ```

- **Check the Status**: See the status of your changes.
  ```bash
  git status
  ```

- **Stage Changes**: Add changes to the staging area.
  ```bash
  git add .
  ```

- **Commit Changes**: Commit the staged changes to the local repository.
  ```bash
  git commit -m "Commit message"
  ```

- **Create a New Branch**: Create a new branch for your work.
  ```bash
  git checkout -b feature/feature-name
  ```

- **Switch Branches**: Switch to a different branch.
  ```bash
  git checkout branch-name
  ```

- **Pull Latest Changes**: Update your local repository with the latest changes from the remote repository.
  ```bash
  git pull origin main
  ```

- **Push Changes**: Push your changes to the remote repository.
  ```bash
  git push origin branch-name
  ```

- **Merge Branches**: Merge a branch into your current branch.
  ```bash
  git merge branch-name
  ```

- **Resolve Conflicts**: Manually resolve merge conflicts if they occur.
  - Open the conflicting files and edit them to resolve the conflicts.
  - Stage the resolved files:
    ```bash
    git add .
    ```
  - Commit the resolution:
    ```bash
    git commit -m "Resolve merge conflicts"
    ```

##### 5. Create a Pull Request:

    Go to the GitHub repository.
    Click on the "Pull requests" tab.
    Click "New pull request" and select your branch.
    Add a description and request a review from team members.


## Authors
#### Ahmed Mohamed
#### Enas Hussien
#### Mohamed Amin
#### Mohamed Mostafa
    




    








