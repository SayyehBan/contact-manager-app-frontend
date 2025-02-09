import { PINK } from "../../helpers/colors";
import Contact from "../components/contact";
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
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <Contact
                fullname={contact.fullname}
                phone={contact.phone}
                email={contact.email}
                image={contact.image}
              />
            ))
          ) : (
            <NotFound />
          )}
        </section>
      )}
    </>
  );
};

export default Contacts;
