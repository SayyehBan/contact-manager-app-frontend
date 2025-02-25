import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => { },
  contacts: [],
  setContacts: () => { },
  setFilteredContacts: () => { },
  filteredContacts: [],
  groups: [],
  jobs: [],
  deleteContact: () => { },
  createContact: () => { },
  contactSearch: () => { },
});
