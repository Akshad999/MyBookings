import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <motion.div
      className={`card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
