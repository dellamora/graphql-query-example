import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuToggleIcon from "../../common/svgs/menuToggle";
import { motion } from "framer-motion";

const Nav: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-50 relative flex items-center justify-between px-8 py-4 lg:px-16">
      <Link href="/" onClick={() => setIsOpen(false)}>
        <Image
          alt="rick and morty log"
          src="/logoRAM.png"
          width={180}
          height={55}
        />
      </Link>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="z-10 flex space-x-5 bg-transparent lg:hidden "
      >
        <MenuToggleIcon
          className="stroke-white "
          onClick={() => setIsOpen(current => !current)}
        />
      </motion.div>
      {isOpen && (
        <div className="absolute  left-0 right-0 top-16 z-50 flex h-screen w-screen flex-col items-center gap-6 overflow-y-scroll bg-primaryDark py-5 text-2xl font-semibold lg:hidden">
          <Link
            onClick={() => setIsOpen(current => !current)}
            href="/about"
            className="mr-4 hover:underline md:mr-6"
          >
            About the Project
          </Link>
          <a
            onClick={() => setIsOpen(current => !current)}
            target="_blank"
            href="https://www.dellamora.dev/"
            className="mr-4 hover:underline md:mr-6"
            rel="noreferrer"
          >
            My Portfolio
          </a>
          <a
            onClick={() => setIsOpen(current => !current)}
            target="_blank"
            href="https://discord.gg/Xxu2raVxs5"
            className="mr-4 hover:underline md:mr-6 "
            rel="noreferrer"
          >
            Discord Server
          </a>
          <a
            onClick={() => setIsOpen(current => !current)}
            target="_blank"
            href="mailto:francielle@dellamora.dev"
            className="hover:underline"
            rel="noreferrer"
          >
            Contact Me
          </a>
        </div>
      )}
      <div className="hidden justify-between gap-4 text-lg font-semibold lg:flex ">
        <Link
          onClick={() => setIsOpen(current => !current)}
          href="/about"
          className="mr-4 hover:underline md:mr-6"
        >
          About the Project
        </Link>
        <a
          target="_blank"
          href="https://www.dellamora.dev/"
          className="mr-4 hover:underline md:mr-6"
          rel="noreferrer"
        >
          My Portfolio
        </a>
        <a
          target="_blank"
          href="https://discord.gg/Xxu2raVxs5"
          className="mr-4 hover:underline md:mr-6 "
          rel="noreferrer"
        >
          Discord Server
        </a>
        <a
          target="_blank"
          href="mailto:francielle@dellamora.dev"
          className="hover:underline"
          rel="noreferrer"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default Nav;
