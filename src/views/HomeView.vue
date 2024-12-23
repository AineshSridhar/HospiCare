<script setup>
import Hero from '../components/Hero.vue';
</script>

<template>
  <main>
    <Hero />

    <!-- Featured Hospitals Section -->
    <section class="featured-hospitals">
      <h2>Featured Hospitals</h2>
      <div class="hospital-cards">
        <div class="hospital-card">
          <h3>City Hospital</h3>
          <p>Best healthcare facility in the region.</p>
        </div>
        <div class="hospital-card">
          <h3>Green Valley Clinic</h3>
          <p>High quality healthcare at affordable prices.</p>
        </div>
        <div class="hospital-card">
          <h3>Sunrise Medical Center</h3>
          <p>Providing top-tier medical services for over 20 years.</p>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <h2>Our Services</h2>
      <div class="service-cards">
        <div class="service-card">
          <h3>Emergency Care</h3>
          <p>Immediate care for life-threatening conditions.</p>
        </div>
        <div class="service-card">
          <h3>Outpatient Services</h3>
          <p>Non-emergency care that does not require an overnight stay.</p>
        </div>
        <div class="service-card">
          <h3>Surgery</h3>
          <p>State-of-the-art surgical treatments for all conditions.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <h2>What Our Patients Say</h2>
      <div class="testimonial-cards">
        <div class="testimonial-card">
          <p>"The care I received was outstanding. The staff is very professional!"</p>
          <p>- John Doe</p>
        </div>
        <div class="testimonial-card">
          <p>"I received immediate help during an emergency, and I'm so grateful."</p>
          <p>- Mary Smith</p>
        </div>
        <div class="testimonial-card">
          <p>"A wonderful experience, with doctors who truly care about their patients."</p>
          <p>- Jane Roe</p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact">
      <h2>Contact Us</h2>
      <p>For inquiries or appointments, feel free to contact us!</p>
      <p>Email: info@hospicare.com</p>
      <p>Phone: 1-800-123-4567</p>
    </section>
  </main>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  width: 100%;
  padding: 60px 90px;
  display: flex;
  height: 500px;
}

.text-container {
  max-width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-container h1 {
  font-size: 60px;
  max-width: 80%;
  color: #1976d2; /* Blue color */
}

.text-container h3 {
  color: rgb(171, 169, 169);
  font-size: 20px;
}

.img-container {
  padding-left: 100px;
}

.img-container img {
  height: 400px;
  border-radius: 50%;
}

/* Featured Hospitals Section */
.featured-hospitals {
  padding: 60px 90px;
  background-color: #f0f4f8;
  text-align: center;
}

.featured-hospitals h2 {
  font-size: 36px;
  color: #1976d2;
  margin-bottom: 30px;
}

.hospital-cards {
  display: flex;
  justify-content: space-around;
}

.hospital-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
}

.hospital-card h3 {
  color: #1976d2;
  font-size: 24px;
}

.hospital-card p {
  color: rgb(171, 169, 169);
}

/* Services Section */
.services {
  padding: 60px 90px;
  background-color: #ffffff;
  text-align: center;
}

.services h2 {
  font-size: 36px;
  color: #1976d2;
  margin-bottom: 30px;
}

.service-cards {
  display: flex;
  justify-content: space-around;
}

.service-card {
  background-color: #1976d2;
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
}

.service-card h3 {
  font-size: 24px;
}

.service-card p {
  font-size: 16px;
}

/* Testimonials Section */
.testimonials {
  padding: 60px 90px;
  background-color: #f0f4f8;
  text-align: center;
}

.testimonials h2 {
  font-size: 36px;
  color: #1976d2;
  margin-bottom: 30px;
}

.testimonial-cards {
  display: flex;
  justify-content: space-around;
}

.testimonial-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.testimonial-card p {
  font-size: 18px;
  color: rgb(171, 169, 169);
}

/* Contact Section */
.contact {
  padding: 60px 90px;
  background-color: #ffffff;
  text-align: center;
}

.contact h2 {
  font-size: 36px;
  color: #1976d2;
  margin-bottom: 30px;
}

.contact p {
  font-size: 18px;
  color: rgb(171, 169, 169);
}
</style>
