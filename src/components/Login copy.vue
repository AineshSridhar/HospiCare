
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
      error: null,
      showLogin: True,
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
          this.$router.push('/')
          console.log('Login successful, token stored and redirected')
        // Proceed with storing the token or any other action
        } else {
          console.log('No token received');
        }
      } catch (error) { 
        console.error('Error:', error.response?.data || error.message);
      }
    }
  }
};
</script>


<template>
  <div class="container">
    <div class="img-container">
      <img :src="loginImage" alt="LoginImage">
    </div>
    <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password: </label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <RouterLink to="/register">New user? Register here</RouterLink>
      <button type="submit">Login</button>
      <p v-if="error">{{ error }}</p>
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
}

.login-container h2{
  margin: 0 auto;
  font-size: 34px;
}

form{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form label{
  font-size: 18px;
  margin-right: 5px;
}

form input{
  width: 70%;
  padding: 8px;
  font-size: 16px;  
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


</style>