import { BASE_URL } from "../services/contactService";
import { CURRENTLINE } from "../Utilities/helpers/colors";
import BtnEdit from "./BtnEdit";
import BtnEye from "./BtnEye";
import BtnTrash from "./BtnTrash";
import ImgZoom from "./ImgZoom";

const Contact = ({ contact }) => {
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-md-4 d-flex justify-content-center">
              <div style={{ width: "150px", height: "150px" }}>
                <ImgZoom
                  id={contact.contactID}
                  src={BASE_URL + contact.photo}
                  alt={contact.firstName + " " + contact.lastName}
                  width="150px"
                  height="150px"
                />
              </div>
            </div>
            <div className="col-md-7">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوادگی :{" "}
                  <span className="fw-bold">
                    {contact.firstName + " " + contact.lastName}
                  </span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  شماره تلفن : <span className="fw-bold">{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  ایمیل : <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 d-flex flex-column align-items-center">
              <BtnEye id={contact.contactID} />
              <BtnEdit id={contact.contactID} />
              <BtnTrash contact={contact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
