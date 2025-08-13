// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate, useParams } from 'react-router-dom';
// import { 
//   Heart, 
//   ArrowLeft, 
//   User, 
//   Calendar, 
//   Activity,
//   FileText,
//   Brain,
//   Phone,
//   Mail,
//   MapPin,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   Plus,
//   Upload,
//   Camera,
//   Link,
//   X,
//   TrendingUp,
//   Droplets,
//   Sun,
//   Moon,
//   Target,
//   Zap,
//   BarChart3,
//   LineChart,
//   PieChart
// } from 'lucide-react';
// import {
//   LineChart as RechartsLineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   PieChart as RechartsPieChart,
//   Pie,
//   Cell,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
//   ComposedChart
// } from 'recharts';

// interface PatientProfile {
//   id: string;
//   name: string;
//   age: number;
//   gender: string;
//   email: string;
//   phone: string;
//   address: string;
//   emergencyContact: string;
//   bloodType: string;
//   allergies: string[];
//   currentMedications: string[];
//   riskFactors: {
//     pregnancy: boolean;
//     menstruation: boolean;
//     menopause: boolean;
//     familyHistory: string[];
//   };
// }

// interface ConsultationHistory {
//   id: string;
//   date: string;
//   condition: string;
//   confidence: number;
//   status: 'confirmed' | 'rejected' | 'pending';
//   prescription: string[];
//   notes: string;
// }

// interface FileUpload {
//   id: string;
//   name: string;
//   type: string;
//   size: number;
//   uploadDate: string;
//   url: string;
// }

// interface MenstrualCycleData {
//   cycleLength: number;
//   lastPeriod: string;
//   periodLength: number;
//   symptoms: string[];
//   nextPeriod: string;
//   ovulation: string;
//   fertileWindow: { start: string; end: string };
//   cycleHistory: Array<{
//     date: string;
//     day: number;
//     phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
//     flow: 'light' | 'medium' | 'heavy' | 'none';
//     mood: number;
//     pain: number;
//     energy: number;
//     symptoms: string[];
//   }>;
// }

// interface AIInsightData {
//   id: string;
//   type: 'trend' | 'pattern' | 'recommendation' | 'alert' | 'prediction';
//   title: string;
//   description: string;
//   confidence: number;
//   date: string;
//   priority: 'high' | 'medium' | 'low';
//   actionable: boolean;
// }

// interface SymptomTrend {
//   symptom: string;
//   frequency: number;
//   trend: 'up' | 'down' | 'stable';
//   color: string;
// }

// interface RiskAssessment {
//   condition: string;
//   risk: number;
//   factors: string[];
//   recommendations: string[];
// }

// const PatientProfilePage = () => {
//   const navigate = useNavigate();
//   const { patientId } = useParams();
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showAIInsights, setShowAIInsights] = useState(false);
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [uploadType, setUploadType] = useState<'lab' | 'scan' | 'ehr'>('lab');
//   const [dragActive, setDragActive] = useState(false);

//   // Mock patient data
//   const patient: PatientProfile = {
//     id: patientId || '1',
//     name: 'Sarah Mitchell',
//     age: 32,
//     gender: 'Female',
//     email: 'sarah.mitchell@email.com',
//     phone: '+1 (555) 123-4567',
//     address: '123 Main St, San Francisco, CA 94102',
//     emergencyContact: 'John Mitchell - +1 (555) 987-6543',
//     bloodType: 'A+',
//     allergies: ['Penicillin', 'Shellfish'],
//     currentMedications: ['Ibuprofen 400mg', 'Vitamin D3'],
//     riskFactors: {
//       pregnancy: false,
//       menstruation: true,
//       menopause: false,
//       familyHistory: ['Breast Cancer', 'Diabetes Type 2']
//     }
//   };

//   const consultationHistory: ConsultationHistory[] = [
//     {
//       id: '1',
//       date: '2025-01-06',
//       condition: 'Endometriosis',
//       confidence: 87.5,
//       status: 'confirmed',
//       prescription: ['Naproxen 500mg', 'Hormonal therapy'],
//       notes: 'Patient responded well to treatment. Follow-up in 3 months.'
//     },
//     {
//       id: '2',
//       date: '2024-12-15',
//       condition: 'PCOS',
//       confidence: 72.3,
//       status: 'rejected',
//       prescription: [],
//       notes: 'Further testing ruled out PCOS. Symptoms attributed to stress.'
//     },
//     {
//       id: '3',
//       date: '2024-11-20',
//       condition: 'Migraine',
//       confidence: 91.2,
//       status: 'confirmed',
//       prescription: ['Sumatriptan 50mg', 'Preventive therapy'],
//       notes: 'Migraine pattern identified. Preventive treatment initiated.'
//     }
//   ];

//   const patientFiles: {
//     labReports: FileUpload[];
//     scans: FileUpload[];
//     ehrLinks: string[];
//   } = {
//     labReports: [
//       {
//         id: '1',
//         name: 'Blood Test - Complete Panel',
//         type: 'pdf',
//         size: 2456789,
//         uploadDate: '2025-01-05',
//         url: '#'
//       },
//       {
//         id: '2',
//         name: 'Hormone Levels',
//         type: 'pdf',
//         size: 1234567,
//         uploadDate: '2025-01-04',
//         url: '#'
//       }
//     ],
//     scans: [
//       {
//         id: '1',
//         name: 'Pelvic Ultrasound',
//         type: 'jpg',
//         size: 5678901,
//         uploadDate: '2025-01-03',
//         url: '#'
//       }
//     ],
//     ehrLinks: [
//       'https://ehr.hospital.com/patient/12345',
//       'https://records.clinic.com/sarah-mitchell'
//     ]
//   };

//   const menstrualData: MenstrualCycleData = {
//     cycleLength: 28,
//     lastPeriod: '2024-12-20',
//     periodLength: 5,
//     symptoms: ['Cramping', 'Bloating', 'Mood changes'],
//     nextPeriod: '2025-01-17',
//     ovulation: '2025-01-03',
//     fertileWindow: { start: '2025-01-01', end: '2025-01-05' },
//     cycleHistory: generateMockCycleHistory()
//   };

//   // Generate mock cycle history data
//   function generateMockCycleHistory() {
//     const history = [];
//     const today = new Date();
    
//     for (let i = 90; i >= 0; i -= 3) {
//       const date = new Date(today);
//       date.setDate(date.getDate() - i);
      
//       const dayOfCycle = (90 - i) % 28 + 1;
//       let phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal' = 'follicular';
//       let flow: 'light' | 'medium' | 'heavy' | 'none' = 'none';
      
//       if (dayOfCycle >= 1 && dayOfCycle <= 5) {
//         phase = 'menstrual';
//         flow = dayOfCycle === 1 ? 'heavy' : dayOfCycle === 2 ? 'heavy' : dayOfCycle === 3 ? 'medium' : 'light';
//       } else if (dayOfCycle >= 6 && dayOfCycle <= 13) {
//         phase = 'follicular';
//       } else if (dayOfCycle >= 14 && dayOfCycle <= 16) {
//         phase = 'ovulation';
//       } else {
//         phase = 'luteal';
//       }
      
//       history.push({
//         date: date.toISOString().split('T')[0],
//         day: dayOfCycle,
//         phase,
//         flow,
//         mood: Math.max(1, phase === 'ovulation' ? 8 + Math.random() * 2 : 5 + Math.random() * 4),
//         pain: flow !== 'none' ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 3) + 1,
//         energy: phase === 'ovulation' ? Math.floor(Math.random() * 3) + 8 : Math.floor(Math.random() * 10) + 1,
//         symptoms: phase === 'menstrual' ? ['cramping', 'fatigue'] : 
//                  phase === 'ovulation' ? ['increased_energy', 'breast_tenderness'] : []
//       });
//     }
    
//     return history;
//   }

//   const aiInsightsData: AIInsightData[] = [
//     {
//       id: '1',
//       type: 'trend',
//       title: 'Symptom Severity Decreasing',
//       description: '35% reduction in symptom severity over 3 months. Treatment effectiveness confirmed.',
//       confidence: 92,
//       date: '2025-01-07',
//       priority: 'high',
//       actionable: false
//     },
//     {
//       id: '2',
//       type: 'pattern',
//       title: 'Cyclical Pattern Detected',
//       description: 'Symptoms recur every 28 days with 87% consistency. Strong hormonal correlation identified.',
//       confidence: 87,
//       date: '2025-01-06',
//       priority: 'medium',
//       actionable: true
//     },
//     {
//       id: '3',
//       type: 'prediction',
//       title: 'Flare-up Risk Elevated',
//       description: 'AI models predict 73% chance of symptom flare-up in next 7-10 days based on historical patterns.',
//       confidence: 73,
//       date: '2025-01-07',
//       priority: 'high',
//       actionable: true
//     }
//   ];

//   const symptomTrends: SymptomTrend[] = [
//     { symptom: 'Cramping', frequency: 65, trend: 'down', color: 'bg-red-500' },
//     { symptom: 'Fatigue', frequency: 45, trend: 'stable', color: 'bg-orange-500' },
//     { symptom: 'Mood Changes', frequency: 38, trend: 'up', color: 'bg-yellow-500' },
//     { symptom: 'Bloating', frequency: 52, trend: 'down', color: 'bg-purple-500' },
//     { symptom: 'Headaches', frequency: 28, trend: 'stable', color: 'bg-pink-500' },
//     { symptom: 'Breast Tenderness', frequency: 41, trend: 'up', color: 'bg-indigo-500' }
//   ];

//   const riskAssessments: RiskAssessment[] = [
//     {
//       condition: 'Endometriosis Progression',
//       risk: 23,
//       factors: ['Family history', 'Current symptoms', 'Age factor'],
//       recommendations: ['Regular monitoring', 'Hormonal therapy optimization', 'Lifestyle modifications']
//     },
//     {
//       condition: 'Chronic Pain Syndrome',
//       risk: 15,
//       factors: ['Pain duration', 'Treatment response'],
//       recommendations: ['Pain management program', 'Physical therapy', 'Stress reduction']
//     }
//   ];
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'confirmed': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'confirmed': return <CheckCircle className="h-4 w-4" />;
//       case 'rejected': return <AlertCircle className="h-4 w-4" />;
//       case 'pending': return <Clock className="h-4 w-4" />;
//       default: return <Activity className="h-4 w-4" />;
//     }
//   };

//   const getFileIcon = (type: string) => {
//     switch (type) {
//       case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
//       case 'jpg':
//       case 'jpeg':
//       case 'png': return <Camera className="h-5 w-5 text-blue-500" />;
//       default: return <FileText className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     const files = e.dataTransfer.files;
//     if (files && files[0]) {
//       handleFileUpload(files[0]);
//     }
//   };

//   const handleFileUpload = (file: File) => {
//     const newFile: FileUpload = {
//       id: Date.now().toString(),
//       name: file.name,
//       type: file.type.split('/')[1] || 'unknown',
//       size: file.size,
//       uploadDate: new Date().toISOString().split('T')[0],
//       url: URL.createObjectURL(file)
//     };
    
//     console.log('File uploaded:', newFile);
//     setShowUploadModal(false);
//   };

//   const calculateDaysBetween = (date1: string, date2: string) => {
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     const diffTime = Math.abs(d2.getTime() - d1.getTime());
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: <User className="h-4 w-4" /> },
//     { id: 'history', label: 'Consultation History', icon: <FileText className="h-4 w-4" /> },
//     { id: 'files', label: 'Files & Reports', icon: <Upload className="h-4 w-4" /> },
//     { id: 'menstrual', label: 'Menstrual Cycle', icon: <Calendar className="h-4 w-4" /> }
//   ];

//   const UploadModal = () => (
//     <motion.div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="bg-white rounded-xl shadow-xl max-w-md w-full"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//       >
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-gray-900">Upload Files</h3>
//             <button
//               onClick={() => setShowUploadModal(false)}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
        
//         <div className="p-6 space-y-4">
//           <div className="flex space-x-2">
//             {(['lab', 'scan', 'ehr'] as const).map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setUploadType(type)}
//                 className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
//                   uploadType === type
//                     ? 'bg-rose-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {type === 'lab' ? 'Lab Report' : type === 'scan' ? 'Scan' : 'EHR Link'}
//               </button>
//             ))}
//           </div>
          
//           {uploadType === 'ehr' ? (
//             <div className="space-y-4">
//               <input
//                 type="url"
//                 placeholder="Enter EHR link URL"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//               />
//               <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
//                 Add EHR Link
//               </button>
//             </div>
//           ) : (
//             <div
//               className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                 dragActive ? 'border-rose-500 bg-rose-50' : 'border-gray-300'
//               }`}
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={handleDrop}
//             >
//               <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 mb-2">Drag and drop files here, or</p>
//               <input
//                 type="file"
//                 id="file-upload"
//                 className="hidden"
//                 accept={uploadType === 'lab' ? '.pdf,.doc,.docx' : '.jpg,.jpeg,.png,.dcm'}
//                 onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="bg-rose-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-rose-700 transition-colors inline-block"
//               >
//                 Choose File
//               </label>
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );

//   const AIInsightsModal = () => (
//     <motion.div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//       >
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold text-gray-900">AI Insights - {patient.name}</h3>
//             <button
//               onClick={() => setShowAIInsights(false)}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//         <div className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
//               <h4 className="text-lg font-semibold text-gray-900 mb-4">Diagnostic Patterns</h4>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Endometriosis Risk:</span>
//                   <span className="font-bold text-purple-600">High (87%)</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Hormonal Imbalance:</span>
//                   <span className="font-bold text-pink-600">Moderate (65%)</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Chronic Pain Pattern:</span>
//                   <span className="font-bold text-red-600">Present (78%)</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
//               <h4 className="text-lg font-semibold text-gray-900 mb-4">Treatment Recommendations</h4>
//               <div className="space-y-3">
//                 <div className="flex items-start space-x-2">
//                   <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//                   <span className="text-gray-700">Continue current hormonal therapy</span>
//                 </div>
//                 <div className="flex items-start space-x-2">
//                   <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//                   <span className="text-gray-700">Monitor pain levels weekly</span>
//                 </div>
//                 <div className="flex items-start space-x-2">
//                   <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//                   <span className="text-gray-700">Consider dietary modifications</span>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//             <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h4>
//             <p className="text-gray-700 mb-4">
//               Based on the patient's medical history and current symptoms, the AI suggests focusing on:
//             </p>
//             <ul className="space-y-2 text-gray-700">
//               <li>• Regular monitoring of endometriosis progression</li>
//               <li>• Evaluation of current pain management strategies</li>
//               <li>• Assessment of hormonal therapy effectiveness</li>
//               <li>• Consideration of lifestyle interventions</li>
//             </ul>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate('/patients')}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <ArrowLeft className="h-5 w-5" />
//                 <span>Back to Records</span>
//               </button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Heart className="h-6 w-6 text-rose-600" />
//               <span className="text-lg font-semibold text-gray-900">Patient Profile</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Patient Header */}
//         <motion.div
//           className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center space-x-4 mb-4 lg:mb-0">
//               <div className="bg-rose-100 p-4 rounded-full">
//                 <User className="h-8 w-8 text-rose-600" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
//                 <p className="text-gray-600">{patient.age} years old • {patient.gender}</p>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//                 onClick={() => setShowAIInsights(true)}
//                 className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
//               >
//                 <Brain className="h-5 w-5" />
//                 <span>View AI Insights</span>
//               </button>
//               <button
//                 onClick={() => navigate('/diagnosis')}
//                 className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2"
//               >
//                 <Plus className="h-5 w-5" />
//                 <span>New Consultation</span>
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tabs */}
//         <motion.div
//           className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6 overflow-x-auto">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors whitespace-nowrap ${
//                     activeTab === tab.id
//                       ? 'border-rose-500 text-rose-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   {tab.icon}
//                   <span>{tab.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="space-y-8"
//               >
//                 {/* Personal Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div className="flex items-center space-x-3">
//                         <Mail className="h-5 w-5 text-gray-400" />
//                         <div>
//                           <p className="text-sm text-gray-600">Email</p>
//                           <p className="font-medium">{patient.email}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <Phone className="h-5 w-5 text-gray-400" />
//                         <div>
//                           <p className="text-sm text-gray-600">Phone</p>
//                           <p className="font-medium">{patient.phone}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <MapPin className="h-5 w-5 text-gray-400" />
//                         <div>
//                           <p className="text-sm text-gray-600">Address</p>
//                           <p className="font-medium">{patient.address}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <div>
//                         <p className="text-sm text-gray-600">Blood Type</p>
//                         <p className="font-medium">{patient.bloodType}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600">Emergency Contact</p>
//                         <p className="font-medium">{patient.emergencyContact}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medical Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Allergies</h3>
//                     <div className="space-y-2">
//                       {patient.allergies.map((allergy, index) => (
//                         <span key={index} className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mr-2">
//                           {allergy}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
//                     <div className="space-y-2">
//                       {patient.currentMedications.map((medication, index) => (
//                         <div key={index} className="bg-blue-50 p-3 rounded-lg">
//                           <p className="font-medium text-blue-900">{medication}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Risk Factors */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="font-medium text-gray-900 mb-3">Current Status</h4>
//                       <div className="space-y-2">
//                         <div className="flex items-center space-x-2">
//                           <div className={`w-3 h-3 rounded-full ${patient.riskFactors.pregnancy ? 'bg-green-500' : 'bg-gray-300'}`} />
//                           <span className="text-sm">Pregnancy</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <div className={`w-3 h-3 rounded-full ${patient.riskFactors.menstruation ? 'bg-green-500' : 'bg-gray-300'}`} />
//                           <span className="text-sm">Menstruation</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <div className={`w-3 h-3 rounded-full ${patient.riskFactors.menopause ? 'bg-green-500' : 'bg-gray-300'}`} />
//                           <span className="text-sm">Menopause</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-900 mb-3">Family History</h4>
//                       <div className="space-y-2">
//                         {patient.riskFactors.familyHistory.map((condition, index) => (
//                           <span key={index} className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-2">
//                             {condition}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Consultation History Tab */}
//             {activeTab === 'history' && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="space-y-6"
//               >
//                 {consultationHistory.map((consultation, index) => (
//                   <div key={consultation.id} className="bg-gray-50 rounded-lg p-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <h4 className="text-lg font-semibold text-gray-900">{consultation.condition}</h4>
//                         <p className="text-sm text-gray-600 flex items-center mt-1">
//                           <Calendar className="h-4 w-4 mr-1" />
//                           {new Date(consultation.date).toLocaleDateString('en-US', { 
//                             year: 'numeric', 
//                             month: 'long', 
//                             day: 'numeric' 
//                           })}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-2xl font-bold text-rose-600 mb-1">{consultation.confidence}%</p>
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
//                           {getStatusIcon(consultation.status)}
//                           <span className="ml-1">{consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}</span>
//                         </span>
//                       </div>
//                     </div>
                    
//                     {consultation.prescription.length > 0 && (
//                       <div className="mb-4">
//                         <h5 className="font-medium text-gray-900 mb-2">Prescription</h5>
//                         <div className="space-y-1">
//                           {consultation.prescription.map((med, medIndex) => (
//                             <span key={medIndex} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">
//                               {med}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
                    
//                     <div>
//                       <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
//                       <p className="text-gray-700">{consultation.notes}</p>
//                     </div>
//                   </div>
//                 ))}
//               </motion.div>
//             )}

//             {/* Files & Reports Tab */}
//             {activeTab === 'files' && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="space-y-6"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold text-gray-900">Files & Reports</h3>
//                   <button
//                     onClick={() => setShowUploadModal(true)}
//                     className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center space-x-2"
//                   >
//                     <Plus className="h-4 w-4" />
//                     <span>Upload File</span>
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {/* Lab Reports */}
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-medium text-gray-900 mb-3">Lab Reports</h4>
//                     <div className="space-y-2">
//                       {patientFiles.labReports.map((file) => (
//                         <div key={file.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
//                           {getFileIcon(file.type)}
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
//                             <p className="text-xs text-gray-500">{formatFileSize(file.size)} • {file.uploadDate}</p>
//                           </div>
//                         </div>
//                       ))}
//                       {patientFiles.labReports.length === 0 && (
//                         <p className="text-sm text-gray-500">No lab reports uploaded</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Scans */}
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-medium text-gray-900 mb-3">Medical Scans</h4>
//                     <div className="space-y-2">
//                       {patientFiles.scans.map((file) => (
//                         <div key={file.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
//                           {getFileIcon(file.type)}
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
//                             <p className="text-xs text-gray-500">{formatFileSize(file.size)} • {file.uploadDate}</p>
//                           </div>
//                         </div>
//                       ))}
//                       {patientFiles.scans.length === 0 && (
//                         <p className="text-sm text-gray-500">No scans uploaded</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* EHR Links */}
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-medium text-gray-900 mb-3">EHR Links</h4>
//                     <div className="space-y-2">
//                       {patientFiles.ehrLinks.map((link, index) => (
//                         <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
//                           <Link className="h-5 w-5 text-blue-500" />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">{link}</p>
//                             <p className="text-xs text-gray-500">External EHR System</p>
//                           </div>
//                         </div>
//                       ))}
//                       {patientFiles.ehrLinks.length === 0 && (
//                         <p className="text-sm text-gray-500">No EHR links added</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Menstrual Cycle Tab */}
//             {activeTab === 'menstrual' && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="space-y-6"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {/* Cycle Overview */}
//                   <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Cycle Overview</h3>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Cycle Length:</span>
//                         <span className="font-bold text-rose-600">{menstrualData.cycleLength} days</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Period Length:</span>
//                         <span className="font-bold text-pink-600">{menstrualData.periodLength} days</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Last Period:</span>
//                         <span className="font-medium text-gray-900">{new Date(menstrualData.lastPeriod).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Predictions */}
//                   <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictions</h3>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Next Period:</span>
//                         <span className="font-bold text-purple-600">{new Date(menstrualData.nextPeriod).toLocaleDateString()}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Days Until:</span>
//                         <span className="font-bold text-indigo-600">{calculateDaysBetween(new Date().toISOString().split('T')[0], menstrualData.nextPeriod)} days</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Ovulation:</span>
//                         <span className="font-medium text-gray-900">{new Date(menstrualData.ovulation).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Symptoms */}
//                   <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Symptoms</h3>
//                     <div className="space-y-2">
//                       {menstrualData.symptoms.map((symptom, index) => (
//                         <div key={index} className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-orange-500 rounded-full" />
//                           <span className="text-gray-700">{symptom}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Cycle Calendar */}
//                 <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Cycle Calendar</h3>
//                   <div className="grid grid-cols-7 gap-2 text-center">
//                     {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//                       <div key={day} className="font-medium text-gray-600 p-2">{day}</div>
//                     ))}
//                     {Array.from({ length: 35 }, (_, i) => {
//                       const date = new Date();
//                       date.setDate(date.getDate() - 15 + i);
//                       const isToday = date.toDateString() === new Date().toDateString();
//                       const isLastPeriod = date.toDateString() === new Date(menstrualData.lastPeriod).toDateString();
//                       const isNextPeriod = date.toDateString() === new Date(menstrualData.nextPeriod).toDateString();
//                       const isOvulation = date.toDateString() === new Date(menstrualData.ovulation).toDateString();
                      
//                       return (
//                         <div
//                           key={i}
//                           className={`p-2 text-sm rounded-lg transition-colors ${
//                             isToday ? 'bg-gray-900 text-white' :
//                             isLastPeriod ? 'bg-rose-500 text-white' :
//                             isNextPeriod ? 'bg-pink-500 text-white' :
//                             isOvulation ? 'bg-purple-500 text-white' :
//                             'hover:bg-gray-100'
//                           }`}
//                         >
//                           {date.getDate()}
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div className="mt-4 flex flex-wrap gap-4 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-4 h-4 bg-gray-900 rounded"></div>
//                       <span>Today</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-4 h-4 bg-rose-500 rounded"></div>
//                       <span>Last Period</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-4 h-4 bg-pink-500 rounded"></div>
//                       <span>Next Period</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-4 h-4 bg-purple-500 rounded"></div>
//                       <span>Ovulation</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* Upload Modal */}
//       <AnimatePresence>
//         {showUploadModal && <UploadModal />}
//       </AnimatePresence>

//       {/* AI Insights Modal */}
//       <AnimatePresence>
//         {showAIInsights && <AIInsightsModal />}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default PatientProfilePage;


// import { useState } from 'react';
// import MenstrualTracker from './MenstrualTracker';
// import AIInsights from './AIInsights';

// const PatientProfilePage = () => {
//   const [activeTab, setActiveTab] = useState<'tracker' | 'insights'>('tracker');

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>

//       {/* Tab Buttons */}
//       <div className="flex space-x-4 mb-4">
//         <button 
//           className={`px-4 py-2 rounded ${activeTab === 'tracker' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('tracker')}
//         >
//           Menstrual Tracker
//         </button>
//         <button 
//           className={`px-4 py-2 rounded ${activeTab === 'insights' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('insights')}
//         >
//           AI Insights
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="bg-white shadow-md rounded p-4">
//         {activeTab === 'tracker' && <MenstrualTracker />}
//         {activeTab === 'insights' && <AIInsights patientId={''} />}
//       </div>
//     </div>
//   );
// };

// export default PatientProfilePage;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Heart, 
  ArrowLeft, 
  User, 
  Calendar, 
  FileText,
  Brain,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Upload,
  Camera,
  Link,
  X,
  Activity
} from 'lucide-react';

// Import the extracted components
import AIInsights from './AIInsights';
import MenstrualTracker from './MenstrualTracker';

interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string[];
  currentMedications: string[];
  riskFactors: {
    pregnancy: boolean;
    menstruation: boolean;
    menopause: boolean;
    familyHistory: string[];
  };
}

interface ConsultationHistory {
  id: string;
  date: string;
  condition: string;
  confidence: number;
  status: 'confirmed' | 'rejected' | 'pending';
  prescription: string[];
  notes: string;
}

interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  url: string;
}

const PatientProfilePage = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'lab' | 'scan' | 'ehr'>('lab');
  const [dragActive, setDragActive] = useState(false);

  // Mock patient data
  const patient: PatientProfile = {
    id: patientId || '1',
    name: 'Sarah Mitchell',
    age: 32,
    gender: 'Female',
    email: 'sarah.mitchell@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94102',
    emergencyContact: 'John Mitchell - +1 (555) 987-6543',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: ['Ibuprofen 400mg', 'Vitamin D3'],
    riskFactors: {
      pregnancy: false,
      menstruation: true,
      menopause: false,
      familyHistory: ['Breast Cancer', 'Diabetes Type 2']
    }
  };

  const consultationHistory: ConsultationHistory[] = [
    {
      id: '1',
      date: '2025-01-06',
      condition: 'Endometriosis',
      confidence: 87.5,
      status: 'confirmed',
      prescription: ['Naproxen 500mg', 'Hormonal therapy'],
      notes: 'Patient responded well to treatment. Follow-up in 3 months.'
    },
    {
      id: '2',
      date: '2024-12-15',
      condition: 'PCOS',
      confidence: 72.3,
      status: 'rejected',
      prescription: [],
      notes: 'Further testing ruled out PCOS. Symptoms attributed to stress.'
    },
    {
      id: '3',
      date: '2024-11-20',
      condition: 'Migraine',
      confidence: 91.2,
      status: 'confirmed',
      prescription: ['Sumatriptan 50mg', 'Preventive therapy'],
      notes: 'Migraine pattern identified. Preventive treatment initiated.'
    }
  ];

  const patientFiles: {
    labReports: FileUpload[];
    scans: FileUpload[];
    ehrLinks: string[];
  } = {
    labReports: [
      {
        id: '1',
        name: 'Blood Test - Complete Panel',
        type: 'pdf',
        size: 2456789,
        uploadDate: '2025-01-05',
        url: '#'
      },
      {
        id: '2',
        name: 'Hormone Levels',
        type: 'pdf',
        size: 1234567,
        uploadDate: '2025-01-04',
        url: '#'
      }
    ],
    scans: [
      {
        id: '1',
        name: 'Pelvic Ultrasound',
        type: 'jpg',
        size: 5678901,
        uploadDate: '2025-01-03',
        url: '#'
      }
    ],
    ehrLinks: [
      'https://ehr.hospital.com/patient/12345',
      'https://records.clinic.com/sarah-mitchell'
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <Camera className="h-5 w-5 text-blue-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const newFile: FileUpload = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.split('/')[1] || 'unknown',
      size: file.size,
      uploadDate: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(file)
    };
    
    console.log('File uploaded:', newFile);
    setShowUploadModal(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="h-4 w-4" /> },
    { id: 'history', label: 'Consultation History', icon: <FileText className="h-4 w-4" /> },
    { id: 'files', label: 'Files & Reports', icon: <Upload className="h-4 w-4" /> },
    { id: 'menstrual', label: 'Menstrual Cycle', icon: <Calendar className="h-4 w-4" /> }
  ];

  const UploadModal = () => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Upload Files</h3>
            <button
              onClick={() => setShowUploadModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex space-x-2">
            {(['lab', 'scan', 'ehr'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setUploadType(type)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  uploadType === type
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'lab' ? 'Lab Report' : type === 'scan' ? 'Scan' : 'EHR Link'}
              </button>
            ))}
          </div>
          
          {uploadType === 'ehr' ? (
            <div className="space-y-4">
              <input
                type="url"
                placeholder="Enter EHR link URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
                Add EHR Link
              </button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-rose-500 bg-rose-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop files here, or</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept={uploadType === 'lab' ? '.pdf,.doc,.docx' : '.jpg,.jpeg,.png,.dcm'}
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
              />
              <label
                htmlFor="file-upload"
                className="bg-rose-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-rose-700 transition-colors inline-block"
              >
                Choose File
              </label>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/patients')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Records</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-600" />
              <span className="text-lg font-semibold text-gray-900">Patient Profile</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Header */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="bg-rose-100 p-4 rounded-full">
                <User className="h-8 w-8 text-rose-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <p className="text-gray-600">{patient.age} years old • {patient.gender}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(`/patients/${patientId}/insights`)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Brain className="h-5 w-5" />
                <span>View AI Insights</span>
              </button>
              <button
                onClick={() => navigate('/diagnosis')}
                className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>New Consultation</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">{patient.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{patient.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{patient.address}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Blood Type</p>
                        <p className="font-medium">{patient.bloodType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Emergency Contact</p>
                        <p className="font-medium">{patient.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Allergies</h3>
                    <div className="space-y-2">
                      {patient.allergies.map((allergy, index) => (
                        <span key={index} className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mr-2">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
                    <div className="space-y-2">
                      {patient.currentMedications.map((medication, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg">
                          <p className="font-medium text-blue-900">{medication}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Current Status</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${patient.riskFactors.pregnancy ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-sm">Pregnancy</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${patient.riskFactors.menstruation ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-sm">Menstruation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${patient.riskFactors.menopause ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-sm">Menopause</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Family History</h4>
                      <div className="space-y-2">
                        {patient.riskFactors.familyHistory.map((condition, index) => (
                          <span key={index} className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm mr-2">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Consultation History Tab */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {consultationHistory.map((consultation) => (
                  <div key={consultation.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{consultation.condition}</h4>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(consultation.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-rose-600 mb-1">{consultation.confidence}%</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                          {getStatusIcon(consultation.status)}
                          <span className="ml-1">{consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}</span>
                        </span>
                      </div>
                    </div>
                    
                    {consultation.prescription.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Prescription</h5>
                        <div className="space-y-1">
                          {consultation.prescription.map((med, medIndex) => (
                            <span key={medIndex} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">
                              {med}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                      <p className="text-gray-700">{consultation.notes}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Files & Reports Tab */}
            {activeTab === 'files' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Files & Reports</h3>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Upload File</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Lab Reports */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Lab Reports</h4>
                    <div className="space-y-2">
                      {patientFiles.labReports.map((file) => (
                        <div key={file.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)} • {file.uploadDate}</p>
                          </div>
                        </div>
                      ))}
                      {patientFiles.labReports.length === 0 && (
                        <p className="text-sm text-gray-500">No lab reports uploaded</p>
                      )}
                    </div>
                  </div>

                  {/* Scans */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Medical Scans</h4>
                    <div className="space-y-2">
                      {patientFiles.scans.map((file) => (
                        <div key={file.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)} • {file.uploadDate}</p>
                          </div>
                        </div>
                      ))}
                      {patientFiles.scans.length === 0 && (
                        <p className="text-sm text-gray-500">No scans uploaded</p>
                      )}
                    </div>
                  </div>

                  {/* EHR Links */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">EHR Links</h4>
                    <div className="space-y-2">
                      {patientFiles.ehrLinks.map((link, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                          <Link className="h-5 w-5 text-blue-500" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{link}</p>
                            <p className="text-xs text-gray-500">External EHR System</p>
                          </div>
                        </div>
                      ))}
                      {patientFiles.ehrLinks.length === 0 && (
                        <p className="text-sm text-gray-500">No EHR links added</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Menstrual Cycle Tab */}
            {activeTab === 'menstrual' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MenstrualTracker />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && <UploadModal />}
      </AnimatePresence>

      {/* AI Insights Modal */}
      <AnimatePresence>
        {showAIInsights && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
                      <motion.div
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                  <button
                    onClick={() => setShowAIInsights(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700">
                  Here are the AI-generated insights based on the patient's data:
                </p>
                {/* Example insights */}
                <ul className="mt-4 space-y-2">
                  <li className="bg-blue-100 p-3 rounded-lg">
                    <strong>Insight 1:</strong> The patient shows a high risk for endometriosis based on symptoms.
                  </li>
                  <li className="bg-blue-100 p-3 rounded-lg">
                    <strong>Insight 2:</strong> Current medications may need adjustment based on recent lab results.
                  </li>
                  <li className="bg-blue-100 p-3 rounded-lg">
                    <strong>Insight 3:</strong> Family history indicates a need for regular screenings for breast cancer.
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientProfilePage;

