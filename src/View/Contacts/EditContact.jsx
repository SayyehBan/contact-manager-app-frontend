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
import { useFormik } from "formik";

const EditContact = () => {
  const { contactId } = useParams();
  const { loading, setLoading, groups, jobs } = useContext(ContactContext);
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [oldPhoto, setOldPhoto] = useState("");
  const [contact, setContact] = useState({});

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      job: "",
      group: "",
    },
    validationSchema: contactUpdateSchema,
    onSubmit: async (values) => {
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
    },
    enableReinitialize: true,
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
        setOldPhoto(contactData.photo);
        formik.setValues({
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
      // Cleanup previews to avoid memory leaks
      image.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <form onSubmit={formik.handleSubmit}>
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
                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="نام"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.firstName &&
                          formik.errors.firstName ? (
                            <div className="text-danger">
                              {formik.errors.firstName}
                            </div>
                          ) : null}
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
                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="نام خانوادگی"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="text-danger">
                              {formik.errors.lastName}
                            </div>
                          ) : null}
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
                          <input
                            id="mobile"
                            type="text"
                            name="mobile"
                            className="form-control"
                            placeholder="شماره موبایل"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.mobile && formik.errors.mobile ? (
                            <div className="text-danger">
                              {formik.errors.mobile}
                            </div>
                          ) : null}
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
                          <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="ایمیل"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">
                              {formik.errors.email}
                            </div>
                          ) : null}
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
                          <select
                            name="job"
                            id="job"
                            className="form-control"
                            value={formik.values.job}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            {jobs.map((j) => (
                              <option key={j.jobID} value={j.jobID}>
                                {j.jobTitle}
                              </option>
                            ))}
                          </select>
                          {formik.touched.job && formik.errors.job ? (
                            <div className="text-danger">
                              {formik.errors.job}
                            </div>
                          ) : null}
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
                            value={formik.values.group}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            {groups.map((g) => (
                              <option key={g.groupID} value={g.groupID}>
                                {g.groupTitle}
                              </option>
                            ))}
                          </select>
                          {formik.touched.group && formik.errors.group ? (
                            <div className="text-danger">
                              {formik.errors.group}
                            </div>
                          ) : null}
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
                          {formik.touched.image && formik.errors.image ? (
                            <div className="text-danger">
                              {formik.errors.image}
                            </div>
                          ) : null}
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
                            disabled={formik.isSubmitting}
                          >
                            <i className="fas fa-plus-circle"></i> ویرایش مخاطب
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
                  </form>
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
