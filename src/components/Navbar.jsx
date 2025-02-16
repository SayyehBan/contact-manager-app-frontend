import { useLocation } from "react-router-dom";
import { BACKGROUND, PURPLE } from "../Utilities/helpers/colors";
import SearchContact from "../view/Contacts/SearchContact";
const Navbar = ({ query, handleSearch }) => {
  const location = useLocation();
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
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact query={query} handleSearch={handleSearch} />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
