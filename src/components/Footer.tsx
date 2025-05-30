
export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-600">
            <p className="font-medium">
              Built with ❤️ for everyone | <span className="text-blue-600">Hackathon 2025</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#support" 
              className="text-slate-600 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm px-1 py-1"
              aria-label="Get support"
            >
              Support
            </a>
            <a 
              href="#privacy" 
              className="text-slate-600 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm px-1 py-1"
              aria-label="Read privacy policy"
            >
              Privacy
            </a>
            <a 
              href="#accessibility" 
              className="text-slate-600 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm px-1 py-1"
              aria-label="View accessibility statement"
            >
              Accessibility Statement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
