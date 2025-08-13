import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

interface ProblemSectionProps {
  scrollY: number;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ scrollY }) => {
  const sectionOffset = Math.max(0, scrollY - 600);
  
  // Calculate zoom based on scroll position
  // Start very small (0.3) and grow to normal size (1.1) as user scrolls
  const scrollProgress = Math.min(1, Math.max(0, (scrollY - 300) / 800));
  const zoomScale = 0.3 + (scrollProgress * 0.8); // 0.3 to 1.1

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Background Blur Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div
            className="space-y-8"
            style={{
              transform: `translateY(${sectionOffset * 0.1}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 text-sm font-medium shadow-lg">
              <AlertTriangle className="w-4 h-4" />
              <span>Critical Healthcare Gap</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Women's Health
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-600">
                <Typewriter
                  words={['Overlooked', 'Ignored', 'Neglected', 'Dismissed', 'Undervalued']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={40}
                  delaySpeed={1000}
                />
              </span>{' '}
              for Too Long
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Medical research has historically excluded women, leading to misdiagnoses,
              inappropriate treatments, and preventable complications. It's time for change.
            </p>

            <div className="space-y-6 pt-4">
              {[
                {
                  stat: '80%',
                  title: 'Misdiagnosis Rate',
                  desc: 'Women are 80% more likely to be misdiagnosed during heart attacks',
                },
                {
                  stat: '2x',
                  title: 'Drug Reactions',
                  desc: 'Women experience twice as many adverse drug reactions',
                },
                {
                  stat: '75%',
                  title: 'Research Gap',
                  desc: '75% of medical research excludes female subjects',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-rose-800 font-bold text-lg">{item.stat}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Frame with Smart Animations */}
          <div className="relative">
            {/* Main Image Container with Scroll-based Zoom */}
            <div 
              className="relative w-full h-96 overflow-hidden shadow-lg border border-white/20 group rounded-3xl"
              style={{
                transform: `scale(${0.8 + scrollProgress * 0.2})`, // Container also scales slightly
                transition: 'transform 0.3s ease-out',
                backgroundColor: 'white',
              }}
            >
              {/* Image with Smart Animations and Scroll Zoom */}
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-300 ease-out group-hover:scale-105 group-hover:brightness-110"
                style={{
                  backgroundImage: `url('src/assets/problem.jpg')`,
                  transform: `scale(${zoomScale}) translateY(${sectionOffset * 0.15}px)`,
                  backgroundPosition: 'center',
                  transformOrigin: 'center center',
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.1) saturate(0.9)',
                }}
              >
                {/* Subtle Floating Elements */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full animate-float opacity-50"></div>
                <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-float-slow opacity-40"></div>
              </div>
              
              {/* Simple Overlay for Better Integration */}
              <div className="absolute inset-0 bg-white/10 mix-blend-soft-light pointer-events-none"></div>
            </div>

            {/* Floating Stat Card */}
            <div
              className="absolute -bottom-8 -right-8 bg-white p-6 shadow-2xl border border-transparent backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                transform: `translateY(${sectionOffset * 0.1}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div className="text-center">
                {/* <div className="text-3xl font-bold text-rose-800 hover:scale-110 transition-transform duration-300">67%</div>
                <div className="text-sm text-gray-600 font-medium">Pain Dismissed</div> */}
              </div>
            </div>

            {/* Smart Pulse Animation */}
            <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full border-2 border-rose-300/40 animate-ping opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Orbiting Dot Animation */}
            <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="absolute w-2 h-2 bg-rose-400 rounded-full animate-orbit opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;