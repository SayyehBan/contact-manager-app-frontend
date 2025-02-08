import { RED } from "../../helpers/colors";

const BtnTrash = () => (
  <button
    className="btn my-1"
    style={{ backgroundColor: RED }}
    onMouseEnter={(e) => {
      e.currentTarget.querySelector("i").classList.remove("fa-trash");
      e.currentTarget.querySelector("i").classList.add("fa-trash-alt");
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector("i").classList.remove("fa-trash-alt");
      e.currentTarget.querySelector("i").classList.add("fa-trash");
    }}
  >
    <i className="fa fa-trash" />
  </button>
);

export default BtnTrash;
