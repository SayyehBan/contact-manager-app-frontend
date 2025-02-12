import { useEffect, useState } from "react";
import { GREEN, PURPLE } from "../../Utilities/helpers/colors";
import { Spinner } from "../../components/Index";
import {
  getAllGroups,
  getAllJobs,
  postContact,
} from "../../services/contactService";
import { useDropzone } from "react-dropzone";
import ImgZoom from "../../components/ImgZoom";
import { Link } from "react-router-dom";

const AddContact = () => {
  const [getGroups, setGetGroups] = useState([]);
  const [getJobs, setGetJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState(0);
  const [group, setGroup] = useState(0);
  const [image, setImage] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxSize: 1024 * 1024, // 1MB
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
        if (groupsData.length > 0) {
          setGroup(groupsData[0].groupID);
        }

        const { data: jobsData } = await getAllJobs();
        setGetJobs(jobsData);
        if (jobsData.length > 0) {
          setJob(jobsData[0].jobID);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Clean up previews
    return () => image.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [image]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("FirstName", firstName);
    data.append("LastName", lastName);
    data.append("Mobile", mobile);
    data.append("Email", email);
    data.append("JobID", parseInt(job));
    data.append("GroupID", parseInt(group));
    data.append("File.File", image[0]);

    try {
      await postContact(data, (progress) => {
        console.log(progress);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              alt=""
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
                            شغل :
                          </label>
                        </div>
                        <div className="col-md-4">
                          <select
                            name="job"
                            id="job"
                            className="form-control"
                            value={job}
                            onChange={(e) => setJob(parseInt(e.target.value))}
                          >
                            {getJobs.map((job) => (
                              <option
                                key={job.jobID}
                                value={parseInt(job.jobID)}
                              >
                                {job.jobTitle}
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
                            value={group}
                            onChange={(e) => setGroup(parseInt(e.target.value))}
                          >
                            {getGroups.map((group) => (
                              <option
                                key={group.groupID}
                                value={parseInt(group.groupID)}
                              >
                                {group.groupTitle}
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

export default AddContact;
