import { useEffect, useState } from "react";
import { GREEN } from "../../Utilities/helpers/colors";
import { Spinner } from "../../components/Index";
import { getAllGroups, getAllJobs } from "../../services/contactService";

const AddContact = () => {
  const [getGroups, setGetGroups] = useState([]);
  const [getJobs, setGetJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: groupsData } = await getAllGroups();
        setGetGroups(groupsData);

        const { data: jobsData } = await getAllJobs();
        setGetJobs(jobsData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
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
                          <select name="job" id="job" className="form-control">
                            {getJobs.map((job) => (
                              <option key={job.jobID} value={job.jobID}>
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
                          >
                            {getGroups.map((group) => (
                              <option key={group.groupID} value={group.groupID}>
                                {group.groupTitle}
                              </option>
                            ))}
                          </select>
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
