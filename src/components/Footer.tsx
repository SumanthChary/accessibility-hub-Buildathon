
import { Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              AccessibilityHub
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm lg:text-base max-w-md">
              Empowering digital inclusion through cutting-edge AI technology. 
              Making the web accessible for everyone, one transformation at a time.
            </p>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
              <span className="text-sm lg:text-base">Professional Accessibility Solutions</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 lg:space-y-4">
            <h4 className="font-semibold text-sm sm:text-base lg:text-lg">Quick Links</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#features" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#api" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#enterprise" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  Enterprise
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-3 lg:space-y-4">
            <h4 className="font-semibold text-sm sm:text-base lg:text-lg">Support & Legal</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a href="#support" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#accessibility" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a href="#status" className="text-slate-300 hover:text-white transition-colors text-sm lg:text-base block">
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-700 mt-6 sm:mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400 flex-shrink-0" />
              <span className="text-slate-300 text-xs sm:text-sm lg:text-base break-all">
                sumanthchary.startup@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400 flex-shrink-0" />
              <span className="text-slate-300 text-xs sm:text-sm lg:text-base">
                +91 8125228079
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400 flex-shrink-0" />
              <span className="text-slate-300 text-xs sm:text-sm lg:text-base">
                Hyderabad, India
              </span>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0">
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors flex-shrink-0">
                <Github className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </a>
            </div>
            
            <div className="text-slate-400 text-xs sm:text-sm lg:text-base">
              <p className="mb-1">© 2025 AccessibilityHub. All rights reserved.</p>
              <p className="text-xs lg:text-sm">
                Professional digital accessibility solutions for enterprises worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
