import { Link } from 'react-router-dom';
import { FileText, Share2, Link2, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <FileText size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-[15px]">
                ATS<span className="text-emerald-400">Pro</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Helping professionals land interviews with smarter resume optimization and structured interview preparation.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Share2 size={15} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Link2 size={15} />
              </a>
              <a href="#" aria-label="Email" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Mail size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/analyzer" className="hover:text-white transition-colors">ATS Analyzer</Link></li>
              <li><Link to="/interview" className="hover:text-white transition-colors">Interview Prep</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Resume Tips</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Career Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex items-center justify-center">
          <p className="text-sm text-slate-500">© 2025 ATSPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
