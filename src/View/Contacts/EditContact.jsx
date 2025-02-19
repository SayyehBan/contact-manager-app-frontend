import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAllGroups,
  getAllJobs,
  getContact,
  putContact,
  SERVER_URL,
} from "../../services/contactService";
import Spinner from "../../components/Spinner";
import { GREEN, ORANGE, PURPLE } from "../../Utilities/helpers/colors";
import ImgZoom from "../../components/ImgZoom";

const EditContact = ({ forceRender, setForceRender }) => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [oldPhoto, setOldPhoto] = useState("");
  const [state, setState] = useState({
    loading: false,
    contact: {
      firstName: "",
      lastName: "",
      photo: "",
      image: null,
      mobile: "",
      email: "",
      job: "",
      jobId: 0,
      group: "",
      groupId: 0,
    },
    groups: [],
    jobs: [],
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxSize: 1024 * 1024,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setState({
        ...state,
        contact: {
          ...state.contact,
          image: acceptedFiles[0],
        },
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
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupsData } = await getAllGroups();
        const { data: jobsData } = await getAllJobs();
        setState({
          ...state,
          loading: false,
          contact: contactData,
          groups: groupsData,
          jobs: jobsData,
        });
        setOldPhoto(contactData.photo);
      } catch (err) {
        console.log(err);
        setState({ ...state, loading: false });
      }
    };

    fetchData();
  }, []);

  const setContactInfo = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: [event.target.value],
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setState({ ...state, loading: true });
      let data = new FormData();
      data.append("ContactID", contact.contactID);
      data.append("FirstName", contact.firstName);
      data.append("LastName", contact.lastName);
      data.append("Mobile", contact.mobile);
      data.append("Email", contact.email);
      data.append("JobID", contact.job);
      data.append("GroupID", contact.group);
      data.append("File.File", contact.image);

      const { res } = await putContact(data, oldPhoto, (progress) => {
        console.log(progress);
      });
      setState({ ...state, loading: false });
      if (res) {
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setState({ ...state, loading: false });
    }
  };

  const { loading, contact, groups, jobs } = state;

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
                  <form onSubmit={submitForm}>
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
                            required={true}
                            value={contact.firstName}
                            onChange={setContactInfo}
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
                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="نام خانوادگی"
                            required={true}
                            value={contact.lastName}
                            onChange={setContactInfo}
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
                          <input
                            id="mobile"
                            type="text"
                            name="mobile"
                            className="form-control"
                            placeholder="شماره موبایل"
                            required={true}
                            value={contact.mobile}
                            onChange={setContactInfo}
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
                          <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="ایمیل"
                            required={true}
                            value={contact.email}
                            onChange={setContactInfo}
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
                          <select
                            name="job"
                            id="job"
                            className="form-control"
                            defaultValue={contact.jobID}
                            onChange={setContactInfo}
                          >
                            {jobs.map((j) => (
                              <option key={j.jobID} value={j.jobID}>
                                {j.jobTitle}
                              </option>
                            ))}
                          </select>
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
                            defaultValue={contact.groupID}
                            onChange={setContactInfo}
                          >
                            {groups.map((g) => (
                              <option key={g.groupID} value={g.groupID}>
                                {g.groupTitle}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>{" "}
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
                                />
                              ))
                            ) : (
                              <ImgZoom
                                id={contactId}
                                src={SERVER_URL + contact.photo}
                                alt={contactId}
                                width="100px"
                                height="100px"
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
