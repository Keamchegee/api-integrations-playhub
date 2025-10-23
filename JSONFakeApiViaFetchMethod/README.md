A React component Project  demonstrating CRUD operations using the Fetch API and React hooks interacts with a public REST API (JSONPlaceholder) to manage a list of posts
. It includes features for reading, creating, updating, and deleting posts, along with state management using useState and useEffect hooks, error handling, and a loading indicator.
his project demonstrates how to perform basic CRUD (Create, Read, Update, Delete) operations using the Fetch API in React.

🧩 Overview

The app connects to a demo API (https://jsonplaceholder.typicode.com/posts) and allows you to:

Read a list of posts

Create a new post

Update an existing post

Delete a post

All actions are handled using fetch() inside React functional components with hooks.

⚙️ Technologies Used

React (Hooks: useState, useEffect)

Fetch API

JSONPlaceholder API (for mock data)

🧠 Features

Read (GET) – Fetches the first 5 posts on component mount.

Create (POST) – Adds a new post through a form.

Update (PUT) – Updates a post title using a prompt.

Delete (DELETE) – Removes a post from the list.

🚀 How to Run

Clone the repository or copy the code.

Place it inside your React project (e.g. src/CrudOperations.js).

Import and use it in your App.js:
import CrudOperations from './jsonplaceholderAPIcalls.js';

function App() {
  return <CrudOperations />;
}

export default App;
Run your React app:
npm start
Open in your browser at http://localhost:3000


//======Notes

JSONPlaceholder is a mock API, so data changes are not persisted.

Error and loading states are handled gracefully.

The example limits fetched items to 5 for simplicity.
contains all logic for CRUD operations and UI.