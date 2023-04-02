import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import React from "react";
import type { Icon } from "../../domain/components/icon";

const Path = (props: {
  variants?: Variants;
  className?: string;
  d?: string;
  transition?: Transition;
}) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#F1F1F1"
    strokeLinecap="round"
    {...props}
  />
);
const MenuToggleIcon: Icon = ({ onClick, className }): JSX.Element => {
  return (
    <svg width="30" viewBox="0 0 23 19" onClick={onClick}>
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        className={className}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
        className={className}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        className={className}
      />
    </svg>
  );
};

export default MenuToggleIcon;
