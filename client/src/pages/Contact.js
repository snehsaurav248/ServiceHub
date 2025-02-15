import React from "react";
import { Mail, Linkedin, Github, Globe, Code } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-gray-800 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Contact Me</h1>

      <div className="flex flex-col sm:flex-row sm:justify-center gap-6">
        <a 
          href="mailto:snehsaurav248@gmail.com" 
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
        >
          <Mail size={24} /> <span className="text-lg">snehsauravv248@gmail.com</span>
        </a>

        <a 
          href="https://linkedin.com/in/snehsaurav248" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white bg-blue-700 hover:bg-blue-800 transition"
        >
          <Linkedin size={24} /> <span className="text-lg">LinkedIn</span>
        </a>

        <a 
          href="https://github.com/snehsaurav248" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-900 transition"
        >
          <Github size={24} /> <span className="text-lg">GitHub</span>
        </a>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-center gap-6 mt-4">
        <a 
          href="https://sneh-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
        >
          <Globe size={24} /> <span className="text-lg">Portfolio</span>
        </a>

        <a 
          href="https://leetcode.com/u/snehsauravv248/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition"
        >
          <Code size={24} /> <span className="text-lg">LeetCode</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
