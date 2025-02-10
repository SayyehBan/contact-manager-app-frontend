import { CURRENTLINE } from "../Utilities/helpers/colors";
import BtnEdit from "./BtnEdit";
import BtnEye from "./BtnEye";
import BtnTrash from "./BtnTrash";
import ImgZoom from "./ImgZoom";

const Contact = ({ image, fullname, phone, email }) => (
  <div className="col-md-6">
    <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
      <div className="card-body">
        <div className="row align-items-center d-flex justify-content-around">
          <div className="col-md-4 d-flex justify-content-center">
            <div style={{ width: "150px", height: "150px" }}>
              <ImgZoom image={image} alt={fullname} />
            </div>
          </div>
          <div className="col-md-7">
            <ul className="list-group">
              <li className="list-group-item list-group-item-dark">
                نام و نام خانوادگی : <span className="fw-bold">{fullname}</span>
              </li>
              <li className="list-group-item list-group-item-dark">
                شماره تلفن : <span className="fw-bold">{phone}</span>
              </li>
              <li className="list-group-item list-group-item-dark">
                ایمیل : <span className="fw-bold">{email}</span>
              </li>
            </ul>
          </div>
          <div className="col-md-1 d-flex flex-column align-items-center">
            <BtnEye />
            <BtnEdit />
            <BtnTrash />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
