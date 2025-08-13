import React from 'react';
import { TrendingUp } from 'lucide-react';

interface ImpactSectionProps {
  scrollY: number; // kept for now in case you use it elsewhere
}

const ImpactSection: React.FC<ImpactSectionProps> = () => {
  const stats = [
    { number: '89%', label: 'Diagnostic Accuracy', desc: 'Improved gender-specific diagnosis rates' },
    { number: '67%', label: 'Reduced Misdiagnosis', desc: 'Fewer missed conditions in women' },
    { number: '52%', label: 'Better Outcomes', desc: 'Improved patient treatment success' },
    { number: '10K+', label: 'Lives Improved', desc: 'Patients receiving better care' }
  ];

  return (
    <section id="impact" className="relative py-32 bg-white overflow-hidden">
      {/* Background Element (static) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-800 to-rose-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <TrendingUp className="w-4 h-4" />
            <span>Real Impact</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Transforming{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-600">
              Healthcare
            </span>{' '}
            Outcomes
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how DiagHer is already making a difference in clinics worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 hover:border-rose-200">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-600 mb-2">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Text */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-lg border border-gray-200">
            <blockquote className="text-xl text-gray-700 leading-relaxed mb-6 italic">
              "DiagHer has revolutionized how I approach women's healthcare. The AI catches patterns 
              I might have missed and suggests treatments I wouldn't have considered. My female patients 
              are finally getting the care they deserve."
            </blockquote>
            <div className="font-semibold text-gray-900 text-lg">Dr. Sarah Johnson</div>
            <div className="text-gray-600">Internal Medicine, Boston Medical Center</div>
          </div>

          {/* Testimonial Image */}
          <div className="relative">
            <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800')`,
                  backgroundPosition: 'center 30%'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
