import { Link } from "react-router-dom";

import { CURRENTLINE } from "../../helpers/colors";
import ImgZoom from "../ImgZoom";
import { SERVER_URL } from "../../services/contactService";
import BtnEye from "../BtnEye";
import BtnEdit from "../BtnEdit";
import BtnTrash from "../BtnTrash";

const Contact = ({ contact, confirmDelete }) => {
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4 col-sm-4">
              <ImgZoom
                id={contact.contactID}
                src={SERVER_URL + contact.photo}
                alt={contact.firstName + " " + contact.lastName}
                width="150px"
                height="150px"
              />
            </div>
            <div className="col-md-7 col-sm-7">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوداگی :{"  "}
                  <span className="fw-bold">
                    {contact.firstName + " " + contact.lastName}
                  </span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{"  "}
                  <span className="fw-bold">{contact.mobile}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل :{"  "}
                  <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
              <BtnEye id={contact.contactID} />
              <BtnEdit id={contact.contactID} />
              <BtnTrash confirmDelete={confirmDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
