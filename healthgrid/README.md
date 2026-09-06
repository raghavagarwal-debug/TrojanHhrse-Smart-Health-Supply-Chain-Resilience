# ArogyaPulse: Public Health Intelligence Command Center

ArogyaPulse is an AI-powered public-health decision-support platform designed for Primary Health Centres (PHCs). It uses real-time federated data streams and XGBoost machine learning to predict medical supply demand, warn about stockouts, and simulate emergency scenarios.

**Disclaimer (Hackathon Purposes Only)**: 
*The data populated in this platform during demonstrations is entirely synthetic. It is strictly for demonstration and testing purposes. We do not claim that any synthetic data shown here represents real government data, patient records, or official state metrics.*

## Features

- **Live Risk Map**: Interactive geographic map visualizing PHC network stress levels using `react-leaflet`.
- **Demand Forecasting**: 7-day predictive models powered by XGBoost, visualized with Recharts.
- **WHAT-IF Emergency Simulator**: An interactive sandbox allowing health officers to simulate disease outbreaks or supply chain disruptions.
- **Role-Based Access Control**: Secure JWT-based access for National, State, and District Admins, Supply Officers, and PHC Staff.
- **Multi-Service Architecture**: Next.js (Frontend) → Node.js Express (API Gateway) → FastAPI (ML Service) → PostgreSQL (Data).

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui, Recharts, React Leaflet.
- **Backend API**: Node.js, Express, TypeScript, Prisma, PostgreSQL.
- **AI Service**: Python, FastAPI/Flask, Pandas, scikit-learn, XGBoost.

## Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- Python (3.9+)
- PostgreSQL
- Docker (optional, for containerized running)

### 2. Environment Variables

Create a `.env` file in the `/backend` directory:
```env
PORT=4000
DATABASE_URL="postgresql://postgres:password@localhost:5432/arogyapulse?schema=public"
JWT_SECRET="super_secret_jwt_key_123"
ML_SERVICE_URL="http://127.0.0.1:8000"
```

Create a `.env.local` file in the `/frontend` directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

### 3. Start PostgreSQL Database
Ensure your local PostgreSQL is running on port `5432` with the credentials specified in the `DATABASE_URL`.

### 4. Run the Backend API
```bash
cd backend
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

### 5. Run the AI Service
```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

### 6. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Access the application at `http://localhost:3000`.

## Docker Setup (Production/Demo)

To run the entire stack using Docker Compose:

```bash
docker-compose up --build
```
- Frontend will be available on `http://localhost:3000`
- Backend API will be available on `http://localhost:5000`
- AI Service will be available on `http://localhost:8000`

## Demo Accounts

For local demo and testing purposes, the database seeding script populates the following accounts. You can log in using any of these emails with the password `password123`.

| Role | Email | Password |
|------|-------|----------|
| National Admin | `national@arogyapulse.in` | `password123` |
| State Admin | `state@arogyapulse.in` | `password123` |
| District Admin | `district@arogyapulse.in` | `password123` |
| PHC Staff | `staff@arogyapulse.in` | `password123` |
| Supply Officer | `logistics@arogyapulse.in` | `password123` |
| Emergency Officer | `emergency@arogyapulse.in` | `password123` |

## Acknowledgments
Built for Hackquest 2026.
