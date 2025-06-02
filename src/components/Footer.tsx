
import { Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              AccessibilityHub
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md text-sm sm:text-base">
              Empowering digital inclusion through cutting-edge AI technology. 
              Making the web accessible for everyone, one transformation at a time.
            </p>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm sm:text-base">Professional Accessibility Solutions</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#features" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#api" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#enterprise" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  Enterprise
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4">Support & Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#support" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#accessibility" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a href="#status" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base">
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm sm:text-base">sumanthchary.startup@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm sm:text-base">+91 8125228079</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm sm:text-base">Hyderabad, India</span>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
            
            <div className="text-slate-400 text-xs sm:text-sm text-center md:text-right">
              <p>© 2025 AccessibilityHub. All rights reserved.</p>
              <p className="mt-1">Professional digital accessibility solutions for enterprises worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
