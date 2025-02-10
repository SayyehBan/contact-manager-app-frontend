import { ORANGE } from "../Utilities/helpers/colors";

const BtnEye = () => (
  <button
    className="btn my-1"
    style={{ backgroundColor: ORANGE }}
    onMouseEnter={(e) => {
      e.currentTarget.querySelector("i").classList.remove("fa-eye-slash");
      e.currentTarget.querySelector("i").classList.add("fa-eye");
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector("i").classList.remove("fa-eye");
      e.currentTarget.querySelector("i").classList.add("fa-eye-slash");
    }}
  >
    <i className="fa fa-eye-slash" />
  </button>
);

export default BtnEye;
