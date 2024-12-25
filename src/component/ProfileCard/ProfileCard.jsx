import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    image: null,
  });

  // Fetch user data from the API
  useEffect(() => {
    fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
      .then((response) => response.json())
      .then((data) => {
        const user = data.results[0];
        setProfile({
          firstName: user.name.first,
          lastName: user.name.last,
          gender: user.gender,
          phoneNumber: user.phone,
          image: user.picture.large,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prevState) => ({ ...prevState, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-card">
      <div className="image-section">
        {profile.image ? (
          <img src={profile.image} alt="Profile" className="profile-image" />
        ) : (
          <div className="placeholder">Image</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
      </div>
      <div className="info-section">
        <div className="input-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            placeholder="Enter First Name"
          />
        </div>
        <div className="input-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
          />
        </div>
        <div className="input-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter Phone Number"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
