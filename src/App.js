import './App.css';
import Navbar from './components/Navbar';
import Contacts from './components/Contacts/Contacts';
import { useState } from 'react';
const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={getContacts} loading={loading} />
    </div>
  );
};

export default App;
