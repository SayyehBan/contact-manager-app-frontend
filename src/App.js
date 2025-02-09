import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddContact, Contact, Contacts, EditContact, Navbar } from './components/Index';
import { useEffect, useState } from 'react';
const App = () => {
  const contacts = [
    {
      fullname: "یونس قربانی",
      phone: "09121112425",
      email: "younes.gh@chmail.ir",
      image: "https://toplearn.com//img/user/250x259/25033_1593aba2-5cb5-6add-a31f-39e35253dd2a_یونس_قربانی.jpg"
    },
    {
      fullname: "ایمان مدائنی",
      phone: "09121112426",
      email: "iman@madaeni.ir",
      image: "https://toplearn.com//img/user/250x259/2402cc6d-1d17-6a22-e6cc-39e3248f13a4_ایمان_مدائنی9.jpg"
    },
    {
      fullname: "سجاد باقرزاده",
      phone: "09121112427",
      email: "sajjad@bagherzadeh.ir",
      image: "https://toplearn.com//img/user/250x259/268_2b05b90b-7a78-4e35-058f-39e6b8cf2ac1_حسن _خسروجردی.jpeg"
    }
  ];
  const [getContacts, setContacts] = useState([]);
  useEffect(() => {
    setContacts(contacts);
  }, []);
  const [loading, setLoading] = useState(false);
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
