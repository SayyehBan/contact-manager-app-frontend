import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => { },
  contact: {},
  contacts: [],
  setContacts: () => { },
  setFilteredContacts: () => { },
  filteredContacts: [],
  groups: [],
  jobs: [],
  onContactChange: () => { },
  deleteContact: () => { },
  createContact: () => { },
  contactSearch: () => { },
});
