import { useState } from 'react';
import './App.css';
import Contacts from './components/contact/Contacts';
import Navbar from './components/Navbar';

const App = () => {
  const [getContacts, setContacts] = useState([]);
  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={getContacts} />
    </div>
  );
}

export default App;
