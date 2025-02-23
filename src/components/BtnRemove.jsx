import React, { useState } from "react";
import { motion } from "framer-motion";
import trashIcon from "../assets/Spinner.gif";

const BtnRemove = ({ onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const handleRemove = () => {
    const button = document.querySelector(".remove-button");
    button.style.animation = "fadeOut 0.3s ease forwards";
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  return (
    <motion.button
      className="remove-button bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleRemove}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0.8 : 1 }}
      >
        <img src={trashIcon} alt="trash" width={16} height={16} />
      </motion.div>
      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.5);
          }
        }
      `}</style>
    </motion.button>
  );
};

export default BtnRemove;
