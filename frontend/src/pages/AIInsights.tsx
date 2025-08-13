import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Eye, 
  ArrowLeft,
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ComposedChart
} from 'recharts';


interface SymptomEvolution {
  date: string;
  severity: number;
  frequency: number;
  duration: number;
  impact: number;
}

interface AIInsight {
  id: string;
  type: 'trend' | 'pattern' | 'recommendation' | 'alert' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  date: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

interface PatientProgress {
  metric: string;
  current: number;
  previous: number;
  change: number;
  trend: 'improving' | 'stable' | 'concerning';
  target: number;
}

interface RiskAssessment {
  condition: string;
  risk: number;
  factors: string[];
  recommendations: string[];
}




const AIInsights = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [symptomData, setSymptomData] = useState<SymptomEvolution[]>([]);
  const [progress, setProgress] = useState<PatientProgress[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [activeView, setActiveView] = useState<'overview' | 'trends' | 'predictions' | 'risks'>('overview');

  const generateMockData = () => {
    const mockSymptomData: SymptomEvolution[] = [];
    const today = new Date();
    for (let i = 90; i >= 0; i -= 3) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      mockSymptomData.push({
        date: date.toISOString().split('T')[0],
        severity: Math.max(1, 8 - (i / 10) + Math.random() * 2),
        frequency: Math.max(1, 7 - (i / 12) + Math.random() * 1.5),
        duration: Math.max(1, 6 - (i / 15) + Math.random() * 1),
        impact: Math.max(1, 7 - (i / 8) + Math.random() * 1.8)
      });
    }

    const mockInsights: AIInsight[] = [
      {
        id: '1',
        type: 'trend',
        title: 'Symptom Severity Decreasing',
        description: '35% reduction in symptom severity over 3 months. Treatment effectiveness confirmed.',
        confidence: 92,
        date: '2025-01-07',
        priority: 'high',
        actionable: false
      },
      {
        id: '2',
        type: 'pattern',
        title: 'Cyclical Pattern Detected',
        description: 'Symptoms recur every 28 days with 87% consistency. Strong hormonal correlation identified.',
        confidence: 87,
        date: '2025-01-06',
        priority: 'medium',
        actionable: true
      },
      {
        id: '3',
        type: 'prediction',
        title: 'Flare-up Risk Elevated',
        description: 'AI models predict 73% chance of symptom flare-up in next 7-10 days based on historical patterns.',
        confidence: 73,
        date: '2025-01-07',
        priority: 'high',
        actionable: true
      },
      {
        id: '4',
        type: 'recommendation',
        title: 'Lifestyle Intervention Suggested',
        description: 'Stress management techniques could reduce symptom severity by estimated 25-30%.',
        confidence: 81,
        date: '2025-01-05',
        priority: 'medium',
        actionable: true
      }
    ];

    const mockProgress: PatientProgress[] = [
      {
        metric: 'Symptom Severity',
        current: 4.2,
        previous: 6.8,
        change: -38,
        trend: 'improving',
        target: 3.0
      },
      {
        metric: 'Quality of Life',
        current: 7.3,
        previous: 5.1,
        change: 43,
        trend: 'improving',
        target: 8.0
      },
      {
        metric: 'Pain Frequency',
        current: 3.1,
        previous: 5.4,
        change: -43,
        trend: 'improving',
        target: 2.0
      },
      {
        metric: 'Sleep Quality',
        current: 6.8,
        previous: 6.2,
        change: 10,
        trend: 'improving',
        target: 8.0
      }
    ];

    const mockRiskAssessments: RiskAssessment[] = [
      {
        condition: 'Endometriosis Progression',
        risk: 23,
        factors: ['Family history', 'Current symptoms', 'Age factor'],
        recommendations: ['Regular monitoring', 'Hormonal therapy optimization', 'Lifestyle modifications']
      },
      {
        condition: 'Chronic Pain Syndrome',
        risk: 15,
        factors: ['Pain duration', 'Treatment response'],
        recommendations: ['Pain management program', 'Physical therapy', 'Stress reduction']
      },
      {
        condition: 'Fertility Impact',
        risk: 31,
        factors: ['Endometrial involvement', 'Ovarian function'],
        recommendations: ['Fertility consultation', 'Reproductive planning', 'Treatment timing optimization']
      }
    ];

    return { mockSymptomData, mockInsights, mockProgress, mockRiskAssessments };
  };

  const fetchAIInsights = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const { mockSymptomData, mockInsights, mockProgress, mockRiskAssessments } = generateMockData();
      setSymptomData(mockSymptomData);
      setInsights(mockInsights);
      setProgress(mockProgress);
      setRiskAssessments(mockRiskAssessments);
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIInsights();
  }, [patientId, selectedTimeframe]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-5 w-5" />;
      case 'pattern': return <Brain className="h-5 w-5" />;
      case 'recommendation': return <CheckCircle className="h-5 w-5" />;
      case 'alert': return <AlertCircle className="h-5 w-5" />;
      case 'prediction': return <Zap className="h-5 w-5" />;
      default: return <Eye className="h-5 w-5" />;
    }
  };

  const getInsightColor = (type: string, priority: string) => {
    if (priority === 'high') return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800';
    if (priority === 'medium') return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 text-yellow-800';
    return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800';
  };

  const getProgressColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      case 'concerning': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '↗️';
      case 'stable': return '→';
      case 'concerning': return '↘️';
      default: return '•';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 30) return 'from-red-500 to-rose-600';
    if (risk >= 20) return 'from-yellow-500 to-amber-600';
    return 'from-green-500 to-emerald-600';
  };

  const views = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'trends', label: 'Trends', icon: LineChart },
    { id: 'predictions', label: 'Predictions', icon: Zap },
    { id: 'risks', label: 'Risk Assessment', icon: Target }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Patient Data</h3>
          <p className="text-gray-600">AI is processing medical patterns and generating insights...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
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
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI Insights</h1>
                <p className="text-sm text-gray-600">Advanced medical analytics</p>
              </div>
            </div>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
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
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
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

        <AnimatePresence mode="wait">
          {/* Overview */}
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Progress Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {progress.map((metric, index) => (
                  <motion.div
                    key={metric.metric}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">{metric.metric}</span>
                      <span className={`text-sm ${getProgressColor(metric.trend)}`}>
                        {getProgressIcon(metric.trend)}
                      </span>
                    </div>
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{metric.current}</span>
                      <span className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change >= 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(metric.current / metric.target) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Target: {metric.target} • vs. previous period</p>
                  </motion.div>
                ))}
              </div>

              {/* AI Insights */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">AI-Generated Insights</h3>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      className={`rounded-xl p-6 border ${getInsightColor(insight.type, insight.priority)}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getInsightIcon(insight.type)}
                          <div>
                            <span className="font-bold text-lg">{insight.title}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs px-2 py-1 rounded-full bg-white/50 font-medium">
                                {insight.type.toUpperCase()}
                              </span>
                              {insight.actionable && (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                                  ACTIONABLE
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">{insight.confidence}%</span>
                          <p className="text-xs text-gray-500">{new Date(insight.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">{insight.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Trends */}
          {activeView === 'trends' && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Symptom Evolution Chart */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Symptom Evolution Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={symptomData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString()} 
                      stroke="#6b7280"
                    />
                    <YAxis domain={[0, 10]} stroke="#6b7280" />
                    <Tooltip
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      formatter={(value, name) => [`${value}/10`, name]}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area type="monotone" dataKey="severity" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} name="Severity" />
                    <Area type="monotone" dataKey="frequency" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} name="Frequency" />
                    <Line type="monotone" dataKey="impact" stroke="#8b5cf6" strokeWidth={3} name="Life Impact" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Correlation Analysis */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Symptom Correlation Matrix</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={[
                    { symptom: 'Pelvic Pain', correlation: 0.85, impact: 'High' },
                    { symptom: 'Fatigue', correlation: 0.72, impact: 'Medium' },
                    { symptom: 'Heavy Periods', correlation: 0.68, impact: 'High' },
                    { symptom: 'Mood Changes', correlation: 0.54, impact: 'Medium' },
                    { symptom: 'Bloating', correlation: 0.49, impact: 'Low' },
                    { symptom: 'Sleep Issues', correlation: 0.61, impact: 'Medium' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="symptom" stroke="#6b7280" />
                    <YAxis domain={[0, 1]} stroke="#6b7280" />
                    <Tooltip 
                      formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Correlation']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="correlation" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Predictions */}
          {activeView === 'predictions' && (
            <motion.div
              key="predictions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Prediction Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Next Flare-up Prediction",
                    prediction: "7-10 days",
                    confidence: 73,
                    type: "warning",
                    details: "Based on cyclical patterns and current symptoms"
                  },
                  {
                    title: "Treatment Response",
                    prediction: "Positive",
                    confidence: 89,
                    type: "success",
                    details: "Current therapy showing strong efficacy indicators"
                  },
                  {
                    title: "Quality of Life Trend",
                    prediction: "Improving",
                    confidence: 82,
                    type: "success",
                    details: "Projected 25% improvement over next 3 months"
                  },
                  {
                    title: "Medication Adjustment",
                    prediction: "Recommended",
                    confidence: 67,
                    type: "info",
                    details: "Dosage optimization could enhance outcomes"
                  }
                ].map((pred, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-2xl shadow-lg border ${
                      pred.type === 'warning' ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' :
                      pred.type === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
                      'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{pred.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-purple-600" />
                        <span className="font-bold text-purple-600">{pred.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{pred.prediction}</p>
                    <p className="text-sm text-gray-600">{pred.details}</p>
                  </motion.div>
                ))}
              </div>

              {/* Predictive Model Accuracy */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">AI Model Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={[
                    { subject: 'Symptom Prediction', A: 89, fullMark: 100 },
                    { subject: 'Treatment Response', A: 92, fullMark: 100 },
                    { subject: 'Risk Assessment', A: 78, fullMark: 100 },
                    { subject: 'Pattern Recognition', A: 95, fullMark: 100 },
                    { subject: 'Outcome Forecasting', A: 83, fullMark: 100 },
                    { subject: 'Correlation Analysis', A: 87, fullMark: 100 }
                  ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Accuracy" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Risk Assessment */}
          {activeView === 'risks' && (
            <motion.div
              key="risks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Risk Assessment Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {riskAssessments.map((risk, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{risk.condition}</h4>
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Risk Level</span>
                        <span className="text-lg font-bold text-gray-900">{risk.risk}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full bg-gradient-to-r ${getRiskColor(risk.risk)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${risk.risk}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Risk Factors</h5>
                      <div className="space-y-1">
                        {risk.factors.map((factor, factorIndex) => (
                          <div key={factorIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-sm text-gray-700">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Recommendations</h5>
                      <div className="space-y-1">
                        {risk.recommendations.map((rec, recIndex) => (
                          <div key={recIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Risk Trend Analysis */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Risk Trend Analysis</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={[
                    { month: 'Jan', endometriosis: 28, chronicPain: 18, fertility: 35 },
                    { month: 'Feb', endometriosis: 26, chronicPain: 16, fertility: 33 },
                    { month: 'Mar', endometriosis: 24, chronicPain: 15, fertility: 31 },
                    { month: 'Apr', endometriosis: 23, chronicPain: 15, fertility: 31 },
                    { month: 'May', endometriosis: 23, chronicPain: 15, fertility: 31 },
                    { month: 'Jun', endometriosis: 23, chronicPain: 15, fertility: 31 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Risk Level']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area type="monotone" dataKey="endometriosis" stackId="1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} name="Endometriosis" />
                    <Area type="monotone" dataKey="chronicPain" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Chronic Pain" />
                    <Area type="monotone" dataKey="fertility" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Fertility Impact" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIInsights;