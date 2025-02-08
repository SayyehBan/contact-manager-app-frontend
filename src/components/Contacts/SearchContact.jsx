import { useState } from "react";
import "./SearchContact.css"; // فایل استایل سفارشی برای کامپوننت جستجو
import InputSearch from "../components/InputSearch";

// کامپوننت جستجوی مخاطب که امکان جستجو در لیست مخاطبین را فراهم می‌کند
const SearchContact = () => {
  // استفاده از هوک useState برای مدیریت وضعیت باز/بسته بودن فیلد جستجو
  const [isOpen, setIsOpen] = useState(false);

  return (
    // کانتینر اصلی با کلاس‌های بوت‌استرپ برای گروه‌بندی المان‌های ورودی
    <div
      className="input-group mx-2 w-75" // کلاس‌های margin و width
      dir="ltr" // جهت چپ به راست برای آیکون جستجو
      onMouseEnter={() => setIsOpen(true)} // باز شدن فیلد با hover موس
      onMouseLeave={() => setIsOpen(false)} // بسته شدن فیلد با خروج موس
    >
      {/* دکمه جستجو با آیکون */}
      <span
        className="input-group-text custom-input-group-text"
        id="basic-addon1"
      >
        <i className="fas fa-search" />
      </span>
      {/* فیلد ورودی جستجو */}
      <InputSearch isOpen={isOpen} text="جستجو مخاطب..." id="Search" />
    </div>
  );
};

export default SearchContact;
