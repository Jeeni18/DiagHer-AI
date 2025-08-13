import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Heart,
  LogOut,
  Stethoscope,
  FileText,
  Brain,
  Clock,
  AlertCircle,
  CheckCircle,
  Settings,
  Bell
} from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { icon: <Users className="h-8 w-8" />, label: 'Total Patients', value: '247', color: 'bg-blue-500', change: '+12 this week' },
    { icon: <Activity className="h-8 w-8" />, label: 'Diagnoses Today', value: '12', color: 'bg-green-500', change: '+3 from yesterday' },
    { icon: <TrendingUp className="h-8 w-8" />, label: 'AI Accuracy', value: '94.2%', color: 'bg-purple-500', change: '+2.1% this month' },
    { icon: <AlertCircle className="h-8 w-8" />, label: 'Pending Feedback', value: '8', color: 'bg-yellow-500', change: 'Need confirmation' }
  ];

  const quickActions = [
    {
      icon: <Brain className="h-12 w-12" />,
      title: 'Clinical Decision',
      description: 'Complete consultation workflow with AI support',
      action: () => navigate('/clinical-decision'),
      color: 'from-rose-500 to-rose-600'
    },
    {
      icon: <FileText className="h-12 w-12" />,
      title: 'Patient Records',
      description: 'View and manage patient records',
      action: () => navigate('/patients'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Settings className="h-12 w-12" />,
      title: 'Insights & Settings',
      description: 'View analytics and configure preferences',
      action: () => navigate('/insights'),
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-rose-600" />
              <h1 className="text-2xl font-bold text-gray-900">DiagHer Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[1] || 'Doctor'}!
          </h2>
          <p className="text-gray-600">
            Here's your medical practice overview for today. Last model update: 2 hours ago.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2, boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-left hover:shadow-md transition-all group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`bg-gradient-to-r ${action.color} text-white p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h4>
                <p className="text-gray-600">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { patient: 'Sarah M.', condition: 'Endometriosis', confidence: '92%', time: '2 hours ago', status: 'confirmed' },
                { patient: 'Maria L.', condition: 'PCOS', confidence: '88%', time: '4 hours ago', status: 'pending' },
                { patient: 'Jennifer K.', condition: 'Fibromyalgia', confidence: '85%', time: '6 hours ago', status: 'confirmed' }
              ].map((diagnosis, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-rose-100 p-2 rounded-full">
                      <Activity className="h-5 w-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{diagnosis.patient}</p>
                      <p className="text-sm text-gray-600">{diagnosis.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-green-600">{diagnosis.confidence}</p>
                      {diagnosis.status === 'confirmed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{diagnosis.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;