import { useEffect, useState } from 'react';
import './App.css';
import { AddContact, Contact, Contacts, EditContact, Navbar } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './Utilities/Constants/apiConfig';

const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [getGroups, setGetGroups] = useState([])
  const [GetJobs, setGetJobs] = useState([])
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await axios.get(BASE_URL + 'api/Contacts/GetContact')
        setContacts(contactsData)
        const { data: groupsData } = await axios.get(BASE_URL + 'api/Groups/GetGroups')
        setGetGroups(groupsData)
        const { data: jobsData } = await axios.get(BASE_URL + 'api/Jobs/GetJobs')
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
