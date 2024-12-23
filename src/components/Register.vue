<template>
    <div class="register-container">
      <h2>Register</h2>
  
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
  
        <div class="form-group">
          <label for="age">Age:</label>
          <input type="number" id="age" v-model="user.age" required />
        </div>
  
        <div class="form-group">
          <label for="dob">Date of Birth:</label>
          <input type="date" id="dob" v-model="user.dob" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
  
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
  
        <button type="submit">Register</button>
      </form>
  
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: {
          name: "",
          age: "",
          dob: "",
          email: "",
          username: "",
          password: "",
        },
        errorMessage: "",
        successMessage: "",
      };
    },
    methods: {
      async handleRegister() {
        // Clear any previous messages
        this.errorMessage = "";
        this.successMessage = "";
  
        try {
          // Make API call to register the user
          const response = await axios.post("http://localhost:5000/api/auth/register", this.user);
          this.successMessage = "Registration successful! Please log in.";
          this.user = {}; // Clear form data after successful registration
        } catch (error) {
          if (error.response && error.response.data) {
            this.errorMessage = error.response.data.message || "An error occurred during registration.";
          } else {
            this.errorMessage = "Server error. Please try again later.";
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .error-message {
    color: red;
    margin-top: 15px;
  }
  
  .success-message {
    color: green;
    margin-top: 15px;
  }
  </style>
  