import{ useState } from 'react';
import {
  Heart,
  ArrowLeft,
  User,
  Activity,
  Brain,
  Pill,
  AlertTriangle,
  CheckCircle,
  Save,
  Eye,
  Shield,
  Clock,
  Search,
  Baby,
  UserCheck,
  Loader2,
  Users,
  AlertCircle
} from 'lucide-react';
import MultiSelectDropdown from '../components/MultiSelectDropdown';

// ============ CONFIGURATION ============
// Replace this with your ngrok URL when available
const API_BASE_URL = 'https://081131d17200.ngrok-free.app/api/v1';
// For ngrok, it will look like: 'https://your-ngrok-url.ngrok.io/api/v1'

// =======================================

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  familyHistory: string[];
  allergies: string[];
}

interface Vitals {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
}

interface DiagnosisResult {
  condition: string;
  confidence: number;
  confidence_level: string;
  relevant_symptoms: string[];
  overridden?: boolean;
}

interface DrugSideEffect {
  category: string;
  frequency: string;
  frequency_percentage: string;
  gender_specific: string;
  requires_monitoring: string;
  severity: string;
  side_effect: string;
}

interface DrugCheckResult {
  age_group: string;
  breastfeeding_risk: string | null;
  drug_name: string;
  pregnancy_risk: string | null;
  requires_monitoring: boolean;
  risk_level: string;
  risk_score: number;
  safer_alternatives: string[];
  side_effects: DrugSideEffect[];
  special_considerations: string[];
}

interface DrugCheckInput {
  drugName: string;
  pregnancy: boolean;
  breastfeeding: boolean;
}

const ClinicalDecisionPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
 
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    age: 0,
    gender: '',
    weight: 0,
    height: 0,
    familyHistory: [],
    allergies: []
  });

  const [vitals, setVitals] = useState<Vitals>({
    bloodPressure: '',
    heartRate: 0,
    temperature: 0,
    respiratoryRate: 0
  });

  const [symptoms, setSymptoms] = useState<Record<string, number>>({});
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisResult | null>(null);
  const [recommendation, setRecommendation] = useState('');
 
  // Drug Checker State
  const [drugCheckInput, setDrugCheckInput] = useState<DrugCheckInput>({
    drugName: '',
    pregnancy: false,
    breastfeeding: false
  });
  const [drugCheckResults, setDrugCheckResults] = useState<DrugCheckResult[]>([]);

  // Helper function to format symptom names - moved before first usage
  const formatSymptomName = (symptom: string) => {
    return symptom.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

 const symptomsList = [
  'pelvic_pain', 'heavy_periods', 'painful_periods', 'fatigue', 'nausea', 'irregular_periods',
  'weight_gain', 'acne', 'hair_loss', 'mood_swings', 'cold_sensitivity', 'joint_pain',
  'butterfly_rash', 'fever', 'chest_pain', 'shortness_of_breath', 'jaw_pain', 'severe_headache',
  'light_sensitivity', 'sound_sensitivity', 'widespread_pain', 'sleep_problems', 'memory_issues',
  'bone_pain', 'fractures', 'back_pain', 'height_loss', 'weakness', 'pale_skin', 'cold_hands',
  'frequent_urination', 'burning_urination', 'cloudy_urine', 'dizziness', 'bloating', 'dry_skin',
  'depression', 'anxiety', 'muscle_weakness', 'posture_changes', 'stiffness', 'mouth_ulcers',
  'kidney_problems', 'skin_darkening', 'rapid_heartbeat', 'diarrhea', 'headache', 'hot_flashes',
  'night_sweats', 'abdominal_pain', 'tremors', 'muscle_stiffness', 'slow_movements',
  'balance_problems', 'voice_changes', 'handwriting_changes', 'constipation', 'brain_fog',
  'weight_fluctuations', 'extreme_fatigue', 'post_exertional_malaise', 'muscle_pain',
  'sore_throat', 'joint_hypermobility', 'skin_elasticity', 'easy_bruising', 'chronic_pain',
  'digestive_issues', 'heart_palpitations', 'weight_loss', 'skin_rash', 'anemia',
  'numbness_tingling', 'vision_problems', 'cognitive_issues', 'bladder_problems',
  'urinary_urgency', 'leg_discomfort', 'urge_to_move_legs', 'symptoms_worse_evening',
  'loud_snoring', 'gasping_during_sleep', 'morning_headaches', 'daytime_sleepiness',
  'difficulty_concentrating', 'difficulty_waking', 'salt_cravings', 'low_blood_pressure',
  'low_libido', 'memory_problems', 'cold_sweats', 'mood_changes', 'chronic_fatigue'
];

  // Convert symptom list to options for dropdown
  const symptomOptions = symptomsList.map(symptom => ({
    value: symptom,
    label: formatSymptomName(symptom)
  }));

  // Common family history conditions
  const familyHistoryOptions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'heart_disease', label: 'Heart Disease' },
    { value: 'cancer', label: 'Cancer' },
    { value: 'stroke', label: 'Stroke' },
    { value: 'mental_health', label: 'Mental Health Disorders' },
    { value: 'autoimmune', label: 'Autoimmune Diseases' },
    { value: 'thyroid', label: 'Thyroid Disorders' },
    { value: 'kidney_disease', label: 'Kidney Disease' },
    { value: 'liver_disease', label: 'Liver Disease' },
    { value: 'osteoporosis', label: 'Osteoporosis' },
    { value: 'alzheimers', label: "Alzheimer's Disease" },
    { value: 'parkinsons', label: "Parkinson's Disease" },
    { value: 'asthma', label: 'Asthma' },
    { value: 'copd', label: 'COPD' },
    { value: 'blood_clots', label: 'Blood Clots' },
    { value: 'high_cholesterol', label: 'High Cholesterol' },
    { value: 'obesity', label: 'Obesity' },
    { value: 'substance_abuse', label: 'Substance Abuse' },
    { value: 'epilepsy', label: 'Epilepsy' }
  ];

  // Common allergies
  const allergyOptions = [
    { value: 'penicillin', label: 'Penicillin' },
    { value: 'sulfa', label: 'Sulfa Drugs' },
    { value: 'aspirin', label: 'Aspirin' },
    { value: 'ibuprofen', label: 'Ibuprofen' },
    { value: 'codeine', label: 'Codeine' },
    { value: 'morphine', label: 'Morphine' },
    { value: 'latex', label: 'Latex' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'nuts', label: 'Tree Nuts' },
    { value: 'peanuts', label: 'Peanuts' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'milk', label: 'Milk/Dairy' },
    { value: 'soy', label: 'Soy' },
    { value: 'wheat', label: 'Wheat/Gluten' },
    { value: 'fish', label: 'Fish' },
    { value: 'sesame', label: 'Sesame' },
    { value: 'contrast_dye', label: 'Contrast Dye' },
    { value: 'iodine', label: 'Iodine' },
    { value: 'bee_stings', label: 'Bee Stings' },
    { value: 'pollen', label: 'Pollen' },
    { value: 'dust_mites', label: 'Dust Mites' },
    { value: 'pet_dander', label: 'Pet Dander' },
    { value: 'mold', label: 'Mold' },
    { value: 'nickel', label: 'Nickel' },
    { value: 'fragrances', label: 'Fragrances' }
  ];

  // Demo data for autofill
  const demoPatientData = {
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    weight: 145,
    height: 65,
    familyHistory: ['diabetes', 'hypertension', 'heart_disease'],
    allergies: ['penicillin', 'shellfish', 'latex'],
    symptoms: ['fatigue', 'headache', 'joint_pain', 'mood_swings', 'sleep_problems']
  };

  const handleAutofillDemo = () => {
    setPatientInfo({
      name: demoPatientData.name,
      age: demoPatientData.age,
      gender: demoPatientData.gender,
      weight: demoPatientData.weight,
      height: demoPatientData.height,
      familyHistory: demoPatientData.familyHistory,
      allergies: demoPatientData.allergies
    });
    setSelectedSymptoms(demoPatientData.symptoms);
    
    // Update symptoms object for API compatibility
    const symptomsObj: Record<string, number> = {};
    demoPatientData.symptoms.forEach(symptom => {
      symptomsObj[symptom] = 1;
    });
    setSymptoms(symptomsObj);
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: checked ? 1 : 0
    }));
  };

  const handleSymptomsChange = (selectedValues: string[]) => {
    setSelectedSymptoms(selectedValues);
    
    // Update symptoms object for API compatibility
    const symptomsObj: Record<string, number> = {};
    selectedValues.forEach(symptom => {
      symptomsObj[symptom] = 1;
    });
    setSymptoms(symptomsObj);
  };

  const handleDiagnosisSubmit = async () => {
    setLoading(true);
    setApiError('');
   
    try {
      const requestData = {
        age: patientInfo.age,
        gender: patientInfo.gender,
        symptoms: symptoms
      };

      const response = await fetch(`${API_BASE_URL}/diagnosis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
     
      if (data.status === 'success') {
        setDiagnosisResults(data.data.predictions);
        setSelectedDiagnosis(data.data.predictions[0]);
        setRecommendation(data.data.recommendation);
        setCurrentStep(2);
      } else {
        throw new Error(data.message || 'Diagnosis failed');
      }
    } catch (error) {
      console.error('Error calling diagnosis API:', error);
      setApiError('Failed to get diagnosis. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrugCheck = async () => {
    if (!drugCheckInput.drugName.trim()) return;
   
    setLoading(true);
    setApiError('');
   
    try {
      const requestData = {
        drug_name: drugCheckInput.drugName,
        age: patientInfo.age,
        is_pregnant: drugCheckInput.pregnancy,
        is_breastfeeding: drugCheckInput.breastfeeding
      };

      const response = await fetch(`${API_BASE_URL}/drug/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
     
      if (data.status === 'success') {
        setDrugCheckResults(prev => [data.data, ...prev]);
        setDrugCheckInput({
          drugName: '',
          pregnancy: drugCheckInput.pregnancy,
          breastfeeding: drugCheckInput.breastfeeding
        });
        setCurrentStep(3);
      } else {
        throw new Error(data.message || 'Drug analysis failed');
      }
    } catch (error) {
      console.error('Error calling drug analysis API:', error);
      setApiError('Failed to analyze drug. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOverrideDiagnosis = (diagnosis: DiagnosisResult) => {
    const updatedResults = diagnosisResults.map(d =>
      d.condition === diagnosis.condition
        ? { ...d, overridden: true }
        : d
    );
    setDiagnosisResults(updatedResults);
  };

  const handleFinalize = () => {
    alert('Diagnosis and drug checks finalized and saved to patient history.');
    // You can add navigation logic here
  };

  const getRiskColor = (level: string) => {
    const lowerLevel = level.toLowerCase();
    switch (lowerLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'contraindicated': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (level: string) => {
    const lowerLevel = level.toLowerCase();
    switch (lowerLevel) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      case 'very low': return 'text-red-700 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    const lowerSeverity = severity.toLowerCase();
    switch (lowerSeverity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    const lowerFreq = frequency.toLowerCase();
    switch (lowerFreq) {
      case 'rare': return 'text-green-600 bg-green-100';
      case 'common': return 'text-yellow-600 bg-yellow-100';
      case 'frequent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-600" />
              <span className="text-lg font-semibold text-gray-900">Clinical Decision Support</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Error Display */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800">{apiError}</span>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Symptom Input', icon: <Activity className="h-5 w-5" /> },
              { step: 2, title: 'Diagnosis Results', icon: <Brain className="h-5 w-5" /> },
              { step: 3, title: 'Drug Checker', icon: <Pill className="h-5 w-5" /> }
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= item.step
                    ? 'bg-rose-600 border-rose-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {item.icon}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= item.step ? 'text-rose-600' : 'text-gray-400'
                }`}>
                  {item.title}
                </span>
                {item.step < 3 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    currentStep > item.step ? 'bg-rose-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Symptom Input */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-rose-600" />
                Patient Information
                <button
                  onClick={handleAutofillDemo}
                  className="ml-auto text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Demo Autofill
                </button>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={patientInfo.age || ''}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <select
                  value={patientInfo.gender}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, gender: e.target.value }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="number"
                  placeholder="Weight (lbs)"
                  value={patientInfo.weight || ''}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Height (inches)"
                  value={patientInfo.height || ''}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-1 text-rose-600" />
                    Family History
                  </label>
                  <MultiSelectDropdown
                    options={familyHistoryOptions}
                    selectedValues={patientInfo.familyHistory}
                    onChange={(values) => setPatientInfo(prev => ({ ...prev, familyHistory: values }))}
                    placeholder="Select family medical history..."
                    searchPlaceholder="Search conditions..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1 text-rose-600" />
                    Known Allergies
                  </label>
                  <MultiSelectDropdown
                    options={allergyOptions}
                    selectedValues={patientInfo.allergies}
                    onChange={(values) => setPatientInfo(prev => ({ ...prev, allergies: values }))}
                    placeholder="Select known allergies..."
                    searchPlaceholder="Search allergies..."
                  />
                </div>
              </div>
            </div>

            {/* Vitals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-rose-600" />
                Vital Signs (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Blood Pressure (120/80)"
                  value={vitals.bloodPressure}
                  onChange={(e) => setVitals(prev => ({ ...prev, bloodPressure: e.target.value }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Heart Rate (bpm)"
                  value={vitals.heartRate || ''}
                  onChange={(e) => setVitals(prev => ({ ...prev, heartRate: parseInt(e.target.value) || 0 }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Temperature (°F)"
                  value={vitals.temperature || ''}
                  onChange={(e) => setVitals(prev => ({ ...prev, temperature: parseFloat(e.target.value) || 0 }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Respiratory Rate"
                  value={vitals.respiratoryRate || ''}
                  onChange={(e) => setVitals(prev => ({ ...prev, respiratoryRate: parseInt(e.target.value) || 0 }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Symptoms */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-rose-600" />
                Current Symptoms
              </h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select all symptoms the patient is experiencing
                </label>
                <MultiSelectDropdown
                  options={symptomOptions}
                  selectedValues={selectedSymptoms}
                  onChange={handleSymptomsChange}
                  placeholder="Search and select symptoms..."
                  searchPlaceholder="Type to search symptoms..."
                  maxDisplayItems={5}
                />
                {selectedSymptoms.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      Selected Symptoms ({selectedSymptoms.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map(symptom => (
                        <span key={symptom} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {formatSymptomName(symptom)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleDiagnosisSubmit}
                disabled={loading || !patientInfo.name || !patientInfo.age || !patientInfo.gender || selectedSymptoms.length === 0}
                className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5" />
                    <span>Get AI Diagnosis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Diagnosis Results */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Diagnosis Results</h3>
             
              {/* Recommendation */}
              {recommendation && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Recommendation:</h4>
                  <p className="text-blue-800">{recommendation}</p>
                </div>
              )}

              <div className="space-y-4">
                {diagnosisResults.map((diagnosis, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedDiagnosis?.condition === diagnosis.condition
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`} onClick={() => setSelectedDiagnosis(diagnosis)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{diagnosis.condition}</h4>
                          {diagnosis.overridden && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Overridden
                            </span>
                          )}
                        </div>
                       
                        {/* Relevant Symptoms */}
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">Relevant Symptoms:</p>
                          <div className="flex flex-wrap gap-2">
                            {diagnosis.relevant_symptoms.map((symptom, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {formatSymptomName(symptom)}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOverrideDiagnosis(diagnosis);
                            }}
                            className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                          >
                            Override Diagnosis
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </button>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-rose-600 mb-1">{diagnosis.confidence.toFixed(1)}%</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(diagnosis.confidence_level)}`}>
                          {diagnosis.confidence_level} Confidence
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Symptoms
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center space-x-2"
              >
                <Pill className="h-5 w-5" />
                <span>Check Medications</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Drug Checker */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Drug Checker Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Pill className="h-5 w-5 mr-2 text-rose-600" />
                Drug Safety Checker
              </h3>
             
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter drug name (e.g., ACE_Inhibitors, Ibuprofen)"
                      value={drugCheckInput.drugName}
                      onChange={(e) => setDrugCheckInput(prev => ({ ...prev, drugName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <UserCheck className="h-4 w-4 mr-1" />
                    Patient Age: {patientInfo.age} years
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={drugCheckInput.pregnancy}
                      onChange={(e) => setDrugCheckInput(prev => ({ ...prev, pregnancy: e.target.checked }))}
                      className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <Baby className="h-4 w-4 mr-1 text-pink-500" />
                      Pregnancy
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={drugCheckInput.breastfeeding}
                      onChange={(e) => setDrugCheckInput(prev => ({ ...prev, breastfeeding: e.target.checked }))}
                      className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-blue-500" />
                      Breastfeeding
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleDrugCheck}
                  disabled={loading || !drugCheckInput.drugName.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      <span>Check Drug Safety</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Drug Check Results */}
            {drugCheckResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Drug Safety Results</h3>
                {drugCheckResults.map((result, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{result.drug_name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Age Group: {result.age_group}</span>
                          <span>Risk Score: {result.risk_score.toFixed(2)}/10</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(result.risk_level)}`}>
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          {result.risk_level.toUpperCase()} RISK
                        </span>
                        <div className="mt-2 flex items-center text-sm">
                          {result.requires_monitoring ? (
                            <span className="text-orange-600 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Monitoring Required
                            </span>
                          ) : (
                            <span className="text-green-600 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              No Monitoring
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Side Effects */}
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Side Effects</h5>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {result.side_effects.map((effect, idx) => (
                            <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <span className="font-medium text-gray-800">
                                  {formatSymptomName(effect.side_effect)}
                                </span>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(effect.severity)}`}>
                                  {effect.severity}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(effect.frequency)}`}>
                                  {effect.frequency} ({effect.frequency_percentage})
                                </span>
                                <div className="flex items-center space-x-2">
                                  {effect.gender_specific !== "General" && (
                                    <span className="text-purple-600 text-xs">
                                      {effect.gender_specific.replace('_', ' ')}
                                    </span>
                                  )}
                                  {effect.requires_monitoring === "Yes" && (
                                    <span className="text-orange-600 text-xs flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      Monitor
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Category: {effect.category}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Alternatives & Considerations */}
                      <div className="space-y-4">
                        {/* Safer Alternatives */}
                        {result.safer_alternatives.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-3">Safer Alternatives</h5>
                            <div className="space-y-2">
                              {result.safer_alternatives.map((alt, idx) => (
                                <div key={idx} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <span className="text-green-800 font-medium">{alt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pregnancy & Breastfeeding Warnings */}
                        {(result.pregnancy_risk || result.breastfeeding_risk) && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-3">Special Warnings</h5>
                            <div className="space-y-2">
                              {result.pregnancy_risk && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                  <div className="flex items-center">
                                    <Baby className="h-4 w-4 text-red-600 mr-2" />
                                    <span className="font-medium text-red-800">Pregnancy Risk:</span>
                                  </div>
                                  <p className="text-red-700 mt-1">{result.pregnancy_risk}</p>
                                </div>
                              )}
                              {result.breastfeeding_risk && (
                                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                  <div className="flex items-center">
                                    <Heart className="h-4 w-4 text-orange-600 mr-2" />
                                    <span className="font-medium text-orange-800">Breastfeeding Risk:</span>
                                  </div>
                                  <p className="text-orange-700 mt-1">{result.breastfeeding_risk}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Special Considerations */}
                        {result.special_considerations.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-3">Special Considerations</h5>
                            <div className="space-y-2">
                              {result.special_considerations.map((consideration, idx) => (
                                <div key={idx} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <span className="text-blue-800">{consideration}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Diagnosis
              </button>
              <button
                onClick={handleFinalize}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Finalize & Save</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalDecisionPage;
