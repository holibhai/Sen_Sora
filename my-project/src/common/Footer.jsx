import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Logo from "../assets/__-removebg-preview.png"


const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About", href: "#" },
      { name: "Terms of Use", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "How it Works", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
    getHelp: [
      { name: "Support Carrer", href: "#" },
      { name: "24h Service", href: "#" },
      { name: "Quick Chat", href: "#" },
    ],
    support: [
      { name: "FAQ", href: "#" },
      { name: "Policy", href: "#" },
      { name: "Business", href: "#" },
    ],
    contact: [
      { name: "WhatsApp", href: "#" },
      { name: "Support 24", href: "#" },
    ],
  };

  return (
    <div className="px-36 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-1 mb-6">
            <img src={Logo} alt=""  className="w-[100px] h-[100px]"/>
            <div className="text-3xl font-bold">Sen-Sora</div>
          </div>
          <p className="text-gray-600 mb-6">
            Sen_Sora is a web-based platform for selling cakes and gifts,
            offering a seamless shopping experience with secure payments, order
            tracking, and user-friendly navigation. Built with modern
            technologies for efficiency and scalability.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-colors"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(
              ([category, links], categoryIndex) => (
                <div key={category}>
                  <h3 className="text-lg font-medium mb-4">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-200 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            Copyright © {new Date().getFullYear()} Sen_Sora.com
          </p>
          <p className="text-gray-600 text-sm">Created by Hojeth</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
