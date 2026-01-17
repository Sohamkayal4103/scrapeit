import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    {
      id: 1,
      text: "Home",
    },
    {
      id: 2,
      text: "About",
    },
    {
      id: 3,
      text: "Experience",
    },
    {
      id: 4,
      text: "Portfolio",
    },
    {
      id: 5,
      text: "Contact",
    },
  ];

  const goToSection = (sectionName) => {
    const scrollToSection = () => {
      scroller.scrollTo(sectionName, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    };

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scrollToSection, 50);
      return;
    }

    scrollToSection();
  };
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 h-16 shadow-md fixed top-0 left-0 right-0 z-50 bg-[#1a202c]">
        <div className="flex justify-between items-center h-16">
          <div className=" flex space-x-2">
            <h1 className="font-semibold text-xl cursor-pointer">
              Soham Kaya<span className="text-green-500 text-2xl">l</span>
              <p className="text-sm">Software Engineer</p>
            </h1>
          </div>
          {/* desktop navbar */}
          <div>
            <ul className="hidden md:flex space-x-8">
              {navItems.map(({ id, text }) => (
                <li
                  className="hover:scale-105 duration-200 cursor-pointer"
                  key={id}
                >
                  {location.pathname === "/" ? (
                    <ScrollLink
                      to={text}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      activeClass="active"
                    >
                      {text}
                    </ScrollLink>
                  ) : (
                    <button type="button" onClick={() => goToSection(text)}>
                      {text}
                    </button>
                  )}
                </li>
              ))}
              <li className="hover:scale-105 duration-200 cursor-pointer">
                <RouterLink to="/know-more">Know More</RouterLink>
              </li>
            </ul>
            <div onClick={() => setMenu(!menu)} className="md:hidden">
              {menu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>
        </div>
        {/* mobile navbar */}
        {menu && (
          <div className="bg-[#1a202c]">
            <ul className="md:hidden flex flex-col h-screen items-center justify-center space-y-3 text-xl">
              {navItems.map(({ id, text }) => (
                <li
                  className="hover:scale-105 duration-200 font-semibold cursor-pointer"
                  key={id}
                >
                  {location.pathname === "/" ? (
                    <ScrollLink
                      onClick={() => setMenu(!menu)}
                      to={text}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      activeClass="active"
                    >
                      {text}
                    </ScrollLink>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMenu(!menu);
                        goToSection(text);
                      }}
                      className="font-semibold"
                    >
                      {text}
                    </button>
                  )}
                </li>
              ))}
              <li className="hover:scale-105 duration-200 font-semibold cursor-pointer">
                <RouterLink
                  to="/know-more"
                  onClick={() => setMenu(!menu)}
                >
                  Know More
                </RouterLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
