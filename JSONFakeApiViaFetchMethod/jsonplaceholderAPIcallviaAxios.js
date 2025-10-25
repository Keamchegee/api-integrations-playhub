import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function CrudOperations() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // 1. READ (GET)
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_URL);
        setItems(response.data.slice(0, 5)); // Only first 5 for demo
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  // 2. CREATE (POST)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, {
        title,
        body,
        userId: 1,
      });
      setItems((prevItems) => [response.data, ...prevItems]);
      setTitle('');
      setBody('');
    } catch (e) {
      setError(e.message);
    }
  };

  // 3. UPDATE (PUT)
  const handleUpdate = async (id) => {
    const newTitle = prompt('Enter new title:');
    if (!newTitle) return;

    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        id,
        title: newTitle,
      });
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? response.data : item))
      );
    } catch (e) {
      setError(e.message);
    }
  };

  // 4. DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h1>CRUD with Axios</h1>

      {/* Create form */}
      <form onSubmit={handleCreate}>
        <h2>Create New Item</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          required
        />
        <button type="submit">Add Item</button>
      </form>

      {/* Read the array items */}
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
            <button onClick={() => handleUpdate(item.id)}>Update</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudOperations;
