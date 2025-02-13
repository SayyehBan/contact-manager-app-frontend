import { use, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useParams } from "react-router-dom";
import {
  BASE_URL,
  getAllGroups,
  getAllJobs,
  getContact,
  putContact,
} from "../../services/contactService";
import Spinner from "../../components/Spinner";
import { GREEN, PURPLE } from "../../Utilities/helpers/colors";
import NotFound from "../../components/NotFound";
import ImgZoom from "../../components/ImgZoom";

const EditContact = ({ contact }) => {
  const { contactId } = useParams();
  const numericContactId = parseInt(contactId);

  const [getDataContact, setGetDataContact] = useState({});
  const [getGroups, setGetGroups] = useState([]);
  const [getJobs, setGetJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [jobId, setJobId] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [groupId, setGroupId] = useState(0);
  const [groupTitle, setGroupTitle] = useState("");
  const [photo, setPhoto] = useState("");
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
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: groupsData } = await getAllGroups();
        setGetGroups(groupsData);

        const { data: jobsData } = await getAllJobs();
        setGetJobs(jobsData);

        const filteredContact = contact.find(
          (c) => c.contactID === numericContactId
        );
        if (filteredContact) {
          setGetDataContact(filteredContact);
          setFirstName(filteredContact.firstName);
          setLastName(filteredContact.lastName);
          setPhoto(BASE_URL + filteredContact.photo);
          setMobile(filteredContact.mobile);
          setEmail(filteredContact.email);
          setJobId(filteredContact.jobID);
          setGroupId(filteredContact.groupID);
        } else {
          const { data: contactData } = await getContact(numericContactId);
          setGetDataContact(contactData);
          setFirstName(contactData.firstName);
          setLastName(contactData.lastName);
          setPhoto(BASE_URL + contactData.photo);
          setMobile(contactData.mobile);
          setEmail(contactData.email);
          setJobId(contactData.jobID);
          setGroupId(contactData.groupID);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [contact, contactId]);

  useEffect(() => {
    return () => image.map((file) => URL.revokeObjectURL(file.preview));
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("ContactID", numericContactId);
    data.append("FirstName", firstName);
    data.append("LastName", lastName);
    data.append("Mobile", mobile);
    data.append("Email", email);
    data.append("JobID", parseInt(jobId));
    data.append("GroupID", parseInt(groupId));
    data.append("File.File", image[0]);

    try {
      await putContact(data, (progress) => {
        console.log(progress);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: GREEN }}>
              ویرایش اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(getDataContact).length > 0 ? (
            <section className="p-3">
              <div className="container">
                <hr style={{ backgroundColor: GREEN }} />
                <div className="row mt-5">
                  <div className="col-md-12">
                    <form onSubmit={(e) => e.preventDefault()}>
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
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
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
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
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
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
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
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
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
                              value={jobId}
                              onChange={(e) =>
                                setJobId(parseInt(e.target.value))
                              }
                            >
                              {getJobs.map((j) => (
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
                              value={groupId}
                              onChange={(e) =>
                                setGroupId(parseInt(e.target.value))
                              }
                            >
                              {getGroups.map((g) => (
                                <option key={g.groupID} value={g.groupID}>
                                  {g.groupTitle}
                                </option>
                              ))}
                            </select>
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
                                  src={BASE_URL + getDataContact.photo}
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
                              onClick={handleSubmit}
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
                    </form>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};

export default EditContact;
