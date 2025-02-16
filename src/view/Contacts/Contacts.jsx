import { Link } from "react-router-dom";
import { PINK } from "../../Utilities/helpers/colors";
import Contact from "../../components/Contact";
import NotFound from "../../components/NotFound";
import Spinner from "../../components/Spinner";

const Contacts = ({ contacts, loading }) => {
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 float-end">
                <Link
                  to="/Contacts/add"
                  className="btn mx-2"
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
              contacts.map((contact) => <Contact contact={contact} />)
            ) : (
              <NotFound />
            )}
          </div>
        </section>
      )}
      {/* <section className="container mt-4">
        <div className="row">
          <div className="col-12 mb-3">
            <div
              className="card shadow-sm transition-card"
              style={{ cursor: "pointer" }}
            >
              <div className="card-body text-center text-primary">
                <i className="fas fa-user fa-3x mb-3"></i>
                <h5 className="card-title">کارت اول</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div
              className="card shadow-sm transition-card"
              style={{ cursor: "pointer" }}
            >
              <div className="card-body text-center text-success">
                <i className="fas fa-phone fa-3x mb-3"></i>
                <h5 className="card-title">کارت دوم</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div
              className="card shadow-sm transition-card"
              style={{ cursor: "pointer" }}
            >
              <div className="card-body text-center text-warning">
                <i className="fas fa-envelope fa-3x mb-3"></i>
                <h5 className="card-title">کارت سوم</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div
              className="card shadow-sm transition-card"
              style={{ cursor: "pointer" }}
            >
              <div className="card-body text-center text-danger">
                <i className="fas fa-cog fa-3x mb-3"></i>
                <h5 className="card-title">کارت چهارم</h5>
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
            .transition-card {
              transition: all 0.3s ease-in-out;
            }
            .transition-card:hover {
              transform: translateY(-10px);
            }
            .transition-card:hover .card-body.text-primary {
              background-color: var(--bs-primary);
              color: white !important;
            }
            .transition-card:hover .card-body.text-success {
              background-color: var(--bs-success);
              color: white !important;
            }
            .transition-card:hover .card-body.text-warning {
              background-color: var(--bs-warning);
              color: black !important;
            }
            .transition-card:hover .card-body.text-danger {
              background-color: var(--bs-danger);
              color: white !important;
            }
            .transition-card:hover .card-title {
              color: inherit;
            }
            .transition-card:hover i {
              color: inherit;
            }
          `}
        </style>
      </section>{" "} */}
    </>
  );
};

export default Contacts;
