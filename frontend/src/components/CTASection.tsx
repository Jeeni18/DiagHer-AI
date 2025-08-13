import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CTASectionProps {
  scrollY: number;
}

const CTASection: React.FC<CTASectionProps> = ({ scrollY }) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 bg-gradient-to-br from-rose-900 via-rose-800 to-gray-900 overflow-hidden">
      {/* Enhanced CTA Background Frame */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('')`,
            transform: `translateY(${(scrollY - 3600) * 0.3}px)`,
            backgroundPosition: 'center 40%'
          }}
        ></div>
      </div>
      
      {/* Medical Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 15v20h-5V15h5zm-10 0v5h-5v-5h5zm20 0v5h-5v-5h5zm-20 10v5h-5v-5h5zm20 0v5h-5v-5h5zM35 50h30v5H35v-5zm0-10h5v5h-5v-5zm25 0h5v5h-5v-5zm0 10h5v5h-5v-5zm-25 0h5v5h-5v-5zm10 15v20h-5V65h5zm10 0v20h-5V65h5zm-5-15v5h-5v-5h5z'/%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translateY(${(scrollY - 3600) * 0.1}px)`
        }}
      ></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div 
          className="space-y-8"
          style={{
            transform: `translateY(${(scrollY - 3600) * 0.15}px)`
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Ready to Transform{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-100">
              Your Practice?
            </span>
          </h2>
          
          <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Join the healthcare revolution. Give your female patients the gender-aware care 
            they deserve with DiagHer's AI-powered insights.
          </p>
          
          <div className="flex justify-center pt-8">
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-rose-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/25 flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="pt-8 text-rose-200">
            <p className="text-sm">✓ 30-day free trial • ✓ No setup fees • ✓ Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
