import React from 'react';
import { Stethoscope } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'API', 'Integrations']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Research', 'Blog', 'Support']
    },
    {
      title: 'Company',
      links: ['About', 'Careers', 'Privacy', 'Terms']
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-800 to-rose-900 rounded-lg flex items-center justify-center shadow-lg">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DiagHer</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered gender-aware healthcare decision support system. 
              Transforming women's health outcomes worldwide.
            </p>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-rose-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2025 DiagHer. All rights reserved. Revolutionizing healthcare for women.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
