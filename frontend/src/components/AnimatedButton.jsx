// import React from 'react';
// import { motion } from 'framer-motion';

// const AnimatedButton = ({ children, onClick, className = '', disabled = false, type = 'button', ...props }) => {
//   return (
//     <motion.button
//       type={type}
//       className={`btn ${className}`}
//       onClick={onClick}
//       disabled={disabled}
//       whileHover={{ scale: disabled ? 1 : 1.02 }}
//       whileTap={{ scale: disabled ? 1 : 0.98 }}
//       transition={{ type: 'spring', stiffness: 400, damping: 17 }}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );
// };

// export default AnimatedButton;
import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
    {...props}
  >
    {children}
  </motion.button>
);

export default AnimatedButton;
