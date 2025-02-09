import { CURRENTLINE, ORANGE } from "../../helpers/colors";

const NotFound = () => {
  return (
    <div className="text-center py-5" style={{ backgroundColor: CURRENTLINE }}>
      <p className="h3" style={{ color: ORANGE }}>
        مخاطب یافت نشد
      </p>
      <img
        src={require("../../assets/no-found.gif")}
        alt="یافت نشد"
        className="w-25"
      />
    </div>
  );
};

export default NotFound;
