/**
 * @description کامپوننت دکمه حذف مخاطب که شامل مودال تایید حذف نیز می‌باشد
 * @component BtnTrash
 * @param {Object} contact - اطلاعات مخاطب شامل شناسه، نام، نام خانوادگی و تصویر
 */
import { deleteContact } from "../services/contactService";
import { RED } from "../Utilities/helpers/colors";
import { useState } from "react";

const BtnTrash = ({ contact }) => {
  // وضعیت نمایش مودال تایید حذف
  const [showDialog, setShowDialog] = useState(false);
  // پیام نمایشی به کاربر
  const [message, setMessage] = useState("");

  /**
   * @description تابع حذف مخاطب
   * @param {Event} e - رویداد کلیک
   */
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteContact(contact);
      if (result) {
        setMessage("مخاطب با موفقیت حذف شد");
        setTimeout(() => {
          setMessage("");
        }, 2000);
        window.location.reload();
      } else {
        setMessage("خطا در حذف اطلاعات");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      setMessage("خطا در برقراری ارتباط با سرور");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    setShowDialog(false);
  };

  return (
    <>
      {/* دکمه حذف با افکت تغییر آیکون در هاور */}
      <button
        className="btn my-1"
        style={{ backgroundColor: RED }}
        onClick={() => setShowDialog(true)}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector("i").classList.remove("fa-trash");
          e.currentTarget.querySelector("i").classList.add("fa-trash-alt");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector("i").classList.remove("fa-trash-alt");
          e.currentTarget.querySelector("i").classList.add("fa-trash");
        }}
      >
        <i className="fa fa-trash" />
      </button>

      {/* مودال تایید حذف مخاطب */}
      {showDialog && (
        <>
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">تایید حذف</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDialog(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    آیا از حذف مخاطب{" "}
                    {contact.firstName + " " + contact.lastName} اطمینان دارید؟
                  </p>
                  {/* نمایش پیام به کاربر */}
                  {message && <div className="alert alert-info">{message}</div>}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDialog(false)}
                  >
                    لغو
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    بله
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BtnTrash;
