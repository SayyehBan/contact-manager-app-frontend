import { CYAN } from "../Utilities/helpers/colors";

const BtnEdit = () => (
  <button
    className="btn my-1"
    style={{ backgroundColor: CYAN }}
    onMouseEnter={(e) => {
      e.currentTarget.querySelector("i").classList.remove("fa-pen");
      e.currentTarget.querySelector("i").classList.add("fa-pencil-alt");
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector("i").classList.remove("fa-pencil-alt");
      e.currentTarget.querySelector("i").classList.add("fa-pen");
    }}
  >
    <i className="fa fa-pen" />
  </button>
);

export default BtnEdit;
