import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const ProfileComponent = () => {
  const { userType, userId } = useContext(UserContext);
  const [user, setUser] = useState(null);

  console.log('userId..!!', userId);
  console.log('userType..!!', userType);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
          body: JSON.stringify({
            query: `
              query GetUser($id: ID!, $userType: String!) {
                getUser(id: $id, userType: $userType) {
                  username
                  email
                  userType
                  profilePicture
                }
              }
            `,
            variables: {
              id: userId, // Use userId from the context
              userType: userType, // Pass userType from the context
            },
          }),
        });

        const result = await response.json();
        if (result.data && result.data.getUser) {
          setUser(result.data.getUser);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error:', err.message);
      }
    };
    fetchUserData();
  }, [userId, userType]);

  return (
    <div>
      <style>
        {`
          html, body {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
          }

          .profile-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f8f9fa; /* Light gray background */
            padding: 20px;
            text-align: center;
          }

          .profile-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            padding: 20px;
            width: 100%;
          }

          .profile-card img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 15px;
          }

          .profile-card h3 {
            margin-bottom: 15px;
          }

          .spinner {
            color: #007bff;
            margin-top: 20px;
          }
        `}
      </style>
      <div className="profile-container">
        <h2 className="text-primary mb-4">Dashboard</h2>
        {user ? (
          <div className="profile-card">
            <h3>Profile Information</h3>
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
              />
            ) : (
              <img
                src="https://via.placeholder.com/150?text=No+Image"
                alt="Profile Placeholder"
              />
            )}
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User Type:</strong> {user.userType}</p>
          </div>
        ) : (
          <div>
            <div className="spinner-border spinner" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p>Loading user data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
