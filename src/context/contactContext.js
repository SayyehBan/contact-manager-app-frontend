import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => { },
  contact: {},
  contacts: [],
  setContacts: () => { },
  setFilteredContacts: () => { },
  filteredContacts: [],
  contactQuery: {},
  groups: [],
  jobs: [],
  onContactChange: () => { },
  deleteContact: () => { },
  createContact: () => { },
  contactSearch: () => { },
});
