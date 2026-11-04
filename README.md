# DiagHer 🩺💜

**AI-powered clinical decision support for gender-aware healthcare.** Built by Team **CodeRed**.

Women are more likely to be misdiagnosed or have their diagnosis delayed, and they report more adverse drug reactions than men. DiagHer helps healthcare providers in two ways:

- **AI diagnosis:** enter a patient's age, gender and symptoms, and get the 3 most likely conditions with confidence scores, the symptoms behind each one, and a recommendation.
- **Drug safety check:** check a medication for women-specific side effects and pregnancy or breastfeeding risks, and get safer alternatives.

The app also includes a doctor dashboard, patient records, patient profiles with AI insights, and a menstrual cycle tracker.

> For the full project background, goals and roadmap, see [frontend/Readme.md](frontend/Readme.md).

![System Architecture](frontend/interface/Medical%20Center.png)

---

## Tech stack

| Part | Technologies |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, React Router |
| Backend | Python 3.10, Flask, Flask-CORS, Gunicorn |
| Machine learning | scikit-learn (Logistic Regression), pandas, numpy, joblib |
| Hosting | Vercel (frontend), Render (backend) |

### The diagnosis model

- Trained on [backend/data/symptoms_data.csv](backend/data/symptoms_data.csv) using **97 features** (age, gender and symptoms).
- Predicts **22 conditions** that are often missed in women, including Endometriosis, PCOS, Lupus, Hypothyroidism, Female Heart Disease, Fibromyalgia, Migraine and Menopause/Perimenopause, plus a "Low Clinical Concern" class.
- The trained model files are stored in [backend/ml/models/](backend/ml/models/), so the app works without training first.

---

## Project structure

```
DiagHer-app/
├── backend/                  Flask API
│   ├── app/routes.py         API endpoints
│   ├── ml/
│   │   ├── diagnosis_model/  predictor.py, train_model.py
│   │   ├── drug_model/       drug_analyzer.py
│   │   └── models/           trained model files (.pkl)
│   ├── data/                 symptom and drug datasets (CSV)
│   ├── config.py, utils.py
│   ├── requirements.txt
│   └── run.py                app entry point
├── frontend/                 React app
│   ├── src/pages/            Landing, Login, Dashboard, ClinicalDecision, Patients, ...
│   ├── interface/            screenshots
│   ├── vite.config.ts        local dev proxy: /api goes to Flask
│   └── vercel.json           production: /api goes to Render
└── render.yaml               Render deployment config for the backend
```

---

## Running locally

### Requirements
- **Python 3.10**
- **Node.js 18+** and npm

### 1. Start the backend (port 5000)

```bash
cd backend
python -m venv venv

# Windows (PowerShell)
.\venv\Scripts\Activate.ps1
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
python run.py
```

To check it's running, open http://127.0.0.1:5000/api/health. You should see `"DiagHer API running"`.

### 2. Start the frontend (port 5173)

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 and log in with the demo account:

| Email | Password |
|---|---|
| `doctor@diagher.com` | `demo123` |

### How the frontend reaches the backend

The frontend always calls `/api/v1/...`, and each environment forwards those requests to the right place, so no URLs need to change between local and production:

- **Locally:** the Vite dev server forwards `/api` to `http://127.0.0.1:5000` ([vite.config.ts](frontend/vite.config.ts)).
- **On Vercel:** a rewrite in [vercel.json](frontend/vercel.json) forwards `/api` to the Render backend.

To use a different backend, set `VITE_API_BASE_URL` in `frontend/.env`.

---

## Deployment

### Backend on Render
1. On [Render](https://render.com), choose **New + → Blueprint** and select this repo.
2. Render reads [render.yaml](render.yaml) (free plan, Python 3.10, Gunicorn) and builds the `backend/` folder.
3. When it shows **Live**, open `https://<your-service>.onrender.com/api/health` to check it's working.

On the free plan the backend sleeps when idle, so the first request afterwards can take 30–60 seconds.

### Frontend on Vercel
1. Put your Render URL in [frontend/vercel.json](frontend/vercel.json).
2. On [Vercel](https://vercel.com), choose **Add New → Project**, import this repo, and set **Root Directory** to `frontend`.
3. Deploy. Vercel detects Vite and builds it with `npm run build`.

Every push to `main` redeploys both automatically.

### Library versions
The `.pkl` model files only load with the library versions they were saved with. If you retrain the model, update `scikit-learn`, `numpy`, `pandas` and `joblib` in [requirements.txt](backend/requirements.txt) to match your environment. Otherwise the model will fail to load in production.

---

## API reference

Base URL: `/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/v1/diagnosis` | Top 3 predicted conditions, with confidence and relevant symptoms |
| POST | `/api/v1/diagnosis/simple` | Simplified diagnosis response |
| POST | `/api/v1/diagnosis/explain` | Explanation of a prediction |
| POST | `/api/v1/feedback` | Submit a confirmed diagnosis (feedback) |
| GET | `/api/v1/model/info` | Model metadata |
| POST | `/api/v1/drug/analyze` | Analyze one drug for women-specific risks |
| POST | `/api/v1/drug/analyze-medications` | Analyze several medications |
| GET | `/api/v1/drug/alternatives` | Safer alternative treatments |
| GET | `/api/v1/drug/info` | Drug information |
| GET | `/api/v1/drug/available-drugs` | List of drugs in the dataset |

**Example: diagnosis**

```bash
curl -X POST http://127.0.0.1:5000/api/v1/diagnosis \
  -H "Content-Type: application/json" \
  -d '{"age": 30, "gender": "Female", "symptoms": {"fatigue": 1, "pelvic_pain": 1, "painful_periods": 1}}'
```

`gender` must be `"Male"`, `"Female"` or `"Other"`. Symptom names match the column names in `symptoms_data.csv`.

**Example: drug check**

```bash
curl -X POST http://127.0.0.1:5000/api/v1/drug/analyze \
  -H "Content-Type: application/json" \
  -d '{"drug_name": "ibuprofen", "age": 30, "is_pregnant": false, "is_breastfeeding": false}'
```

---

## ⚠️ Disclaimer

DiagHer is a decision support tool for healthcare providers. It does **not** replace professional medical judgment, and it should not be used as the only basis for a diagnosis or treatment decision.
