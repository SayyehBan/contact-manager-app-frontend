import { useEffect } from "react";
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
import { useImmer } from "use-immer";
import { toast, ToastContainer } from "react-toastify";
const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [jobs, setJobs] = useImmer([]);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useImmer(false);
  const [deleteInfo, setDeleteInfo] = useImmer({
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


  const createContactForm = async (contact) => {
    let data = new FormData();
    data.append("FirstName", contact.firstName);
    data.append("LastName", contact.lastName);
    data.append("Mobile", contact.mobile);
    data.append("Email", contact.email);
    data.append("JobID", parseInt(contact.job));
    data.append("GroupID", parseInt(contact.group));
    data.append("File.File", contact.image);
    try {
      setLoading(true);
      const response = await postContact(data, (progress) => {
        console.log(progress);
      });
      if (response.status === 200) {
        setContacts((draft) => {
          draft.push(response.data);
        });
        setFilteredContacts((draft) => {
          draft.push(response.data);
        });
      }
      navigate("/contacts");
      toast.success("ثبت با موفقیت انجام شد.", { icon: "🟢" });
      setLoading(false);
    } catch (err) {
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
      if (response.status === 200) {
        setContacts((draft) => {
          const updatedContacts = draft.filter((c) => c.contactID !== contactId);
          return updatedContacts;
        });
        setFilteredContacts((draft) => {
          const updatedFiltered = draft.filter((c) => c.contactID !== contactId);
          return updatedFiltered;
        });
        toast.success("حذف با موفقیت انجام شد.", { icon: "🟢" });
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };  // let filterTimeOut;
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
        contacts,
        setContacts,
        setFilteredContacts,
        filteredContacts,
        groups,
        jobs,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored" />
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