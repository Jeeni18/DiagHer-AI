import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pill, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Search,
  Plus,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface Drug {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
}

interface RiskData {
  category: string;
  risk: number;
  color: string;
}

const DrugChecker = () => {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [newDrug, setNewDrug] = useState({ name: '', dosage: '', frequency: '' });
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock drug database
  const drugDatabase = [
    'Ibuprofen', 'Acetaminophen', 'Aspirin', 'Metformin', 'Lisinopril',
    'Atorvastatin', 'Omeprazole', 'Sertraline', 'Warfarin', 'Prednisone',
    'Estrogen', 'Progesterone', 'Clomiphene', 'Methotrexate', 'Folic Acid'
  ];

  const filteredDrugs = drugDatabase.filter(drug => 
    drug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const riskData: RiskData[] = [
    { category: 'Cardiovascular', risk: 25, color: '#ef4444' },
    { category: 'Gastrointestinal', risk: 15, color: '#f59e0b' },
    { category: 'Hepatic', risk: 10, color: '#eab308' },
    { category: 'Renal', risk: 8, color: '#22c55e' },
    { category: 'Neurological', risk: 12, color: '#3b82f6' },
    { category: 'Hematologic', risk: 5, color: '#8b5cf6' }
  ];

  const interactionTrends = [
    { month: 'Jan', interactions: 4 },
    { month: 'Feb', interactions: 3 },
    { month: 'Mar', interactions: 7 },
    { month: 'Apr', interactions: 2 },
    { month: 'May', interactions: 5 },
    { month: 'Jun', interactions: 1 }
  ];

  const addDrug = () => {
    if (newDrug.name.trim()) {
      const drug: Drug = {
        id: Date.now().toString(),
        name: newDrug.name,
        dosage: newDrug.dosage,
        frequency: newDrug.frequency
      };
      setDrugs([...drugs, drug]);
      setNewDrug({ name: '', dosage: '', frequency: '' });
      checkInteractions([...drugs, drug]);
    }
  };

  const removeDrug = (id: string) => {
    const updatedDrugs = drugs.filter(drug => drug.id !== id);
    setDrugs(updatedDrugs);
    checkInteractions(updatedDrugs);
  };

  const checkInteractions = (currentDrugs: Drug[]) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockInteractions: DrugInteraction[] = [];
      
      // Add some mock interactions based on common drug combinations
      if (currentDrugs.some(d => d.name.toLowerCase().includes('warfarin')) && 
          currentDrugs.some(d => d.name.toLowerCase().includes('aspirin'))) {
        mockInteractions.push({
          drug1: 'Warfarin',
          drug2: 'Aspirin',
          severity: 'high',
          description: 'Increased risk of bleeding',
          recommendation: 'Monitor INR more frequently. Consider alternative pain management.'
        });
      }

      if (currentDrugs.some(d => d.name.toLowerCase().includes('metformin')) && 
          currentDrugs.some(d => d.name.toLowerCase().includes('prednisone'))) {
        mockInteractions.push({
          drug1: 'Metformin',
          drug2: 'Prednisone',
          severity: 'medium',
          description: 'Steroids may increase blood glucose levels',
          recommendation: 'Monitor blood glucose more closely. May need diabetes medication adjustment.'
        });
      }

      setInteractions(mockInteractions);
      setLoading(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const fillDemoData = () => {
    const demoDrugs: Drug[] = [
      { id: '1', name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily' },
      { id: '2', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { id: '3', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
    ];
    setDrugs(demoDrugs);
    checkInteractions(demoDrugs);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Drug Interaction Checker</h2>
          <p className="text-gray-600">Monitor drug interactions and safety profiles</p>
        </div>
        <button
          onClick={fillDemoData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Load Demo Data
        </button>
      </div>

      {/* Add Drug Form */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Medication</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search drug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
                {filteredDrugs.map((drug) => (
                  <button
                    key={drug}
                    onClick={() => {
                      setNewDrug(prev => ({ ...prev, name: drug }));
                      setSearchTerm('');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    {drug}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Dosage"
            value={newDrug.dosage}
            onChange={(e) => setNewDrug(prev => ({ ...prev, dosage: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Frequency"
            value={newDrug.frequency}
            onChange={(e) => setNewDrug(prev => ({ ...prev, frequency: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <button
            onClick={addDrug}
            className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Drug
          </button>
        </div>
      </motion.div>

      {/* Current Medications */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {drugs.map((drug) => (
              <motion.div
                key={drug.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-rose-100 p-2 rounded-full">
                    <Pill className="h-4 w-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{drug.name}</p>
                    <p className="text-sm text-gray-600">{drug.dosage} - {drug.frequency}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeDrug(drug.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {drugs.length === 0 && (
            <p className="text-gray-500 text-center py-8">No medications added yet</p>
          )}
        </div>
      </motion.div>

      {/* Drug Interaction Alerts */}
      {interactions.length > 0 && (
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            Drug Interactions Found
          </h3>
          <div className="space-y-4">
            {interactions.map((interaction, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${getSeverityColor(interaction.severity)}`}></span>
                    <span className={`text-sm font-medium ${getSeverityTextColor(interaction.severity)}`}>
                      {interaction.severity.toUpperCase()} RISK
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {interaction.drug1} × {interaction.drug2}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{interaction.description}</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <strong>Recommendation:</strong> {interaction.recommendation}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Risk Assessment Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="risk" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </motion.div>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interaction Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <LineChart data={interactionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="#ec4899" 
                  strokeWidth={3}
                  dot={{ fill: '#ec4899', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </motion.div>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Risk Distribution Pie Chart */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, risk }) => `${category}: ${risk}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="risk"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </motion.div>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
            <span className="text-gray-700">Checking interactions...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugChecker;