import { useState } from "react";
import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from "../../helpers/colors";
import { BASE_URL } from "../../Utilities/Constants/contactService";
const Contact = ({ contact }) => {
  const [hoverEye, setHoverEye] = useState(false);
  const [hoverTrash, setHoverTrash] = useState(false);
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4 col-sm-4">
              <img
                src={BASE_URL + contact.photo}
                alt={contact.firstName + " " + contact.lastName}
                style={{
                  border: `1px solid ${PURPLE}`,
                  width: `200px`,
                  height: `200px`,
                }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-7 col-sm-7">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوادگی {""}
                  <span className="fw-bold">
                    {contact.firstName} {contact.lastName}
                  </span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  شماره موبایل
                  <span className="fw-bold">{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل
                  <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
              <button
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
                onMouseEnter={() => setHoverEye(true)}
                onMouseLeave={() => setHoverEye(false)}
              >
                <i
                  className={`${
                    hoverEye === false
                      ? "fa-solid fa-arrows-to-eye"
                      : "fa-solid fa-eye"
                  }`}
                />
              </button>
              <button className="btn my-1" style={{ backgroundColor: CYAN }}>
                <i className="fa fa-pen" />
              </button>
              <button
                className="btn my-1"
                style={{ backgroundColor: RED }}
                onMouseEnter={() => setHoverTrash(true)}
                onMouseLeave={() => setHoverTrash(false)}
              >
                <i
                  className={`${
                    hoverTrash === false
                      ? "fa-solid fa-trash"
                      : "fa-solid fa-trash-can-arrow-up"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
