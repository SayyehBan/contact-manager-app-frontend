import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { GREEN, PURPLE } from "../../Utilities/helpers/colors";
import { useContext, useEffect, useState } from "react";
import ImgZoom from "../../components/ImgZoom";
import Spinner from "../../components/Spinner";
import { ContactContext } from "../../context/contactContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactInsertSchema } from "../../validations/contcatValidation";

const AddContact = () => {
  const { loading, groups, jobs, createContact } = useContext(ContactContext);
  const [image, setImage] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxSize: 1024 * 1024,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
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
    return () => image.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [image]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
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
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      mobile: "",
                      email: "",
                      job: "",
                      group: "",
                      image: null,
                    }}
                    validationSchema={contactInsertSchema}
                    onSubmit={(values) => {
                      createContact(values);
                    }}
                  >
                    {({ setFieldValue }) => (
                      <Form>
                        <div className="mb-2">
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
                                نام خانوادگی :
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
                              <ErrorMessage
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
                                شماره موبایل :
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
                              <ErrorMessage
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
                                ایمیل :
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
                              <ErrorMessage
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
                                شغل :
                              </label>
                            </div>
                            <div className="col-md-4">
                              <Field
                                name="job"
                                id="job"
                                className="form-control"
                                as="select"
                              >
                                {jobs.map((job) => (
                                  <option
                                    key={job.jobID}
                                    value={parseInt(job.jobID)}
                                  >
                                    {job.jobTitle}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
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
                                {groups.map((group) => (
                                  <option
                                    key={group.groupID}
                                    value={parseInt(group.groupID)}
                                  >
                                    {group.groupTitle}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
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
                              <div
                                {...getRootProps()}
                                className="dropzone"
                                onClick={() => {
                                  const fileInput =
                                    document.createElement("input");
                                  fileInput.type = "file";
                                  fileInput.accept = "image/*";
                                  fileInput.onchange = (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const preview = URL.createObjectURL(file);
                                      setImage([{ ...file, preview }]);
                                      setFieldValue("image", file);
                                    }
                                  };
                                  fileInput.click();
                                }}
                              >
                                <input {...getInputProps()} />
                                <p>فایل تصویر را اینجا رها کنید یا کلیک کنید</p>
                              </div>
                              <div className="mt-2">
                                {image.map((file) => (
                                  <ImgZoom
                                    key={file.name}
                                    src={file.preview}
                                    alt={file.name}
                                    width="100px"
                                    height="100px"
                                  />
                                ))}
                              </div>
                              <ErrorMessage
                                name="image"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="row mt-2">
                            <div className="col-md-12">
                              <button
                                type="submit"
                                className="btn"
                                style={{ backgroundColor: GREEN }}
                              >
                                <i className="fas fa-plus-circle"></i> ثبت مخاطب
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
                    )}
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

export default AddContact;
