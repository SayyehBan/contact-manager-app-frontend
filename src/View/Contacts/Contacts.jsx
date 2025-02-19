import { Link } from "react-router-dom";

import Contact from "./Contact";
import Spinner from "../../components/Spinner";
import { PINK } from "../../Utilities/helpers/colors";
import NotFound from "../../components/NotFound";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
  const { contacts, loading, deleteContact } = useContext(ContactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 float-end">
                <Link
                  to={"/contacts/add"}
                  className="btn m-2"
                  style={{ backgroundColor: PINK }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <Contact
                  key={c.contactID}
                  deleteConcat={() =>
                    deleteContact(
                      c.contactID,
                      c.photo,
                      c.firstName + " " + c.lastName
                    )
                  }
                  contact={c}
                />
              ))
            ) : (
              <NotFound />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
