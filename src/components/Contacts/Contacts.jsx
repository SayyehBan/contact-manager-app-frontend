import { PINK } from "../../helpers/colors";
import Contact from "../components/contact";

const Contacts = () => {
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <button className="btn mx-2" style={{ backgroundColor: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <Contact
          fullname={"نیکا شاکرمی"}
          phone={"09123456789"}
          email={"nikashakery@gmail.com"}
          image={"https://placehold.jp/200x200.png"}
        />
      </section>
    </>
  );
};

export default Contacts;
