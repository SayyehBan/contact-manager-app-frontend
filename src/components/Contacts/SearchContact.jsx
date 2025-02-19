import { useContext, useState } from "react";
import "./SearchContact.css"; // فایل استایل سفارشی برای کامپوننت جستجو
import { ContactContext } from "../../context/contactContext";
// کامپوننت جستجوی مخاطب که امکان جستجو در لیست مخاطبین را فراهم می‌کند
const SearchContact = ({ query, search }) => {
  const { contactQuery, contactSearch } = useContext(ContactContext);
  // استفاده از هوک useState برای مدیریت وضعیت باز/بسته بودن فیلد جستجو
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="input-group mx-2 w-75" // کلاس‌های margin و width
      dir="ltr" // جهت چپ به راست برای آیکون جستجو
      onMouseEnter={() => setIsOpen(true)} // باز شدن فیلد با hover موس
      onMouseLeave={() => setIsOpen(false)} // بسته شدن فیلد با خروج موس
    >
      <span
        className="input-group-text custom-input-group-text"
        id="basic-addon1"
      >
        <i className="fas fa-search" />
      </span>
      <input
        dir="rtl" // جهت راست به چپ برای متن فارسی
        type="text"
        className={`form-control custom-form-control ${isOpen ? "expand" : ""}`} // کلاس‌های پویا برای انیمیشن
        placeholder=""
        value={contactQuery.text}
        onChange={contactSearch}
        data-placeholder="جستجو مخطاب ..."
        aria-label="Search"
        aria-describedby="basic-addon1"
        onFocus={(e) => {
          const text = e.target.dataset.placeholder;
          let i = 0;
          const interval = setInterval(() => {
            e.target.placeholder = text.substring(0, i);
            i++;
            if (i > text.length) clearInterval(interval);
          }, 100);
        }}
        onBlur={(e) => {
          e.target.placeholder = "";
        }}
      />
    </div>
  );
};

export default SearchContact;
