import { Heart, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              AccessibilityHub
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              Empowering digital inclusion through cutting-edge AI technology. 
              Making the web accessible for everyone, one transformation at a time.
            </p>
            <div className="flex items-center gap-2 text-slate-300 mb-4">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Built with love for everyone</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Hackathon 2025 Winner</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#api" className="text-slate-300 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#enterprise" className="text-slate-300 hover:text-white transition-colors">
                  Enterprise
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support & Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#support" className="text-slate-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#accessibility" className="text-slate-300 hover:text-white transition-colors">
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a href="#status" className="text-slate-300 hover:text-white transition-colors">
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300">sumanthchary.startup@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300">+1 (555) 123-ACCESS</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300">San Francisco, CA</span>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
            
            <div className="text-slate-400 text-sm text-center md:text-right">
              <p>© 2025 AccessibilityHub. All rights reserved.</p>
              <p className="mt-1">Making digital inclusion a reality for 1.3 billion people worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};