import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  TrendingUp, 
  Heart, 
  Droplets, 
  Moon, 
  Sun, 
  ArrowLeft,
  Activity,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface CycleData {
  date: string;
  day: number;
  phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  symptoms: string[];
  flow: 'light' | 'medium' | 'heavy' | 'none';
  mood: number;
  pain: number;
  energy: number;
  sleep: number;
}

interface PeriodPrediction {
  nextPeriod: string;
  ovulation: string;
  cycleLength: number;
  confidence: number;
  fertileWindow: { start: string; end: string };
}


const MenstrualTracker = () => {
  const navigate = useNavigate();
  const [cycleData, setCycleData] = useState<CycleData[]>([]);
  const [prediction, setPrediction] = useState<PeriodPrediction | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<'calendar' | 'analytics' | 'insights'>('calendar');

  const generateMockData = () => {
    const data: CycleData[] = [];
    const today = new Date();
    
    for (let i = 90; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayOfCycle = (90 - i) % 28 + 1;
      let phase: CycleData['phase'] = 'follicular';
      let flow: CycleData['flow'] = 'none';
      
      if (dayOfCycle >= 1 && dayOfCycle <= 5) {
        phase = 'menstrual';
        flow = dayOfCycle === 1 ? 'heavy' : dayOfCycle === 2 ? 'heavy' : dayOfCycle === 3 ? 'medium' : 'light';
      } else if (dayOfCycle >= 6 && dayOfCycle <= 13) {
        phase = 'follicular';
      } else if (dayOfCycle >= 14 && dayOfCycle <= 16) {
        phase = 'ovulation';
      } else {
        phase = 'luteal';
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        day: dayOfCycle,
        phase,
        symptoms: phase === 'menstrual' ? ['cramping', 'fatigue'] : 
                 phase === 'ovulation' ? ['increased_energy', 'breast_tenderness'] : [],
        flow,
        mood: Math.floor(Math.random() * 10) + 1,
        pain: flow !== 'none' ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 3) + 1,
        energy: phase === 'ovulation' ? Math.floor(Math.random() * 3) + 8 : Math.floor(Math.random() * 10) + 1,
        sleep: Math.floor(Math.random() * 10) + 1
      });
    }
    
    return data;
  };

  const fetchPeriodData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData = generateMockData();
      setCycleData(mockData);
      
      const mockPrediction: PeriodPrediction = {
        nextPeriod: '2025-01-15',
        ovulation: '2025-01-22',
        cycleLength: 28,
        confidence: 85,
        fertileWindow: { start: '2025-01-20', end: '2025-01-24' }
      };
      setPrediction(mockPrediction);
    } catch (error) {
      console.error('Failed to fetch period data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeriodData();
  }, []);

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'menstrual': return '#dc2626';
      case 'follicular': return '#2563eb';
      case 'ovulation': return '#16a34a';
      case 'luteal': return '#ca8a04';
      default: return '#6b7280';
    }
  };

  const getPhaseGradient = (phase: string) => {
    switch (phase) {
      case 'menstrual': return 'from-red-500 to-rose-600';
      case 'follicular': return 'from-blue-500 to-indigo-600';
      case 'ovulation': return 'from-green-500 to-emerald-600';
      case 'luteal': return 'from-yellow-500 to-amber-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getFlowIcon = (flow: string) => {
    switch (flow) {
      case 'heavy': return '🔴';
      case 'medium': return '🟠';
      case 'light': return '🟡';
      default: return '⚪';
    }
  };

  const chartData = cycleData.slice(-30).map(day => ({
    date: new Date(day.date).getDate(),
    mood: day.mood,
    pain: day.pain,
    energy: day.energy,
    sleep: day.sleep,
    phase: day.phase
  }));

  const phaseData = [
    { phase: 'Menstrual', days: 5, color: '#dc2626', percentage: 18 },
    { phase: 'Follicular', days: 8, color: '#2563eb', percentage: 29 },
    { phase: 'Ovulation', days: 3, color: '#16a34a', percentage: 11 },
    { phase: 'Luteal', days: 12, color: '#ca8a04', percentage: 42 }
  ];

  const symptomTrends = [
    { symptom: 'Cramping', frequency: 65, trend: 'down', color: 'bg-red-500' },
    { symptom: 'Fatigue', frequency: 45, trend: 'stable', color: 'bg-orange-500' },
    { symptom: 'Mood Changes', frequency: 38, trend: 'up', color: 'bg-yellow-500' },
    { symptom: 'Bloating', frequency: 52, trend: 'down', color: 'bg-purple-500' },
    { symptom: 'Headaches', frequency: 28, trend: 'stable', color: 'bg-pink-500' },
    { symptom: 'Breast Tenderness', frequency: 41, trend: 'up', color: 'bg-indigo-500' }
  ];

  const views = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'insights', label: 'Insights', icon: Target }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Syncing Your Data</h3>
          <p className="text-gray-600">Analyzing your menstrual cycle patterns...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Menstrual Tracker</h1>
                <p className="text-sm text-gray-600">Track your cycle & wellness</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Selector */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50">
            <div className="flex space-x-2">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeView === view.id
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  <view.icon className="h-4 w-4" />
                  <span>{view.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Predictions Card */}
        {prediction && (
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Cycle Predictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 rounded-xl text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Droplets className="h-6 w-6" />
                  <span className="font-medium">Next Period</span>
                </div>
                <p className="text-2xl font-bold mb-1">{new Date(prediction.nextPeriod).toLocaleDateString()}</p>
                <p className="text-rose-100">In {Math.ceil((new Date(prediction.nextPeriod).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Sun className="h-6 w-6" />
                  <span className="font-medium">Ovulation</span>
                </div>
                <p className="text-2xl font-bold mb-1">{new Date(prediction.ovulation).toLocaleDateString()}</p>
                <p className="text-green-100">Fertile window</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="h-6 w-6" />
                  <span className="font-medium">Cycle Length</span>
                </div>
                <p className="text-2xl font-bold mb-1">{prediction.cycleLength} days</p>
                <p className="text-blue-100">{prediction.confidence}% confidence</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-purple-500 to-violet-600 p-6 rounded-xl text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Activity className="h-6 w-6" />
                  <span className="font-medium">Current Phase</span>
                </div>
                <p className="text-2xl font-bold mb-1">Luteal</p>
                <p className="text-purple-100">Day 21 of cycle</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Calendar View */}
          {activeView === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Cycle Calendar */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cycle Calendar</h3>
                <div className="grid grid-cols-7 gap-3 mb-6">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 p-3">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-3">
                  {cycleData.slice(-28).map((day, index) => (
                    <motion.div
                      key={day.date}
                      className={`aspect-square p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedDate === day.date ? 'ring-2 ring-rose-500 shadow-lg' : 'hover:shadow-md'
                      }`}
                      style={{ 
                        background: `linear-gradient(135deg, ${getPhaseColor(day.phase)}20, ${getPhaseColor(day.phase)}10)`,
                        borderLeft: `4px solid ${getPhaseColor(day.phase)}`
                      }}
                      onClick={() => setSelectedDate(day.date)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                    >
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-900 mb-1">
                          {new Date(day.date).getDate()}
                        </div>
                        <div className="text-xs mb-1">
                          {getFlowIcon(day.flow)}
                        </div>
                        <div className="text-xs text-gray-600 capitalize">
                          {day.phase.slice(0, 3)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  {phaseData.map((phase) => (
                    <div key={phase.phase} className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: phase.color }}
                      />
                      <span className="text-gray-700">{phase.phase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics View */}
          {activeView === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mood & Pain Tracking */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Wellness Tracking</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis domain={[0, 10]} stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none', 
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area type="monotone" dataKey="mood" stroke="#16a34a" fill="#16a34a" fillOpacity={0.3} name="Mood" />
                      <Area type="monotone" dataKey="energy" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Energy" />
                      <Area type="monotone" dataKey="pain" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} name="Pain" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Cycle Phases Distribution */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Cycle Phase Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={phaseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="percentage"
                      >
                        {phaseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Duration']}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none', 
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sleep Quality Chart */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Sleep Quality Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis domain={[0, 10]} stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      name="Sleep Quality" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Insights View */}
          {activeView === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Symptom Trends */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Symptom Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {symptomTrends.map((item, index) => (
                    <motion.div
                      key={item.symptom}
                      className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-900">{item.symptom}</span>
                        <div className="flex items-center space-x-1">
                          {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
                          {item.trend === 'down' && <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />}
                          {item.trend === 'stable' && <Activity className="h-4 w-4 text-blue-500" />}
                          <span className={`text-sm font-medium ${
                            item.trend === 'up' ? 'text-red-600' :
                            item.trend === 'down' ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {item.frequency}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <motion.div
                          className={`h-3 rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.frequency}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        {item.trend === 'up' ? 'Increasing trend' :
                         item.trend === 'down' ? 'Decreasing trend' : 'Stable pattern'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">AI-Powered Insights</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Cycle Regularity Improving",
                      description: "Your cycle has become 15% more regular over the past 3 months.",
                      type: "positive",
                      confidence: 92
                    },
                    {
                      title: "Pain Pattern Detected",
                      description: "Pain levels tend to spike 2 days before your period starts.",
                      type: "insight",
                      confidence: 87
                    },
                    {
                      title: "Sleep Quality Correlation",
                      description: "Better sleep quality correlates with reduced PMS symptoms.",
                      type: "recommendation",
                      confidence: 78
                    }
                  ].map((insight, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl border-l-4 ${
                        insight.type === 'positive' ? 'bg-green-50 border-green-500' :
                        insight.type === 'insight' ? 'bg-blue-50 border-blue-500' :
                        'bg-purple-50 border-purple-500'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <span className="text-sm font-medium text-gray-600">{insight.confidence}%</span>
                      </div>
                      <p className="text-gray-700 text-sm">{insight.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenstrualTracker;