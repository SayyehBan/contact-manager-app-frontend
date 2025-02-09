import { PINK } from "../../helpers/colors";
import { BASE_URL } from "../../Utilities/Constants/contactService";
import Contact from "../components/Contact";
import NotFound from "../components/NotFound";
import Spinner from "../components/Spinner";

const Contacts = ({ contacts, loading }) => {
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <button className="btn mx-2" style={{ backgroundColor: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </button>
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
              contacts.map((contact) => (
                <Contact
                  key={contact.contactID}
                  fullname={contact.firstName + " " + contact.lastName}
                  phone={contact.mobile}
                  email={contact.email}
                  image={BASE_URL + contact.photo}
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
