import { useState, useEffect } from 'react';

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
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Could not fetch items.');
        }
        const json = await response.json();
        setItems(json.slice(0, 5)); // Get only first 5 items for demonstration
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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 }),
      });
      if (!response.ok) {
        throw new Error('Could not create item.');
      }
      const newItem = await response.json();
      setItems(prevItems => [newItem, ...prevItems]);
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
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title: newTitle }),
      });
      if (!response.ok) {
        throw new Error('Could not update item.');
      }
      const updatedItem = await response.json();
      setItems(prevItems => prevItems.map(item => item.id === id ? updatedItem : item));
    } catch (e) {
      setError(e.message);
    }
  };

  // 4. DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h1>CRUD with Fetch API</h1>
      
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

      {/* Read (List) */}
      <h2>Item List</h2>
      <ul>
        {items.map(item => (
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