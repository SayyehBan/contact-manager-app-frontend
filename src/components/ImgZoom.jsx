import { PURPLE } from "../Utilities/helpers/colors";

function ImgZoom({ key, src, alt, width, height }) {
  return (
    <img
      key={key}
      src={src}
      alt={alt}
      className="img-fluid rounded "
      style={{
        border: `1px solid ${PURPLE}`,
        cursor: "pointer",
        width: width,
        height: height,
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
}

export default ImgZoom;
