/**
 * نمایش یک اسپینر در حال بارگذاری
 *
 * اسپینر به صورت یک تصویر GIF در مرکز صفحه با اندازه ثابت 200x200 پیکسل نمایش داده می‌شود
 * از این کامپوننت معمولاً برای نشان دادن وضعیت بارگذاری یا پردازش داده‌ها در برنامه استفاده می‌شود
 */ const Spinner = () => {
  return (
    <>
      <img
        src={require("../assets/Spinner.gif")}
        className="d-block m-auto"
        style={{ width: "200px", height: "200px" }}
        alt="بارگزاری"
      />
    </>
  );
};
export default Spinner;
