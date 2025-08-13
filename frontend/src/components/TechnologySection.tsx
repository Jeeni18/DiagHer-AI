import React, { useEffect, useState } from 'react';
import { Brain, TrendingUp, Users, Sparkles } from 'lucide-react';

interface TechnologySectionProps {
  scrollY: number;
}

const TechnologySection: React.FC<TechnologySectionProps> = ({ scrollY }) => {
  const baseScroll = scrollY - 2200;

  // Float animation state
  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number;

    const animate = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;

      // Looping sine wave for float effect
      setFloatY(Math.sin(elapsed * 0.002) * 5); // ±5px float

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="technology"
      className="relative py-32 bg-gray-900 overflow-hidden"
    >
      {/* Animated background dots */}
      <div 
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-rose-400 rounded-full opacity-60"
        style={{
          transform: `translate(${Math.sin(baseScroll * 0.005) * 20}px, ${Math.cos(baseScroll * 0.005) * 12}px)`
        }}
      ></div>
      <div 
        className="absolute top-3/4 right-1/3 w-1 h-1 bg-gray-400 rounded-full opacity-40"
        style={{
          transform: `translate(${Math.cos(baseScroll * 0.01) * 16}px, ${Math.sin(baseScroll * 0.01) * 10}px)`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Section */}
          <div 
            className="space-y-8"
            style={{
              transform: `translateY(${baseScroll * 0.05}px)`
            }}
          >
            <div className="inline-flex items-center space-x-2 bg-rose-800/20 text-rose-300 px-4 py-2 rounded-full text-sm font-medium border border-rose-800/30 shadow-lg">
              <Brain className="w-4 h-4" />
              <span>Continuous Learning AI</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-300">
                Learning
              </span>{' '}
              with Every Diagnosis
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed">
              DiagHer evolves with every patient interaction. Doctors feed in confirmed diagnoses 
              and treatment outcomes, making the system smarter, fairer, and more accurate over time.
            </p>

            <div className="space-y-6 pt-4">
              {[
                {
                  icon: TrendingUp,
                  title: 'Adaptive Intelligence',
                  description: 'Machine learning algorithms continuously refine diagnostic accuracy based on real-world outcomes'
                },
                {
                  icon: Users,
                  title: 'Collective Wisdom',
                  description: 'Every healthcare provider contributes to a growing knowledge base of gender-specific medical insights'
                },
                {
                  icon: Sparkles,
                  title: 'Future-Ready',
                  description: 'Advanced neural networks ensure DiagHer stays ahead of emerging medical research and treatments'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <feature.icon className="w-6 h-6 text-rose-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold text-white mb-2 text-lg">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image with Parallax */}
          <div className="relative">
            <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 relative group">
              {/* Static Background Image - first.png */}
              <div
                className="w-full h-[120%] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('src/assets/first.png')`,
                  backgroundPosition: 'center 30%'
                }}
              ></div>

              {/* Scroll Zoom Parallax Layer 1 - second.png */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out pointer-events-none"
                style={{
                  backgroundImage: `url('src/assets/second.png')`,
                  transform: `scale(${Math.max(1, 1.2 - baseScroll * 0.0003)}) translateY(${floatY}px)`,
                  transformOrigin: 'center center',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  opacity: 0.8
                }}
              ></div>
              
              {/* Scroll Zoom Parallax Layer 2 - third.png */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out pointer-events-none"
                style={{
                  backgroundImage: `url('src/assets/third.png')`,
                  transform: `scale(${Math.max(1, 1.3 - baseScroll * 0.0004)}) translateY(${-floatY}px)`,
                  transformOrigin: 'center center',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  opacity: 0.7
                }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            </div>

            {/* Subtle Network Pulse Effects */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-rose-400/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-gray-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
