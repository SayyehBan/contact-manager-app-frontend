import { useEffect, useState } from 'react';
import './App.css';
import { AddContact, Contact, Contacts, EditContact, Navbar } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAllContacts, getAllGroups, getAllJobs } from './Utilities/Constants/contactService';

const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [getGroups, setGetGroups] = useState([])
  const [getJobs, setGetJobs] = useState([])
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData)
        const { data: groupsData } = await getAllGroups();
        setGetGroups(groupsData)
        const { data: jobsData } = await getAllJobs();
        setGetJobs(jobsData)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/contacts" />} />
        <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading} />} />
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='/contacts/:contactId' element={<Contact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </div>
  );
}

export default App;
