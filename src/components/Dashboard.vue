<template>
    <div class="dashboard">
      <h1>User Details</h1>
      <div class="user-details">
        <div class="grid-container">
          <!-- Left Column: User Information -->
          <div class="left-column">
            <h2>User Information</h2>
            <div>
              <strong>Username:</strong> {{ user.username || "Loading..." }}
            </div>
            <div>
              <strong>Name:</strong> {{ user.name || "Loading..." }}
            </div>
            <div>
              <strong>Date of Birth:</strong> {{ user.dob ? formatDate(user.dob) : "Loading..." }}
            </div>
          </div>
  
          <!-- Right Column: Contact Information -->
          <div class="right-column">
            <h2>Contact Information</h2>
            <div>
              <strong>Email:</strong> {{ user.email || "Loading..." }}
            </div>
            <div>
              <strong>Age:</strong> {{ user.age || "Loading..." }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: {
          username: "",
          name: "",
          dob: "",
          email: "",
          age: null,
        },
      };
    },
    mounted() {
      this.fetchUserDetails();
    },
    methods: {
      async fetchUserDetails() {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            this.$router.push("/login");
            return;
          }
  
          const response = await axios.get("http://localhost:5000/api/userdetails", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('User details received:', response.data); // Log the received data

          this.user = response.data[0]; // Update user details from the API response
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      },
      formatDate(date) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 800px;
    margin: 20px auto;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .user-details {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two equal columns */
    gap: 30px;
    margin-top: 20px;
  }
  
  .left-column,
  .right-column {
    display: flex;
    flex-direction: column;
  }
  
  h2 {
    color: #333;
    margin-top: 20px;
  }
  
  div {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
  }
  
  strong {
    font-weight: bold;
  }
  </style>
    