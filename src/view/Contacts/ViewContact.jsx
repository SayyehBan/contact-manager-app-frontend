import { Link, useParams } from "react-router-dom";
import { CURRENTLINE, CYAN, PURPLE } from "../../Utilities/helpers/colors";
import { useEffect, useState } from "react";
import { BASE_URL, getContact } from "../../services/contactService";
import Spinner from "../../components/Spinner";
import ImgZoom from "../../components/ImgZoom";
import NotFound from "../../components/NotFound";

const ViewContact = ({ contact }) => {
  const { contactId } = useParams();
  const numericContactId = parseInt(contactId);

  const filteredContact = contact.find((c) => c.contactID === numericContactId);
  const [getDataContact, setGetDataContact] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (filteredContact) {
          setGetDataContact(filteredContact);
        } else {
          const { data: contactData } = await getContact(numericContactId);
          setGetDataContact(contactData);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [contact, contactId]);
  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              مشاهده اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>
      <hr style={{ backgroundColor: CYAN }} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(getDataContact).length > 0 ? (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ backgroundColor: CURRENTLINE, borderRadius: "1em" }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <ImgZoom
                      id={getDataContact.contactId}
                      src={BASE_URL + getDataContact.photo}
                      alt={
                        getDataContact.firstName + " " + getDataContact.lastName
                      }
                      width="150px"
                      height="150px"
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">
                          {getDataContact.firstName} {getDataContact.lastName}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{getDataContact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        آدرس ایمیل :{" "}
                        <span className="fw-bold">{getDataContact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        عنوان شغلی :{" "}
                        <span className="fw-bold">
                          {getDataContact.jobTitle}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        دسته‌بندی :{" "}
                        <span className="fw-bold">
                          {getDataContact.groupTitle}
                        </span>
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
                      بازگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
