<template>
    <nav
        class="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-lg shadow-lg transition-all duration-300"
    >
        <div class="flex justify-between items-center py-4 px-6 md:px-16">
            <RouterLink
                to="/"
                class="text-white font-extrabold text-2xl tracking-wider hover:text-gray-300 transition-all"
            >
                AnJos Apartment
            </RouterLink>

            <div
                class="hidden md:flex items-center space-x-8 text-base md:text-lg text-white"
            >
                <RouterLink to="/admin/login" class="nav-link"
                    >Admin</RouterLink
                >
                <RouterLink to="/tenant/login" class="nav-link"
                    >Tenant</RouterLink
                >
                <RouterLink to="/inquire" class="inquire-button"
                    >Inquire</RouterLink
                >
            </div>

            <div class="md:hidden">
                <button
                    @click="toggleMenu"
                    class="text-white focus:outline-none"
                >
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>

        <div v-if="menuOpen" class="md:hidden bg-black py-4 space-y-2">
            <RouterLink
                to="/admin/login"
                @click="toggleMenu"
                class="block py-2 text-white text-center hover:text-gray-300 transition"
                >Admin</RouterLink
            >
            <RouterLink
                to="/tenant/login"
                @click="toggleMenu"
                class="block py-2 text-white text-center hover:text-gray-300 transition"
                >Tenant</RouterLink
            >
            <RouterLink
                to="/inquire"
                @click="toggleMenu"
                class="block py-2 text-white text-center hover:text-gray-300 transition"
                >Inquire</RouterLink
            >
        </div>
    </nav>

    <section
        class="hero min-h-screen flex items-center justify-center text-center px-6 md:px-12 relative"
    >
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="text-white relative z-10">
            <h1
                class="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fadeIn"
            >
                Welcome to <span class="highlight">AnJos Apartment</span>
            </h1>
            <p class="text-2xl md:text-3xl mb-8">
                Discover modern, comfortable living.
            </p>
            <RouterLink
                to="/inquire"
                class="inline-block px-6 py-3 text-lg font-semibold text-black bg-yellow-500 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 active:bg-yellow-600"
            >
                Explore Now
            </RouterLink>
        </div>
        <img
            src="../../../../public/images/herobg.jpg"
            alt="Apartment"
            class="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
    </section>

    <section class="testimonials py-16 bg-gray-900">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold text-white mb-12">
                What Our Tenants Say
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div class="testimonial-card">
                    <p class="text-gray-200 mb-4">
                        "The platform is easy to use, and the staff is always
                        ready to help!"
                    </p>
                    <h4 class="font-bold text-xl text-white">- Ryan A.</h4>
                </div>
                <div class="testimonial-card">
                    <p class="text-gray-200 mb-4">
                        "The location is great, and the living experience is
                        top-notch. "Kano a""
                    </p>
                    <h4 class="font-bold text-xl text-white">- Drin A.</h4>
                </div>
                <div class="testimonial-card">
                    <p class="text-gray-200 mb-4">
                        "AnJos Apartment made apartment living effortless!"
                    </p>
                    <h4 class="font-bold text-xl text-white">- Mel G.</h4>
                </div>
            </div>
        </div>
    </section>

    <footer class="w-full text-center text-gray-400 py-8 bg-gray-800 shadow-lg">
        <div class="container mx-auto">
            <div class="flex justify-center space-x-6 mb-4">
                <a href="#!" class="social-icon"
                    ><i class="fa-brands fa-facebook-f"></i
                ></a>
                <a href="#!" class="social-icon"
                    ><i class="fa-brands fa-twitter"></i
                ></a>
                <a href="#!" class="social-icon"
                    ><i class="fa-brands fa-google"></i
                ></a>
                <a href="#!" class="social-icon"
                    ><i class="fa-brands fa-instagram"></i
                ></a>
                <a href="#!" class="social-icon"
                    ><i class="fa-brands fa-linkedin"></i
                ></a>
            </div>
            <p class="text-sm">© 2024 AnJos Apartment. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}
</script>

<style scoped>
/* Navigation */
nav {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    padding: 0.75rem 0;
    transition: background 0.3s ease, box-shadow 0.3s ease;
}
nav:hover {
    background: rgba(0, 0, 0, 0.85);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

.nav-link {
    position: relative;
    padding: 0.5rem 1rem;
    font-weight: 500;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}
.nav-link:hover {
    color: #f1c40f;
    border-bottom-color: #f1c40f;
}

.inquire-button {
    border: 2px solid #f1c40f;
    padding: 10px 20px;
    border-radius: 30px;
    transition: background 0.3s, color 0.3s, transform 0.3s;
}
.inquire-button:hover {
    background-color: #f1c40f;
    color: #000;
    transform: scale(1.05);
}

/* Hero Section */
.hero {
    background: #1a1a1a;
    position: relative;
}
.hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
}
.hero h1,
.hero p {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}
.hero h1 {
    animation: fadeInDown 1s ease-in-out;
}
.hero p {
    animation: fadeInUp 1.2s ease-in-out;
}
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Testimonials */
.testimonials {
    background-color: #191919;
}
.testimonial-card {
    background: black;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.testimonial-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
}
.testimonial-card p {
    font-size: 1.2rem;
    color: #ccc;
    margin-bottom: 10px;
}
.testimonial-card h4 {
    color: #fff;
    font-weight: bold;
}

/* Footer */
.social-icon {
    font-size: 1.5rem;
    color: #fff;
    transition: color 0.3s, transform 0.3s;
}
.social-icon:hover {
    color: #f1c40f;
    transform: scale(1.2);
}
footer a:hover {
    background-color: transparent;
    transform: scale(1.15);
}
footer {
    background: #000000;
}

/* Responsive */
@media (max-width: 768px) {
    .hero {
        padding: 40px 20px;
    }
    .hero h1 {
        font-size: 3rem;
    }
    .testimonials .testimonial-card {
        padding: 1.5rem;
    }
}
</style>
