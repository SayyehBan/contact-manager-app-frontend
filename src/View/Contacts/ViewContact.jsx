import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Spinner } from ".";
import { CURRENTLINE, CYAN, PURPLE } from "../../Utilities/helpers/colors";
import {
  getAllGroups,
  getAllJobs,
  getContact,
  SERVER_URL,
} from "../../services/contactService";
import ImgZoom from "../../components/ImgZoom";

const ViewContact = () => {
  const { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {},
    group: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getAllGroups(contactData.group);
        const { data: jobData } = await getAllJobs(contactData.job);

        setState({
          ...state,
          loading: false,
          contact: contactData,
          group: groupData,
          job: jobData,
        });
      } catch (err) {
        console.log(err.message);
        setState({ ...state, loading: false });
      }
    };

    fetchData();
  }, []);

  const { loading, contact } = state;

  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: CYAN }} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <ImgZoom
                      id={contact.contactId}
                      src={SERVER_URL + contact.photo}
                      alt={contact.firstName + " " + contact.lastName}
                      width="150px"
                      height="150px"
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">
                          {contact.firstName + " " + contact.lastName}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل :{" "}
                        <span className="fw-bold">{contact.jobTitle}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        گروه :{" "}
                        <span className="fw-bold">{contact.groupTitle}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
