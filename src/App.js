import { useState } from 'react';
import './App.css';
import { Contacts, Navbar } from './components';

const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false)
  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={getContacts} loading={loading} />
    </div>
  );
}

export default App;
