/**
 * @component EditContact
 * @description کامپوننت ویرایش مخاطب که امکان ویرایش اطلاعات و تصویر مخاطب را فراهم می کند
 * @returns {JSX.Element} فرم ویرایش مخاطب
 */
import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getContact,
  putContact,
  SERVER_URL,
} from "../../services/contactService";
import Spinner from "../../components/Spinner";
import { GREEN, ORANGE, PURPLE } from "../../Utilities/helpers/colors";
import ImgZoom from "../../components/ImgZoom";
import { ContactContext } from "../../context/contactContext";
import { contactUpdateSchema } from "../../validations/contcatValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";

/**
 * @function EditContact
 * @description کامپوننت اصلی ویرایش مخاطب
 */
const EditContact = () => {
  const { contactId } = useParams();
  const { loading, setLoading, groups, jobs } = useContext(ContactContext);
  const navigate = useNavigate();
  const [image, setImage] = useState([]); // آرایه تصاویر آپلود شده
  const [oldPhoto, setOldPhoto] = useState(""); // تصویر قبلی مخاطب
  const [contact, setContact] = useState({}); // اطلاعات مخاطب
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    job: "",
    group: "",
  });

  /**
   * @function handleSubmit
   * @description ارسال فرم ویرایش مخاطب
   * @param {Object} values - مقادیر فرم
   */
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      let data = new FormData();
      data.append("ContactID", contact.contactID);
      data.append("FirstName", values.firstName);
      data.append("LastName", values.lastName);
      data.append("Mobile", values.mobile);
      data.append("Email", values.email);
      data.append("JobID", values.job);
      data.append("GroupID", values.group);
      if (contact.image) {
        data.append("File.File", contact.image);
      }

      const { status } = await putContact(data, oldPhoto);
      if (status === 200) {
        navigate("/contacts");
      }
    } catch (err) {
      console.log("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @constant {Object} dropzone
   * @description تنظیمات آپلود تصویر با استفاده از react-dropzone
   */
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxSize: 1024 * 1024,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setContact({
        ...contact,
        photo: acceptedFiles[0].name,
        image: acceptedFiles[0],
      });
      setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  /**
   * @function useEffect
   * @description دریافت اطلاعات مخاطب هنگام لود کامپوننت
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
        setOldPhoto(contactData.photo);
        setInitialValues({
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
          mobile: contactData.mobile,
          job: contactData.jobID,
          group: contactData.groupID,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      image.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [contactId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={contactUpdateSchema}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <div className="row">
                          <div className="col-md-2">
                            <label
                              htmlFor="firstName"
                              className="form-label text-end w-100"
                            >
                              نام:
                            </label>
                          </div>
                          <div className="col-md-4">
                            <Field
                              id="firstName"
                              type="text"
                              name="firstName"
                              className="form-control"
                              placeholder="نام"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-2">
                            <label
                              htmlFor="lastName"
                              className="form-label text-end w-100"
                            >
                              نام خانوادگی:
                            </label>
                          </div>
                          <div className="col-md-4">
                            <Field
                              id="lastName"
                              type="text"
                              name="lastName"
                              className="form-control"
                              placeholder="نام خانوادگی"
                            />
                            <errorMessage
                              name="lastName"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-2">
                            <label
                              htmlFor="mobile"
                              className="form-label text-end w-100"
                            >
                              شماره موبایل:
                            </label>
                          </div>
                          <div className="col-md-4">
                            <Field
                              id="mobile"
                              type="text"
                              name="mobile"
                              className="form-control"
                              placeholder="شماره موبایل"
                            />
                            <errorMessage
                              name="mobile"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="col-md-2">
                            <label
                              htmlFor="email"
                              className="form-label text-end w-100"
                            >
                              ایمیل:
                            </label>
                          </div>
                          <div className="col-md-4">
                            <Field
                              id="email"
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="ایمیل"
                            />
                            <errorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-2">
                            <label
                              htmlFor="job"
                              className="form-label text-end w-100"
                            >
                              شغل:
                            </label>
                          </div>
                          <div className="col-md-4">
                            <Field
                              name="job"
                              id="job"
                              as="select"
                              className="form-control"
                            >
                              {jobs.map((j) => (
                                <option key={j.jobID} value={j.jobID}>
                                  {j.jobTitle}
                                </option>
                              ))}
                            </Field>
                            <errorMessage
                              name="job"
                              component="div"
                              className="text-danger"
                            />
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
                            <Field
                              name="group"
                              id="group"
                              className="form-control"
                              as="select"
                            >
                              {groups.map((g) => (
                                <option key={g.groupID} value={g.groupID}>
                                  {g.groupTitle}
                                </option>
                              ))}
                            </Field>
                            <errorMessage
                              name="group"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
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
                              {image.length > 0 ? (
                                image.map((file) => (
                                  <ImgZoom
                                    key={file.name}
                                    id={file.name}
                                    src={file.preview}
                                    alt={file.name}
                                    width="100px"
                                    height="100px"
                                    crossOrigin="anonymous"
                                  />
                                ))
                              ) : (
                                <ImgZoom
                                  id={contactId}
                                  src={SERVER_URL + contact.photo}
                                  alt={contactId}
                                  width="100px"
                                  height="100px"
                                  crossOrigin="anonymous"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <button
                              type="submit"
                              className="btn"
                              style={{ backgroundColor: GREEN }}
                            >
                              <i className="fas fa-plus-circle"></i> ویرایش
                              مخاطب
                            </button>

                            <Link
                              to="/contacts"
                              className="btn mx-2"
                              style={{ backgroundColor: PURPLE }}
                            >
                              <i className="fas fa-arrow-circle-left"></i>{" "}
                              بازگشت به صفحه مخاطبین
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
