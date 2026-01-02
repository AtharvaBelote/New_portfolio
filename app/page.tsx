import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import Image from "next/image";
import PixelBackground from "@/components/PixelBackground";

export default function Home() {
  return (
    // Main container
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      className="flex flex-wrap-reverse md:flex-nowrap justify-between items-center max-w-full mx-4 sm:mx-10 lg:mx-20 my-5 py-auto px-6"
    >
      <PixelBackground />
      <div className="pt-16  md:pl-10">
        <p
          className="bg-linear-to-r from-blue-400 via-cyan-400 to-teal-300 
             bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
        >
          <span className="underline underline-offset-4 text-xl">
            Welcome to my site!!
          </span>
        </p>
        <p className="text-4xl md:text-6xl font-extrabold text-gray-100 leading-tight pt-6">
          Hi, I&apos;m{" "}
          <span className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">
            Atharva
          </span>
          , a{<br />}
          <span
            className="bg-linear-to-r from-blue-400 via-cyan-400 to-teal-300 
                   bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
          >
            Web Developer
          </span>
          .
        </p>
        <p className="pt-5 text-gray-400">
          Building scalable web applications with clean code architecture.
          Passionate about solving complex problems through technology.
        </p>
      </div>
      <div className="m-auto md:m-10">
        <div className="relative w-[200] h-[200] md:w-[400] md:h-[400]">
          {/* Back curved layer */}
          <div className="absolute -left-4 top-4 w-full h-full bg-cyan-400 rounded-bl-[100px] md:rounded-bl-[200px] z-0"></div>

          {/* Front curved layer */}
          <div className="absolute left-0 top-0 w-full h-full bg-[#000618] rounded-bl-[100px] md:rounded-bl-[200px] z-1"></div>

          {/* Image */}
          <Image
            width={200}
            height={200}
            src="/My_Photo.png"
            alt="profile"
            className="absolute z-20 w-full h-full object-cover rounded-bl-[100px] md:rounded-bl-[200px] mask-t-from-70% bg-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
