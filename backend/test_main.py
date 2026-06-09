import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

class TestHealthEndpoints:
    """Test health and status endpoints"""
    
    def test_root_endpoint(self):
        """Test root endpoint returns API info"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "GreenPulse AI" in data["message"]
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
    
    def test_api_test_endpoint(self):
        """Test API test endpoint"""
        response = client.get("/api/test")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"


class TestCarbonCalculation:
    """Test carbon footprint calculation endpoints"""
    
    def test_calculate_impact_valid_data(self):
        """Test carbon calculation with valid data"""
        payload = {
            "transportation": {
                "car_km": 100,
                "public_transport_km": 50,
                "flights_short": 2,
                "flights_long": 1
            },
            "energy": {
                "electricity_kwh": 300,
                "natural_gas_kwh": 150,
                "heating_oil_liters": 0
            },
            "food": {
                "meat_servings": 10,
                "dairy_servings": 14,
                "local_food_percentage": 30
            },
            "waste": {
                "general_waste_kg": 20,
                "recycling_percentage": 50
            },
            "lifestyle": {
                "new_clothes": 5,
                "electronics": 1,
                "water_usage_liters": 150
            }
        }
        response = client.post("/api/calculate-impact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "total_carbon" in data
        assert "breakdown" in data
        assert data["total_carbon"] > 0
    
    def test_calculate_impact_empty_data(self):
        """Test carbon calculation with empty data"""
        payload = {
            "transportation": {},
            "energy": {},
            "food": {},
            "waste": {},
            "lifestyle": {}
        }
        response = client.post("/api/calculate-impact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["total_carbon"] >= 0
    
    def test_calculate_impact_missing_fields(self):
        """Test carbon calculation with missing fields"""
        payload = {
            "transportation": {
                "car_km": 50
            }
        }
        response = client.post("/api/calculate-impact", json=payload)
        # Should handle missing fields gracefully
        assert response.status_code in [200, 422]


class TestAIAdvisor:
    """Test AI advisor endpoints"""
    
    def test_ai_advisor_basic(self):
        """Test basic AI advisor query"""
        payload = {
            "query": "How can I reduce my carbon footprint?",
            "carbon_data": {
                "total": 250,
                "transportation": 100,
                "energy": 80,
                "food": 50,
                "waste": 20
            }
        }
        response = client.post("/api/ai-advisor", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert len(data["response"]) > 0
    
    def test_ai_advisor_empty_query(self):
        """Test AI advisor with empty query"""
        payload = {
            "query": "",
            "carbon_data": {"total": 250}
        }
        response = client.post("/api/ai-advisor", json=payload)
        assert response.status_code in [200, 422]
    
    def test_ai_advisor_advanced(self):
        """Test advanced AI advisor"""
        payload = {
            "query": "transportation tips",
            "carbon_data": {"transportation": 150},
            "user_profile": {"lifestyle": "urban"}
        }
        response = client.post("/api/ai-advisor-advanced", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "response" in data


class TestPredictions:
    """Test prediction endpoints"""
    
    def test_predict_impact(self):
        """Test carbon prediction"""
        payload = {
            "historical_data": [
                {"month": "Jan", "carbon": 300},
                {"month": "Feb", "carbon": 280},
                {"month": "Mar", "carbon": 260},
                {"month": "Apr", "carbon": 250}
            ],
            "months_ahead": 6
        }
        response = client.post("/api/predict-impact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "predictions" in data
        assert "confidence" in data
        assert len(data["predictions"]) == 6
        assert data["confidence"] > 0
    
    def test_predict_impact_insufficient_data(self):
        """Test prediction with insufficient data"""
        payload = {
            "historical_data": [
                {"month": "Jan", "carbon": 300}
            ],
            "months_ahead": 6
        }
        response = client.post("/api/predict-impact", json=payload)
        # Should handle gracefully
        assert response.status_code in [200, 422]


class TestBenchmarking:
    """Test benchmarking endpoints"""
    
    def test_benchmark_comparison(self):
        """Test benchmark comparison"""
        payload = {
            "user_carbon": 250,
            "category": "overall"
        }
        response = client.post("/api/benchmark", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "comparison" in data
        assert "percentile" in data
        assert "recommendations" in data
    
    def test_benchmark_below_average(self):
        """Test benchmark for below average user"""
        payload = {
            "user_carbon": 150,
            "category": "overall"
        }
        response = client.post("/api/benchmark", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["comparison"]["global_average"] > 150


class TestChallenges:
    """Test challenge endpoints"""
    
    def test_get_challenges(self):
        """Test getting challenges list"""
        response = client.get("/api/challenges")
        assert response.status_code == 200
        data = response.json()
        assert "challenges" in data
        assert len(data["challenges"]) > 0
    
    def test_challenges_structure(self):
        """Test challenges have correct structure"""
        response = client.get("/api/challenges")
        data = response.json()
        challenge = data["challenges"][0]
        assert "id" in challenge
        assert "title" in challenge
        assert "difficulty" in challenge
        assert "points" in challenge


class TestAnalytics:
    """Test analytics endpoints"""
    
    def test_get_analytics(self):
        """Test getting platform analytics"""
        response = client.get("/api/analytics")
        assert response.status_code == 200
        data = response.json()
        assert "total_users" in data
        assert "total_carbon_saved" in data
        assert "active_challenges" in data
    
    def test_analytics_values(self):
        """Test analytics return positive values"""
        response = client.get("/api/analytics")
        data = response.json()
        assert data["total_users"] > 0
        assert data["total_carbon_saved"] > 0


class TestDashboard:
    """Test dashboard endpoints"""
    
    def test_dashboard_endpoint(self):
        """Test dashboard data endpoint"""
        response = client.get("/api/dashboard/test_user_123")
        assert response.status_code == 200
        data = response.json()
        assert "user_id" in data
        assert "stats" in data
    
    def test_dashboard_stats_structure(self):
        """Test dashboard stats structure"""
        response = client.get("/api/dashboard/test_user_123")
        data = response.json()
        stats = data["stats"]
        assert "total_carbon" in stats
        assert "monthly_trend" in stats


# Performance Tests
class TestPerformance:
    """Test API performance"""
    
    def test_response_time_health(self):
        """Test health endpoint response time"""
        import time
        start = time.time()
        response = client.get("/health")
        duration = time.time() - start
        assert response.status_code == 200
        assert duration < 1.0  # Should respond within 1 second
    
    def test_response_time_calculation(self):
        """Test calculation endpoint response time"""
        import time
        payload = {
            "transportation": {"car_km": 100},
            "energy": {"electricity_kwh": 300},
            "food": {"meat_servings": 10},
            "waste": {"general_waste_kg": 20},
            "lifestyle": {"water_usage_liters": 150}
        }
        start = time.time()
        response = client.post("/api/calculate-impact", json=payload)
        duration = time.time() - start
        assert response.status_code == 200
        assert duration < 2.0  # Should calculate within 2 seconds


# Run tests with: pytest test_main.py -v
# Run with coverage: pytest test_main.py --cov=main --cov-report=html
