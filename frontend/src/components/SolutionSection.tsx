import React, { useRef } from 'react';
import { Brain, Stethoscope, Target, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SolutionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Medical-themed parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const pulseIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.4]);

  const steps = [
    {
      icon: Stethoscope,
      title: 'Symptom Analysis',
      description: 'Doctor enters patient symptoms into DiagHer\'s intelligent interface. Our AI instantly analyzes patterns through a gender-specific lens.',
      image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'rose-800',
      sample: '"Chest pain, fatigue, nausea..."'
    },
    {
      icon: Target,
      title: 'Smart Diagnosis',
      description: 'DiagHer provides gender-specific disease likelihoods based on current research, highlighting conditions often missed in women.',
      image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'gray-700',
      results: [
        { condition: 'Heart Disease', percentage: '78%', color: 'rose-800' },
        { condition: 'Anxiety', percentage: '23%', color: 'gray-600' }
      ]
    },
    {
      icon: CheckCircle,
      title: 'Safe Treatment',
      description: 'Analyzes prescribed medications for women-specific side effects and suggests safer alternatives with transparent risk analysis.',
      image: 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'emerald-600',
      alert: 'Safer Alternative Found'
    }
  ];

  // Medical pulse animation
  const MedicalPulse = ({ className }: { className?: string }) => (
    <motion.div
      className={`absolute rounded-full border-2 border-rose-300 ${className}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.6, 0.2, 0.6]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  // Heartbeat effect for icons
  const HeartbeatIcon = ({ Icon, className }: { Icon: React.ComponentType<{ className?: string }>; className?: string }) => (
    <motion.div
      animate={{
        scale: [1, 1.1, 1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 1]
      }}
      className={className}
    >
      <Icon className="w-8 h-8 text-white" />
    </motion.div>
  );

  // Medical data stream animation
  const DataStream = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
      className="absolute w-px h-full bg-gradient-to-b from-transparent via-rose-200 to-transparent opacity-30"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{
        duration: 2,
        delay,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="absolute w-2 h-2 bg-rose-400 rounded-full -left-0.5"
        animate={{
          y: ["0%", "100%"],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: delay + 1,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );

  // Floating medical particles
  const MedicalParticles = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-rose-300 rounded-full opacity-40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </>
  );

  // Medical waveform animation
  const MedicalWaveform = ({ className }: { className?: string }) => (
    <motion.div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-rose-400 rounded-full"
          animate={{
            height: [4, 16, 4, 8, 4, 12, 4, 6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );

  return (
    <section ref={sectionRef} id="solution" className="relative py-32 bg-gray-50 overflow-hidden">
      {/* Medical Background Environment */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Animated medical cross */}
        <motion.div
          className="absolute top-20 right-20 w-8 h-8 opacity-10"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-1 bg-rose-400 absolute top-1/2 transform -translate-y-1/2" />
          <div className="w-1 h-full bg-rose-400 absolute left-1/2 transform -translate-x-1/2" />
        </motion.div>

        {/* Pulsing medical background */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-rose-100 rounded-full blur-3xl"
          style={{ opacity: pulseIntensity }}
        />

        {/* Medical particles */}
        <MedicalParticles />

        {/* Data streams */}
        <div className="absolute top-0 left-1/4 h-full">
          <DataStream delay={0} />
        </div>
        <div className="absolute top-0 right-1/4 h-full">
          <DataStream delay={1} />
        </div>

        {/* Medical pulse rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MedicalPulse className="w-32 h-32" />
          <MedicalPulse className="w-48 h-48" />
          <MedicalPulse className="w-64 h-64" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with Medical Branding */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-rose-800 to-rose-900 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 12px 30px rgba(225, 29, 72, 0.4)"
            }}
          >
            {/* Medical pulse inside badge */}
            <motion.div
              className="absolute inset-0 bg-white opacity-10 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <HeartbeatIcon Icon={Brain} />
            <span>Intelligent Medical Solution</span>
            <MedicalWaveform className="ml-2" />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            How{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-600 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            >
              DiagHer
              <motion.div
                className="absolute -top-2 -right-2 w-2 h-2 bg-rose-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>{' '}
            Works
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Our AI-powered system provides gender-specific medical insights at every step of the diagnostic journey
          </motion.p>
        </motion.div>

        {/* Medical Process Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white rounded-3xl p-8 h-full shadow-sm border border-gray-100 relative overflow-hidden"
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
                  borderColor: "rgb(229 231 235)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25
                }}
              >
                {/* Medical icon with heartbeat */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm relative ${
                    step.color === 'rose-800' ? 'bg-rose-800' : 
                    step.color === 'gray-700' ? 'bg-gray-700' : 
                    'bg-emerald-600'
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    rotate: [0, -2, 2, 0],
                    scale: 1.1,
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  <HeartbeatIcon Icon={step.icon} />
                </motion.div>

                {/* Medical indicator */}
                <div className="absolute top-6 right-6">
                  <motion.div
                    className="w-3 h-3 bg-emerald-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  />
                </div>

                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>

                <motion.p 
                  className="text-gray-600 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>

                {/* Medical image */}
                <motion.div 
                  className="w-full h-48 rounded-xl overflow-hidden border border-gray-100 mb-4 bg-gray-50 relative"
                  initial={{ opacity: 0, scale: 1.02 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${step.image}')`,
                      backgroundPosition: 'center 40%'
                    }}
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </motion.div>

                {/* Medical content */}
                {step.sample && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative overflow-hidden">
                    <div className="text-sm text-gray-500 mb-2 flex items-center">
                      <motion.div
                        className="w-2 h-2 bg-rose-400 rounded-full mr-2"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      Medical Input:
                    </div>
                    <div className="text-gray-800 italic font-medium">{step.sample}</div>
                  </div>
                )}

                {step.results && (
                  <div className="space-y-2">
                    {step.results.map((result, idx) => (
                      <div 
                        key={idx} 
                        className="flex justify-between items-center bg-gray-50 rounded-lg p-3 border border-gray-100 relative overflow-hidden"
                      >
                        <span className="text-sm text-gray-700 font-medium flex items-center">
                          <motion.div
                            className="w-1.5 h-1.5 bg-rose-400 rounded-full mr-2"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: idx * 0.2
                            }}
                          />
                          {result.condition}
                        </span>
                        <span className={`text-sm font-semibold ${
                          result.color === 'rose-800' ? 'text-rose-800' : 'text-gray-600'
                        }`}>
                          {result.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {step.alert && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 relative overflow-hidden">
                    <div className="flex items-center space-x-2 text-emerald-600 mb-2">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm font-medium">{step.alert}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Adjusted dosage for optimal female metabolism
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Medical connection pathway */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-rose-200 via-rose-300 to-transparent origin-left"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.3 + 1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute w-1 h-1 bg-rose-400 rounded-full -top-0.5 left-0"
                    animate={{
                      x: [0, 48],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5 + 2
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;