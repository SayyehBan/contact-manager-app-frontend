import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  deleteContact,
  getAllContacts,
  getAllGroups,
  getAllJobs,
  getSearrchContacts,
  postContact,
} from "./services/contactService";
import { RED } from "./Utilities/helpers/colors";
import { ContactContext } from "./context/contactContext";
import Navbar from "./components/Navbar";
import {
  AddContact,
  Contacts,
  EditContact,
  ViewContact,
} from "./View/Contacts";
import _ from 'lodash'
import { contactInsertSchema } from "./validations/contcatValidation";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [contact, setContact] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({
    contactId: null,
    oldPhoto: null,
    contactFullname: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        const { data: jobData } = await getAllJobs();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setJobs(jobData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };
  const createContactForm = async (event) => {
    event.preventDefault();


    let data = new FormData();
    data.append("FirstName", contact.firstName);
    data.append("LastName", contact.lastName);
    data.append("Mobile", contact.mobile);
    data.append("Email", contact.email);
    data.append("JobID", parseInt(contact.job));
    data.append("GroupID", parseInt(contact.group));
    data.append("File.File", contact.image);
    try {
      await contactInsertSchema.validate(contact, { abortEarly: false });
      setLoading(true);
      await postContact(data, (progress) => {
        console.log(progress);
      });
      setContact({});
      setErrors([]);
      navigate("/contacts");
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      console.log(err.inner);
      setErrors(err.inner);
      setLoading(false);
    }
  };

  const confirmDelete = (contactId, oldPhoto, contactFullname) => {
    setDeleteInfo({ contactId, oldPhoto, contactFullname });
    setShowDialog(true);
  };

  const removeContact = async (contactId, oldPhoto) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId, oldPhoto);
      if (response.data === 1) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  // let filterTimeOut;
  const contactSearch = _.debounce(async (query) => {
    try {
      setLoading(true);
      setContacts([]);
      const { data: contcatsData } = await getSearrchContacts(query);
      setContacts(contcatsData);
      setFilteredContacts(contcatsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, 1000);
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        contacts,
        setContacts,
        setFilteredContacts,
        filteredContacts,
        groups,
        jobs,
        errors,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <Navbar />
        {showDialog && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">تایید حذف</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDialog(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="text-dark">
                    آیا از حذف مخاطب {deleteInfo.contactFullname} اطمینان دارید؟
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDialog(false)}
                  >
                    لغو
                  </button>
                  <button
                    onClick={async () => {
                      await removeContact(
                        deleteInfo.contactId,
                        deleteInfo.oldPhoto
                      );
                      setShowDialog(false);
                    }}
                    className="btn mx-2"
                    style={{ backgroundColor: RED }}
                  >
                    بله
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
