import requests

BASE_URL = "http://localhost:3001"  # Replace with your backend's actual base URL

# Add demo users
def create_users():
    users = [
        {"email": "john@example.com", "password": "password123", "name": "John Doe", "contactInfo": "123-456-7890", "type": "Traveler"},
        {"email": "jane@example.com", "password": "securepass", "name": "Jane Smith", "contactInfo": "098-765-4321", "type": "LocalOperator"},
        {"email": "admin@example.com", "password": "adminpass", "name": "Admin User", "contactInfo": "111-222-3333", "type": "Admin"}
    ]
    for user in users:
        response = requests.post(f"{BASE_URL}/users", json=user)
        if response.status_code == 201:
            print(f"User {user['email']} created successfully!")
        else:
            print(f"Failed to create user {user['email']}: {response.text}")

# Add demo services
def create_services():
    services = [
        {"name": "City Tour", "description": "Explore the city's landmarks with a guide.", "price": 100.0},
        {"name": "Mountain Hike", "description": "A day-long guided hike in the mountains.", "price": 150.0},
        {"name": "Local Cuisine Tasting", "description": "Taste authentic local dishes with a local chef.", "price": 80.0}
    ]
    for service in services:
        response = requests.post(f"{BASE_URL}/services", json=service)
        if response.status_code == 201:
            print(f"Service '{service['name']}' created successfully!")
        else:
            print(f"Failed to create service '{service['name']}': {response.text}")

# Add demo bookings
def create_bookings():
    bookings = [
        {"userId": 1, "serviceId": 1, "date": "2024-11-20"},
        {"userId": 2, "serviceId": 2, "date": "2024-11-25"},
        {"userId": 1, "serviceId": 3, "date": "2024-12-01"}
    ]
    for booking in bookings:
        response = requests.post(f"{BASE_URL}/bookings", json=booking)
        if response.status_code == 201:
            print(f"Booking for user {booking['userId']} and service {booking['serviceId']} created successfully!")
        else:
            print(f"Failed to create booking for user {booking['userId']}: {response.text}")

if __name__ == "__main__":
    print("Seeding demo data into GoLocal backend...")
    
    print("\nCreating users...")
    create_users()

    print("\nCreating services...")
    create_services()

    print("\nCreating bookings...")
    create_bookings()

    print("\nSeeding completed!")
