import { Link } from "react-router-dom";

import Contact from "./Contact";
import Spinner from "../Spinner";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import NotFound from "../NotFound";

const Contacts = ({ contacts, loading, confirmDelete }) => {
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
                  confirmDelete={() =>
                    confirmDelete(c.contactID, c.photo, c.fullname)
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
