from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
from datetime import datetime

app = FastAPI(title="GreenPulse AI API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://*.vercel.app",
        "https://greenpulse-ai.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ImpactCalculation(BaseModel):
    carMiles: Optional[float] = 0
    publicTransport: Optional[float] = 0
    flights: Optional[float] = 0
    electricity: Optional[float] = 0
    heating: Optional[float] = 0
    showerMinutes: Optional[float] = 0
    laundry: Optional[float] = 0
    diet: str = "mixed"
    recycling: str = "sometimes"

class ImpactResult(BaseModel):
    carbon: float
    water: float
    score: float
    rating: str
    recommendations: List[str]

class AIQuery(BaseModel):
    message: str
    userId: Optional[str] = None

@app.get("/")
def read_root():
    return {
        "message": "Welcome to GreenPulse AI API",
        "version": "1.0.0",
        "status": "active"
    }

@app.post("/api/calculate-impact", response_model=ImpactResult)
def calculate_impact(data: ImpactCalculation):
    """Calculate environmental impact based on user habits"""
    
    # Carbon calculation (kg CO2 per month)
    carbon_transport = (data.carMiles or 0) * 0.4 * 4  # per month
    carbon_flights = (data.flights or 0) * 90 / 12  # annual to monthly
    carbon_electricity = (data.electricity or 0) * 0.5
    carbon_heating = (data.heating or 0) * 5.3
    
    # Diet impact
    diet_factors = {
        "vegan": 1.5,
        "vegetarian": 1.7,
        "mixed": 2.5,
        "meat-heavy": 3.3
    }
    carbon_diet = diet_factors.get(data.diet, 2.5) * 30
    
    total_carbon = carbon_transport + carbon_flights + carbon_electricity + carbon_heating + carbon_diet
    
    # Water calculation (liters per month)
    water_shower = (data.showerMinutes or 0) * 9 * 30
    water_laundry = (data.laundry or 0) * 40 * 4
    water_diet = diet_factors.get(data.diet, 2.5) * 1000
    
    total_water = water_shower + water_laundry + water_diet
    
    # Score calculation (0-100, higher is better)
    carbon_penalty = min(total_carbon / 10, 50)
    water_penalty = min(total_water / 1000, 30)
    recycling_bonus = {"always": 10, "often": 7, "sometimes": 3, "rarely": 0}.get(data.recycling, 0)
    
    score = max(0, 100 - carbon_penalty - water_penalty + recycling_bonus)
    
    # Rating
    if score >= 80:
        rating = "Excellent"
    elif score >= 60:
        rating = "Good"
    elif score >= 40:
        rating = "Fair"
    else:
        rating = "Needs Improvement"
    
    # Recommendations
    recommendations = []
    if carbon_transport > 50:
        recommendations.append("Consider using public transport or carpooling to reduce transport emissions")
    if carbon_electricity > 150:
        recommendations.append("Switch to LED bulbs and energy-efficient appliances")
    if water_shower > 3000:
        recommendations.append("Reduce shower time to 5-7 minutes to save water")
    if data.diet == "meat-heavy":
        recommendations.append("Try incorporating more plant-based meals")
    if data.recycling in ["sometimes", "rarely"]:
        recommendations.append("Improve recycling habits to reduce waste")
    
    return ImpactResult(
        carbon=round(total_carbon, 1),
        water=round(total_water, 0),
        score=round(score, 1),
        rating=rating,
        recommendations=recommendations[:3]
    )

@app.post("/api/ai-advisor")
def ai_advisor(query: AIQuery):
    """AI-powered eco advisor (mock implementation)"""
    message = query.message.lower()
    
    # Simple rule-based responses (replace with actual AI API)
    if "carbon" in message or "footprint" in message:
        response = {
            "message": "To reduce your carbon footprint:\n\n1. 🚲 Switch to cycling or public transport\n2. 💡 Use LED bulbs and energy-efficient appliances\n3. 🌱 Eat more plant-based meals\n4. ♻️ Recycle and compost\n5. 🏠 Improve home insulation",
            "tips": ["Use renewable energy", "Fly less", "Buy local produce"],
            "impact": "These changes can reduce emissions by 30-40%"
        }
    elif "water" in message:
        response = {
            "message": "Water conservation tips:\n\n1. 🚿 Take shorter showers (5-7 min)\n2. 🚰 Fix leaky faucets\n3. 🌱 Use drought-resistant plants\n4. 🍽️ Run dishwasher only when full\n5. 💧 Collect rainwater",
            "tips": ["Install low-flow fixtures", "Reuse greywater", "Water plants in evening"],
            "impact": "Save up to 500L per week"
        }
    else:
        response = {
            "message": "I can help with:\n\n• Carbon footprint reduction\n• Water conservation\n• Energy efficiency\n• Sustainable lifestyle tips\n• Waste management\n\nWhat would you like to know more about?",
            "tips": ["Start with small changes", "Track your progress", "Share with friends"],
            "impact": "Every action counts!"
        }
    
    return response

@app.get("/api/challenges")
def get_challenges():
    """Get available eco challenges"""
    return {
        "active": [
            {
                "id": 1,
                "title": "Plastic-Free Week",
                "description": "Avoid single-use plastics for 7 days",
                "progress": 0,
                "goal": 7,
                "points": 250,
                "participants": 1250
            },
            {
                "id": 2,
                "title": "Zero Food Waste",
                "description": "Compost and reduce food waste",
                "progress": 0,
                "goal": 10,
                "points": 300,
                "participants": 890
            }
        ],
        "completed": []
    }

@app.get("/api/dashboard/{user_id}")
def get_dashboard(user_id: str):
    """Get user dashboard data"""
    return {
        "monthlyData": [
            {"month": "Jan", "carbon": 320, "water": 4200, "score": 65},
            {"month": "Feb", "carbon": 280, "water": 3900, "score": 72},
            {"month": "Mar", "carbon": 250, "water": 3600, "score": 78},
            {"month": "Apr", "carbon": 220, "water": 3300, "score": 82},
            {"month": "May", "carbon": 200, "water": 3000, "score": 85},
            {"month": "Jun", "carbon": 180, "water": 2800, "score": 88}
        ],
        "currentStats": {
            "carbon": 180,
            "water": 2800,
            "score": 88,
            "points": 1250
        },
        "badges": [
            {"name": "Eco Starter", "unlocked": True},
            {"name": "Water Saver", "unlocked": True},
            {"name": "Green Warrior", "unlocked": True},
            {"name": "Carbon Cutter", "unlocked": False},
            {"name": "Planet Hero", "unlocked": False}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
