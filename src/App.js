import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddContact, Contact, Contacts, EditContact, Navbar } from './components/Index';
import { useEffect, useState } from 'react';
import { getAllContacts, getAllGroups, getAllJobs } from './Utilities/Constants/contactService';
const App = () => {

  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGetGroups] = useState([])
  const [getJobs, setGetJobs] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contcatsData } = await getAllContacts();
        setContacts(contcatsData);
        console.log(contcatsData);
        const { data: groupsData } = await getAllGroups();
        setGetGroups(groupsData);

        const { data: jobsData } = await getAllJobs();
        setGetJobs(jobsData);

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
        <Route path='/Contacts/:contactId' element={<Contact />} />
        <Route path='/Contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
