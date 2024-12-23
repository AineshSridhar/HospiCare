
<script>
import axios from 'axios';
import loginImage from '@/assets/images/loginImage.jpg';
console.log('loginImage:', loginImage);

export default {
  data() {
    return {
      loginImage,
      username: '',
      password: '',
      showLogin: true,
      user: {
          name: "",
          age: "",
          dob: "",
          email: "",
          username: "",
          password: "",
        },
        error: null,
        successMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        console.log('Sending data:', { username: this.username, password: this.password });

        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: this.username,
          password: this.password
        }); 

        if (response.data.token) {
          console.log('Response:', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('role', response.data.role);  // Store the role
          console.log(response.data.role);
          if (response.data.role === 'admin') {
            this.$router.push('/admin-dashboard');  // Redirect to admin dashboard
          } else {
            this.$router.push('/');  // Redirect to home or patient dashboard
          }

          console.log('Login successful, token stored and redirected')
        // Proceed with storing the token or any other action
        } else {
          console.log('No token received');
        }
      } catch (error) { 
        console.error('Error:', error.response?.data || error.message);
      }
    },
    async handleRegister() {
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", this.user);
        this.successMessage = "Registration successful! Please log in.";
        this.user = {}; 
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || "An error occurred during registration.";
        } else {
          this.errorMessage = "Server error. Please try again later.";
        }
      }
    },
  }
};
</script>


<template>
  <div class="container">
    <div class="img-container">
      <img :src="loginImage" alt="LoginImage">
    </div>
    <div class="login-container">
      <div class="tabs">
      <button
        :class="{ active: showLogin }"
        @click="showLogin = true"
      >
        Sign In
      </button>
      <button
        :class="{ active: !showLogin }"
        @click="showLogin = false"
      >
        Sign Up
      </button>
    </div>
      <h2 v-if="showLogin">Login</h2>
      <h2 v-else>Register</h2>
      <form v-if="showLogin" @submit.prevent="login" class="loginform">
        <div class="entries">
          <div>
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" required />
          </div>
          <div>
          <label for="password">Password: </label>
          <input type="password" v-model="password" id="password" required />
          </div>
        </div>
        <RouterLink to="#" @click.prevent="showLogin = false">New user? Register here</RouterLink>
        <button type="submit">Login</button>
        <p v-if="error">{{ error }}</p>
      </form>


      <form v-else @submit.prevent="register" class="registerform">
        <div class="form-grid">
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
      </div>
        <RouterLink to="#" @click.prevent="showLogin = true">Already have an account? Login here</RouterLink>
        <button type="submit">Register</button>
        <p v-if="registerError">{{ registerError }}</p>
      </form>
    </div>
  </div>
</template>


<style scoped>
*{
  margin: 0;
  padding: 0;
}
.container{
  height: 600px;
  width: 60%;
  margin: 100px auto;
  display: flex;
  border: 2px rgb(19, 107, 207) solid;
  border-radius: 20px;
  overflow: hidden;
}

.img-container{
  width: 500px;
}

img{
  max-width: 100%;
}

.login-container{
  width: 50%;
  height: 100%;
  padding: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.login-container h2{
  margin: 0 auto;
  font-size: 34px;
}

.tabs {
  display: flex;
  width: 100%;
  border-bottom: 1px solid lightgray;
}

.tabs button {
  flex: 1;
  padding: 15px;
  font-size: 16px;
  background-color: lightgray;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.tabs button.active {
  background-color: white;
  font-weight: bold;
  border-bottom: 2px solid green; /* Highlight active tab */
}

.loginform{ 
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.entries{
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  font-size: 18px;
}

.entries label{
  margin-right: 10px;
}

.entries input{
  padding: 8px;
  width: 60%;
} 

form button{
  margin: 30px auto;
  color: white;
  background-color: rgb(66, 66, 189);
  border: none;
  padding: 13px 20px;
  border-radius: 10px;
  cursor: pointer;
}

.registerform{
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.form-grid{
  display: grid;
  width: 100px;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.registerform input{
  width: 180px;
  font-size: 16px;
  padding: 5px;
}

</style>