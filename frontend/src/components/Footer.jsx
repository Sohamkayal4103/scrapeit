import React from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
function Footer() {
  return (
    <>
      <hr />
      <footer className="py-12">
        <div className="max-w-screen-2xl container mx-auto px-4 md:px-20">
          <div className=" flex flex-col items-center justify-center">
            <div className="flex space-x-4">
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
            <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col items-center">
              <p className="text-sm">
                &copy; 2024 Soham Kayal. All rights reserved.
              </p>
              <p className="text-sm">
                Made With React, Tailwind CSS and ChakraUI
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
