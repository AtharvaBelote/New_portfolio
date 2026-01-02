"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav
      className="max-w-full max-h-full
    bg-white/1 text-white
    sticky top-4 z-50 flex items-center justify-between rounded-xl
    shadow-[inset_0_5px_4px_rgba(255,255,255,0.2),inset_-5px_0_4px_rgba(255,255,255,0.2)]
    backdrop-blur-[2px]
    px-6 sm:px-10 lg:px-20 py-4 mx-4 sm:mx-10 lg:mx-20 my-5"
    >
      <div className="">
        <Image
          src="/next.svg"
          width={150}
          height={10}
          alt="LOGO"
          className="cursor-pointer"
          onClick={() => router.push("/")}
          priority
        />
      </div>
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        <motion.a
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.1 },
          }}
          href="#about"
          className="text-sm sm:text-base hover:text-gray-300 transition-colors cursor-pointer"
        >
          About
        </motion.a>
        <motion.a
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.1 },
          }}
          href="#project"
          className="text-sm sm:text-base hover:text-gray-300 transition-colors cursor-pointer"
        >
          Project
        </motion.a>
        <motion.a
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.1 },
          }}
          href="#contact"
          className="text-sm sm:text-base hover:text-gray-300 transition-colors cursor-pointer"
        >
          Contact
        </motion.a>
      </div>
    </nav>
  );
};

export default Navbar;
