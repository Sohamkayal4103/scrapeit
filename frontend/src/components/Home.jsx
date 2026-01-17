import pic from "/img8.jpg";

import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedin, FaRust } from "react-icons/fa";
import { SiLeetcode, SiTypescript } from "react-icons/si";
import { FaTelegram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

import { SiMongodb, SiSolidity } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa6";

import { ReactTyped } from "react-typed";

function Home() {
  return (
    <>
      <div
        name="Home"
        className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-24"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mt-12 md:mt-24 space-y-2 order-2 md:order-1">
            <span className="text-xl">Welcome to my portfolio</span>
            <div className="flex space-x-1 text-2xl md:text-4xl">
              <h1 className="mr-2">Hello, I'm a</h1>
              {/* <span >Developer</span> */}
              <ReactTyped
                className="text-red-700 font-bold"
                strings={[
                  "Full-Stack Developer.",
                  "Blockchain Developer.",
                  "AI Engineer.",
                  "Software Engineer.",
                  "Problem Solver.",
                  "FreeLancer.",
                ]}
                typeSpeed={40}
                backSpeed={50}
                loop={true}
              />
            </div>
            <br />
            <p className="text-md md:text-md text-justify">
              I am Soham Kayal, a Master's student in Computer Science at UC
              Santa Cruz with a focus on algorithms, cryptography, and systems.
              My work spans privacy-preserving graph algorithms, hardware
              enclaves, and zero-knowledge proofs, with research contributions
              under Professors Hamid Sadjadpour and Ioannis Demertzis at UCSC.
            </p>
            <p>
              At Amazon, I engineered a cross-service auto-balancing solution in
              B2B payments, improving efficiency and reducing manual workload.
              Beyond research and industry, I have TA'd courses in Algorithms
              and Cryptography at UCSC, solved 1000+ competitive programming
              problems (Knight badge, top 5% on LeetCode), and won 14 hackathons
              worldwide. I am open to full-time opportunities starting in 2026
              and part-time before then, eager to bring a mix of research depth,
              engineering rigor, and problem-solving passion to impactful teams.
            </p>
            <br />
            {/* social media icons */}
            <div className="flex flex-col items-center md:flex-row justify-between space-y-6 md:space-y-0">
              <div className="  space-y-2">
                <h1 className="font-bold text-center ">Available on</h1>
                <ul className="flex space-x-5">
                  <li>
                    <a
                      href="https://www.instagram.com/sohamkayal/"
                      target="_blank"
                    >
                      <FaInstagram className="text-2xl cursor-pointer" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/sohamkayal/"
                      target="_blank"
                    >
                      <FaLinkedin className="text-2xl cursor-pointer" />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Sohamkayal4103" target="_blank">
                      <FaGithub className="text-2xl cursor-pointer" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/kayal_soham" target="_blank">
                      <FaTwitter className="text-2xl cursor-pointer" />
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/sohamkayal" target="_blank">
                      <FaTelegram className="text-2xl cursor-pointer" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://leetcode.com/u/Sohamkayal4103/"
                      target="_blank"
                    >
                      <SiLeetcode className="text-2xl cursor-pointer" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className=" space-y-2">
                <h1 className="font-bold text-center">Currently working on</h1>
                <div className="flex space-x-5">
                  <SiMongodb className="text-2xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px] cursor-pointer" />
                  <SiExpress className="text-2xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px] cursor-pointer" />
                  <FaReact className="text-2xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px] cursor-pointer" />
                  <FaNodeJs className="text-2xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px] cursor-pointer" />
                  <SiSolidity className="text-2xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px] cursor-pointer" />
                  <FaRust className="text-2xl md:text-3xl hover:scale-110 duration-200 rounded-full border-[2px] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:ml-48 md:mt-20 mt-8 order-1">
            <img
              src={pic}
              className="mx-auto rounded-full w-[350px] h-[350px] md:w-[450px] md:h-[450px]"
              alt=""
            />
          </div>
        </div>
      </div>

      <hr />
    </>
  );
}

export default Home;
