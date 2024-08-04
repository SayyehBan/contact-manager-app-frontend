import { BACKGROUND, PURPLE } from "../helpers/colors";
import SearchContact from "./Contacts/SearchContact";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fa fa-id-badge" style={{ color: PURPLE }} />
              &nbsp; وب اپلیکشن مدیریت {""}
              <span style={{ color: PURPLE }}>مخاطبین</span>
            </div>
          </div>
          <div className="col">
            <SearchContact />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
