import { useState } from "react";
import "./SearchContact.css"; // اضافه کردن فایل CSS سفارشی
const SearchContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="input-group mx-2 w-75"
      dir="ltr"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        className="input-group-text custom-input-group-text"
        id="basic-addon1"
      >
        <i className="fas fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        className={`form-control custom-form-control ${isOpen ? "expand" : ""}`}
        placeholder="جستجو مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
