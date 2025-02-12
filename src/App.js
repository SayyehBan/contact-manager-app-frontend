import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddContact, Contacts, EditContact, Navbar, ViewContact } from './components/Index';
import { useEffect, useState } from 'react';
import { getAllContacts } from './services/contactService';
const App = () => {

  const [getContacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contcatsData } = await getAllContacts();
        setContacts(contcatsData);
        setLoading(false);

      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/contacts" />} />
        <Route path='/Contacts' element={<Contacts contacts={getContacts} loading={loading} />} />
        <Route path='/Contacts/add' element={<AddContact />} />
        <Route path='/Contacts/:contactId' element={<ViewContact contact={getContacts} />} />
        <Route path='/Contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
