#!/usr/bin/env python3
"""
Script to create an admin user for Quizzera.
Run this after the database is set up and migrations are applied.
"""

import os
import sys
from sqlalchemy.orm import Session

# Add the app directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal
from app.models.user import User
from app.security.auth import get_password_hash


def create_admin_user(email: str, password: str, role: str = "admin"):
    """Create an admin user in the database."""
    db = SessionLocal()
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"User {email} already exists. Updating role to {role}...")
            existing_user.role = role
            db.commit()
            print(f"Updated user {email} with role {role}")
            return

        # Create new admin user
        hashed_password = get_password_hash(password)
        admin_user = User(
            email=email,
            hashed_password=hashed_password,
            role=role,
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print(f"Successfully created admin user: {email}")
        print(f"User ID: {admin_user.id}")
        print(f"Role: {admin_user.role}")
        
    except Exception as e:
        print(f"Error creating admin user: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    # Admin user credentials
    ADMIN_EMAIL = "shahidsoomro786@gmail.com"
    ADMIN_PASSWORD = "Shahid@786"
    
    print("Creating admin user...")
    create_admin_user(ADMIN_EMAIL, ADMIN_PASSWORD, "admin")
    print("Admin user creation completed!")