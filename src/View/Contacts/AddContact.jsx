import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { GREEN, PURPLE } from "../../Utilities/helpers/colors";
import { useContext, useEffect, useState } from "react";
import ImgZoom from "../../components/ImgZoom";
import Spinner from "../../components/Spinner";
import { ContactContext } from "../../context/contactContext";

/**
 * کامپوننت افزودن مخاطب جدید
 * این کامپوننت فرم اضافه کردن مخاطب جدید را نمایش می دهد
 * و شامل فیلدهای نام، نام خانوادگی، موبایل، ایمیل، شغل، گروه و تصویر می باشد
 */
const AddContact = () => {
  // دریافت متغیرها و توابع مورد نیاز از کانتکست
  const {
    loading,
    contact,
    onContactChange,
    groups,
    jobs,
    createContact,
    errors,
  } = useContext(ContactContext);

  // استیت نگهداری تصویر
  const [image, setImage] = useState([]);

  // تنظیمات آپلود تصویر با استفاده از react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxSize: 1024 * 1024, // حداکثر سایز 1 مگابایت
    maxFiles: 1, // حداکثر یک فایل
    onDrop: (acceptedFiles) => {
      // ذخیره تصویر در استیت
      setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // ارسال تصویر به کانتکست
      onContactChange({
        target: {
          name: "image",
          value: acceptedFiles[0],
        },
      });
    },
  });

  // پاکسازی URL های موقت تصاویر هنگام آنمانت شدن کامپوننت
  useEffect(() => {
    return () => image.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [image]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            {/* تصویر پس زمینه */}
            <img
              alt=""
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />

              <div className="row mt-5">
                <div className="col-md-12">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-2">
                      {/* بخش نام و نام خانوادگی */}
                      <div className="row">
                        <div className="col-md-2">
                          <label
                            htmlFor="firstName"
                            className="form-label text-end w-100"
                          >
                            نام :
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={contact.firstName}
                            onChange={onContactChange}
                            className="form-control"
                            placeholder="نام"
                          />
                          {errors?.find((err) => err.path === "firstName") && (
                            <small className="text-danger">
                              {
                                errors.find((err) => err.path === "firstName")
                                  .message
                              }
                            </small>
                          )}
                        </div>
                        <div className="col-md-2">
                          <label
                            htmlFor="lastName"
                            className="form-label text-end w-100"
                          >
                            نام خانوادگی :
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="نام خانوادگی"
                            value={contact.lastName}
                            onChange={onContactChange}
                          />
                          {errors?.find((err) => err.path === "lastName") && (
                            <small className="text-danger">
                              {
                                errors.find((err) => err.path === "lastName")
                                  .message
                              }
                            </small>
                          )}
                        </div>
                      </div>

                      {/* بخش موبایل و ایمیل */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label
                            htmlFor="mobile"
                            className="form-label text-end w-100"
                          >
                            شماره موبایل :
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            id="mobile"
                            type="text"
                            name="mobile"
                            className="form-control"
                            placeholder="شماره موبایل"
                            value={contact.mobile}
                            onChange={onContactChange}
                          />
                          {errors?.find((err) => err.path === "mobile") && (
                            <small className="text-danger">
                              {
                                errors.find((err) => err.path === "mobile")
                                  .message
                              }
                            </small>
                          )}
                        </div>
                        <div className="col-md-2">
                          <label
                            htmlFor="email"
                            className="form-label text-end w-100"
                          >
                            ایمیل :
                          </label>
                        </div>
                        <div className="col-md-4">
                          <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="ایمیل"
                            value={contact.email}
                            onChange={onContactChange}
                          />
                          {errors?.find((err) => err.path === "email") && (
                            <small className="text-danger">
                              {
                                errors.find((err) => err.path === "email")
                                  .message
                              }
                            </small>
                          )}
                        </div>
                      </div>

                      {/* بخش شغل و گروه */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label
                            htmlFor="job"
                            className="form-label text-end w-100"
                          >
                            شغل :
                          </label>
                        </div>
                        <div className="col-md-4">
                          <select
                            name="job"
                            id="job"
                            className="form-control"
                            value={contact.jobID}
                            onChange={onContactChange}
                          >
                            {jobs.map((job) => (
                              <option
                                key={job.jobID}
                                value={parseInt(job.jobID)}
                              >
                                {job.jobTitle}
                              </option>
                            ))}
                          </select>
                          {errors?.find((err) => err.path === "job") && (
                            <small className="text-danger">
                              {errors.find((err) => err.path === "job").message}
                            </small>
                          )}
                        </div>

                        <div className="col-md-2">
                          <label
                            htmlFor="group"
                            className="form-label text-end w-100"
                          >
                            گروه :
                          </label>
                        </div>
                        <div className="col-md-4">
                          <select
                            name="group"
                            id="group"
                            className="form-control"
                            value={contact.groupID}
                            onChange={onContactChange}
                          >
                            {groups.map((group) => (
                              <option
                                key={group.groupID}
                                value={parseInt(group.groupID)}
                              >
                                {group.groupTitle}
                              </option>
                            ))}
                          </select>
                          {errors?.find((err) => err.path === "group") && (
                            <small className="text-danger">
                              {
                                errors.find((err) => err.path === "group")
                                  .message
                              }
                            </small>
                          )}
                        </div>
                      </div>

                      {/* بخش آپلود تصویر */}
                      <div className="row mt-2">
                        <div className="col-md-2">
                          <label
                            htmlFor="photo"
                            className="form-label text-end w-100"
                          >
                            تصویر
                          </label>
                        </div>
                        <div className="col-md-10">
                          <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <p>فایل تصویر را اینجا رها کنید یا کلیک کنید</p>
                          </div>
                          <div className="mt-2">
                            {image.map((file) => (
                              <ImgZoom
                                id={file.name}
                                src={file.preview}
                                alt={file.name}
                                width="100px"
                                height="100px"
                              />
                            ))}
                          </div>
                          {errors?.find((err) => err.path === "image") && (
                            <small className="text-danger">
                              {
                                errors.find((err) => err.path === "image")
                                  .message
                              }
                            </small>
                          )}
                        </div>
                      </div>

                      {/* دکمه های عملیات */}
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: GREEN }}
                            onClick={createContact}
                          >
                            <i className="fas fa-plus-circle"></i> ثبت مخاطب
                          </button>

                          <Link
                            to="/contacts"
                            className="btn mx-2"
                            style={{ backgroundColor: PURPLE }}
                          >
                            <i className="fas fa-arrow-circle-left"></i> بازگشت
                            به صفحه مخاطبین
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>{" "}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
