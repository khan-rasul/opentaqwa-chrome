/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { Github, Bug, Lightbulb, Heart } from "lucide-react";
import Tooltip from "./Tooltip";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const githubIssuesUrl =
    "https://github.com/khan-rasul/opentaqwa-chrome/issues";

  return (
    <footer className="w-full bg-gradient-to-r from-slate-600/30 to-slate-700/20 rounded-xl shadow-lg border border-white/10 p-4 sm:p-5 md:p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gold/10 rounded-full -translate-y-10 translate-x-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-plum/10 rounded-full translate-y-8 -translate-x-8 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Two Column Layout - Always 2 columns */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column: Brand */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-2.5">
            <img
              src="icon.png"
              alt="OpenTaqwā Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 drop-shadow-lg flex-shrink-0"
            />
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-quicksand text-white leading-tight">
              Open
              <span className="text-gold-light font-great-vibes">Taqwā</span>
            </h2>
          </div>

          {/* Right Column: Icon Buttons in a Row */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Tooltip content="Report Bug" position="bottom">
              <a
                href={`${githubIssuesUrl}/new?labels=bug`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center  hover:bg-white/20 border border-red-400/20 rounded-full p-2 sm:p-2.5 md:p-3 transition-all duration-300 hover:scale-110"
              >
                <Bug className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-400" />
              </a>
            </Tooltip>

            <Tooltip content="Suggest Feature" position="bottom">
              <a
                href={`${githubIssuesUrl}/new?labels=enhancement`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center  hover:bg-white/20 border border-gold-light/20 rounded-full p-2 sm:p-2.5 md:p-3 transition-all duration-300 hover:scale-110"
              >
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gold-light" />
              </a>
            </Tooltip>

            <Tooltip content="View on GitHub" position="bottom">
              <a
                href="https://github.com/YOUR_USERNAME/opentaqwa" // Update with your GitHub repo
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center  hover:bg-white/20 border border-white/20 rounded-full p-2 sm:p-2.5 md:p-3 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white" />
              </a>
            </Tooltip>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-3 sm:my-4"></div>

        {/* Bottom: Copyright & Version */}
        <div className="flex flex-row items-center justify-between gap-1 sm:gap-2 text-xs text-white/50 font-montserrat">
          <p className="text-center sm:text-left">
            © {currentYear} OpenTaqwā. Licensed under{" "}
            <a
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light hover:text-gold underline"
            >
              CC BY-NC 4.0
            </a>
          </p>
          <p className="text-center sm:text-right text-white/40">v0.0.1</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
