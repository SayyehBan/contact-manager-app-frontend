import { useState } from "react";
import "./SearchContact.css"; // فایل استایل سفارشی برای کامپوننت جستجو

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
      <input
        dir="rtl" // جهت راست به چپ برای متن فارسی
        type="text"
        className={`form-control custom-form-control ${isOpen ? "expand" : ""}`} // کلاس‌های پویا برای انیمیشن
        placeholder="جستجو مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
