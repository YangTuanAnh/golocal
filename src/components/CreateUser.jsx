import React, { useState } from 'react';
import { createUser } from '../api/api';

const CreateUser = () => {
  const [user, setUser] = useState({ email: '', password: '', name: '', contactInfo: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(user);
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="contactInfo" placeholder="Contact Info" onChange={handleChange} />
        <select name="type" onChange={handleChange} required>
          <option value="">Select User Type</option>
          <option value="Traveler">Traveler</option>
          <option value="LocalOperator">Local Operator</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreateUser;
