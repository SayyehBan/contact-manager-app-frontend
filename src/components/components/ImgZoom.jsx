import { PURPLE } from "../../helpers/colors";

const ImgZoom = ({ image }) => (
  <img
    src={image}
    alt=""
    className="img-fluid rounded "
    style={{
      border: `1px solid ${PURPLE}`,
      cursor: "pointer",
      width: "150px",
      height: "150px",
      transition: "transform 0.3s ease",
      position: "relative",
      zIndex: 1000,
    }}
    onClick={(e) => {
      e.target.style.transform =
        e.target.style.transform === "scale(2)" ? "scale(1)" : "scale(2)";
      e.target.style.zIndex =
        e.target.style.zIndex === "1000" ? "1001" : "1000";
    }}
  />
);

export default ImgZoom;
