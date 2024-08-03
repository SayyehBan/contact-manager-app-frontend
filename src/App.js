import { useState } from 'react';
import './App.css';
import Contacts from './components/contact/Contacts';
import Navbar from './components/Navbar';

const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true)
  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={getContacts} loading={loading} />
    </div>
  );
}

export default App;
