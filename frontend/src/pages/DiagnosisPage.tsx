// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Heart, 
//   ArrowLeft, 
//   User, 
//   Calendar, 
//   Activity,
//   Brain,
//   CheckCircle,
//   AlertCircle,
//   TrendingUp,
//   Pill,
//   Users,
//   AlertTriangle
// } from 'lucide-react';

// interface DiagnosisResult {
//   condition: string;
//   confidence: number;
//   confidence_level: string;
//   recommendation: string;
// }

// interface PatientInfo {
//   age: number;
//   gender: string;
//   familyHistory: string[];
//   allergies: string[];
// }

// const DiagnosisPage = () => {
//   const navigate = useNavigate();
  
//   const [patientInfo, setPatientInfo] = useState<PatientInfo>({
//     age: 0,
//     gender: '',
//     familyHistory: [],
//     allergies: []
//   });
  
//   const [symptoms, setSymptoms] = useState<Record<string, number>>({});
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState<{
//     patient_info: PatientInfo;
//     predictions: DiagnosisResult[];
//     total_symptoms: number;
//   } | null>(null);

//   // Common symptoms list
//   const symptomsList = [
//     'pelvic_pain', 'heavy_periods', 'fatigue', 'nausea', 'headache',
//     'back_pain', 'mood_changes', 'weight_gain', 'bloating', 'cramping',
//     'irregular_periods', 'hot_flashes', 'breast_tenderness', 'anxiety',
//     'depression', 'sleep_issues', 'joint_pain', 'digestive_issues'
//   ];

//   // Common family history conditions
//   const familyHistoryOptions = [
//     'Endometriosis', 'PCOS', 'Breast Cancer', 'Ovarian Cancer', 'Diabetes',
//     'Heart Disease', 'Thyroid Disorders', 'Autoimmune Diseases', 'Fibromyalgia',
//     'Mental Health Conditions', 'Osteoporosis', 'Blood Clotting Disorders'
//   ];

//   // Common allergies
//   const allergyOptions = [
//     'Penicillin', 'Sulfa Drugs', 'Aspirin', 'NSAIDs', 'Latex',
//     'Pollen', 'Dust Mites', 'Pet Dander', 'Shellfish', 'Nuts',
//     'Dairy', 'Eggs', 'Soy', 'Wheat', 'Food Additives'
//   ];

//   const handleSymptomChange = (symptom: string, checked: boolean) => {
//     setSymptoms(prev => ({
//       ...prev,
//       [symptom]: checked ? 1 : 0
//     }));
//   };

//   const handleFamilyHistoryChange = (condition: string, checked: boolean) => {
//     setPatientInfo(prev => ({
//       ...prev,
//       familyHistory: checked 
//         ? [...prev.familyHistory, condition]
//         : prev.familyHistory.filter(item => item !== condition)
//     }));
//   };

//   const handleAllergyChange = (allergy: string, checked: boolean) => {
//     setPatientInfo(prev => ({
//       ...prev,
//       allergies: checked 
//         ? [...prev.allergies, allergy]
//         : prev.allergies.filter(item => item !== allergy)
//     }));
//   };

//   const fillDemoData = () => {
//     setPatientInfo({
//       age: 32,
//       gender: 'Female',
//       familyHistory: ['Endometriosis', 'PCOS', 'Breast Cancer'],
//       allergies: ['Penicillin', 'NSAIDs', 'Latex']
//     });
    
//     setSymptoms({
//       pelvic_pain: 1,
//       heavy_periods: 1,
//       fatigue: 1,
//       bloating: 1,
//       cramping: 1,
//       mood_changes: 1,
//       back_pain: 1
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       const mockResponse = {
//         patient_info: patientInfo,
//         predictions: [
//           {
//             condition: "Endometriosis",
//             confidence: 87.5,
//             confidence_level: "High",
//             recommendation: "Please consult with a gynecologist for further evaluation and potential laparoscopic examination."
//           },
//           {
//             condition: "PCOS",
//             confidence: 72.3,
//             confidence_level: "Medium",
//             recommendation: "Consider hormonal evaluation and ultrasound examination."
//           },
//           {
//             condition: "Fibromyalgia",
//             confidence: 45.8,
//             confidence_level: "Low",
//             recommendation: "Monitor symptoms and consider rheumatology consultation if symptoms persist."
//           }
//         ],
//         total_symptoms: Object.values(symptoms).filter(v => v === 1).length
//       };
      
//       setResults(mockResponse);
//     } catch (error) {
//       console.error('Diagnosis failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getConfidenceColor = (level: string) => {
//     switch (level.toLowerCase()) {
//       case 'high': return 'text-green-600 bg-green-100';
//       case 'medium': return 'text-yellow-600 bg-yellow-100';
//       case 'low': return 'text-red-600 bg-red-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const getConfidenceIcon = (level: string) => {
//     switch (level.toLowerCase()) {
//       case 'high': return <CheckCircle className="h-5 w-5" />;
//       case 'medium': return <AlertCircle className="h-5 w-5" />;
//       case 'low': return <TrendingUp className="h-5 w-5" />;
//       default: return <Activity className="h-5 w-5" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate('/dashboard')}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <ArrowLeft className="h-5 w-5" />
//                 <span>Back to Dashboard</span>
//               </button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Heart className="h-6 w-6 text-rose-600" />
//               <span className="text-lg font-semibold text-gray-900">AI Diagnosis</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {!results ? (
//           <motion.div
//             className="bg-white rounded-xl shadow-sm border border-gray-100"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900 mb-2">New Patient Diagnosis</h1>
//                   <p className="text-gray-600">Enter patient information and symptoms for AI analysis</p>
//                 </div>
//                 <button
//                   onClick={fillDemoData}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Fill Demo Data
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-8">
//               {/* Patient Information */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                   <User className="h-5 w-5 mr-2 text-rose-600" />
//                   Patient Information
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
//                     <input
//                       type="number"
//                       value={patientInfo.age || ''}
//                       onChange={(e) => setPatientInfo(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                       placeholder="Enter patient age"
//                       required
//                       min="1"
//                       max="120"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                     <select
//                       value={patientInfo.gender}
//                       onChange={(e) => setPatientInfo(prev => ({ ...prev, gender: e.target.value }))}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                       required
//                     >
//                       <option value="">Select gender</option>
//                       <option value="Female">Female</option>
//                       <option value="Male">Male</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Family History */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                   <Users className="h-5 w-5 mr-2 text-rose-600" />
//                   Family History
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {familyHistoryOptions.map((condition) => (
//                     <div
//                       key={condition}
//                       onClick={() => handleFamilyHistoryChange(condition, !patientInfo.familyHistory.includes(condition))}
//                       className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                         patientInfo.familyHistory.includes(condition)
//                           ? 'border-rose-500 bg-rose-50 text-rose-700'
//                           : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium">{condition}</span>
//                         {patientInfo.familyHistory.includes(condition) && (
//                           <CheckCircle className="h-4 w-4 text-rose-600" />
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Allergies */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                   <AlertTriangle className="h-5 w-5 mr-2 text-rose-600" />
//                   Allergies
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {allergyOptions.map((allergy) => (
//                     <div
//                       key={allergy}
//                       onClick={() => handleAllergyChange(allergy, !patientInfo.allergies.includes(allergy))}
//                       className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                         patientInfo.allergies.includes(allergy)
//                           ? 'border-orange-500 bg-orange-50 text-orange-700'
//                           : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium">{allergy}</span>
//                         {patientInfo.allergies.includes(allergy) && (
//                           <CheckCircle className="h-4 w-4 text-orange-600" />
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Symptoms */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                   <Activity className="h-5 w-5 mr-2 text-rose-600" />
//                   Symptoms Checklist
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {symptomsList.map((symptom) => (
//                     <label key={symptom} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
//                       <input
//                         type="checkbox"
//                         checked={symptoms[symptom] === 1}
//                         onChange={(e) => handleSymptomChange(symptom, e.target.checked)}
//                         className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
//                       />
//                       <span className="text-sm font-medium text-gray-700 capitalize">
//                         {symptom.replace('_', ' ')}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <motion.button
//                   type="submit"
//                   disabled={loading || !patientInfo.age || !patientInfo.gender}
//                   className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                   whileHover={{ scale: loading ? 1 : 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       <span>Analyzing...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Brain className="h-5 w-5" />
//                       <span>Start AI Analysis</span>
//                     </>
//                   )}
//                 </motion.button>
//               </div>
//             </form>
//           </motion.div>
//         ) : (
//           /* Results Display */
//           <motion.div
//             className="space-y-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             {/* Patient Summary */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Diagnosis Results</h2>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div className="flex items-center space-x-3">
//                   <Calendar className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-600">Patient Age</p>
//                     <p className="font-semibold">{results.patient_info.age} years</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <User className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-600">Gender</p>
//                     <p className="font-semibold">{results.patient_info.gender}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Activity className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-600">Symptoms</p>
//                     <p className="font-semibold">{results.total_symptoms}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Users className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-600">Family History</p>
//                     <p className="font-semibold">{results.patient_info.familyHistory.length} conditions</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Predictions */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900">AI Predictions</h3>
//               {results.predictions.map((prediction, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div>
//                       <h4 className="text-xl font-semibold text-gray-900">{prediction.condition}</h4>
//                       <p className="text-3xl font-bold text-rose-600 mt-1">{prediction.confidence.toFixed(1)}%</p>
//                     </div>
//                     <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getConfidenceColor(prediction.confidence_level)}`}>
//                       {getConfidenceIcon(prediction.confidence_level)}
//                       <span className="text-sm font-medium">{prediction.confidence_level} Confidence</span>
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <p className="text-gray-700">{prediction.recommendation}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={() => setResults(null)}
//                 className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
//               >
//                 New Diagnosis
//               </button>
//               <button
//                 onClick={() => navigate('/patients')}
//                 className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//               >
//                 Save to Records
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DiagnosisPage;