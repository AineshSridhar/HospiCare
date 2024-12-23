<script setup>
    import doctorphoto from '@/assets/images/Doctor_prof.avif';

</script>

<template>
    <div class="hero-section">
        <div class="text-container">
            <h1>Top Class Health Care Services</h1>
            <h3>Search for well facilitated hospitals and qualified staff for any health concerns</h3>
        </div>
        <div class="img-container">
            <img :src="doctorphoto" alt="Doctor_professional">
        </div>
    </div>
</template>

<style scoped>
    .hero-section{
        width: 100%;
        padding: 60px 90px;
        display: flex;
        height: 500px;
    }

    .text-container{
        max-width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .text-container h1{
        font-size: 60px;
        max-width: 80%;
    }

    .text-container h3{
        color:rgb(171, 169, 169);
        font-size: 20px;
    }

    .img-container{
        padding-left: 100px;
    }

    .img-container img{ 
        height: 400px;
        border-radius: 50%;
    }
</style>