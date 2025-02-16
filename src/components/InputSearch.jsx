function InputSearch({ isOpen, text, id, query, handleSearch }) {
  return (
    <input
      dir="rtl" // جهت راست به چپ برای متن فارسی
      type="text"
      className={`form-control custom-form-control ${isOpen ? "expand" : ""}`} // کلاس‌های پویا برای انیمیشن
      placeholder=""
      value={query.text}
      onChange={handleSearch}
      data-placeholder={text}
      aria-label={id}
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
  );
}

export default InputSearch;
