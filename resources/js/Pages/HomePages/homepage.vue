<template>
    <section class="h-screen background">
        <nav class="flex justify-between mx-16 p-8">
            <div>
                <h1 class="text-[#718355] font-bold py-2 px-4 text-2xl">
                    AnJos Apartment
                </h1>
            </div>
            <div class="flex space-x-4 text-xl">
                <RouterLink
                    to="/admin/login"
                    class="bg-[#87986a] hover:bg-[#718355] text-white font-bold py-2 px-4 rounded"
                >
                    Admin
                </RouterLink>
                <RouterLink
                    to="/tenant/login"
                    class="bg-[#87986a] hover:bg-[#718355] text-white font-bold py-2 px-4 rounded"
                >
                    Tenant
                </RouterLink>
                <RouterLink
                    to="/inquire"
                    class="bg-[#e9f5db] hover:bg-[#cfe1b9] text-[#718355] font-bold py-2 px-4 rounded border-2 border-[#718355]"
                >
                    Inquire
                </RouterLink>
            </div>
        </nav>
        <div class="flex justify-around mt-28">
            <div class="max-w-lg lg:text-left mt-8 lg:mt-0">
                <h2 class="text-4xl font-bold text-[#718355] mb-4">
                    Welcome to AnJos Apartment
                </h2>
                <p class="text-lg text-gray-700 mb-6">
                    Discover the comfort and convenience of our premier
                    apartment reservations platform. Whether you're a tenant or
                    an admin, managing your space has never been easier.
                </p>
                <RouterLink
                    to="/inquire"
                    class="bg-[#87986a] hover:bg-[#718355] text-white font-bold py-3 px-6 rounded transition duration-300"
                >
                    Explore Now
                </RouterLink>
            </div>
            <div class="lg:ml-12 mt-6 lg:mt-0">
                <img
                    src="./../../../../public/images/placeholder.png"
                    alt="AnJos Apartment"
                    class="w-full max-w-md object-cover"
                />
            </div>
        </div>
        <footer
            class="fixed bottom-0 w-full bg-[#e9f5db] text-center text-[#718355] py-4"
        >
            <div class="container flex justify-center space-x-4 mb-4">
                <a href="#!" class="p-2 hover:bg-[#cfe1b9] rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                        class="h-6 w-6"
                    >
                        <path
                            d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                        />
                    </svg>
                </a>
                <a href="#!" class="p-2 hover:bg-[#cfe1b9] rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        class="h-6 w-6"
                    >
                        <path
                            d="M512 97.2c-19 8.4-39.4 14.1-61 16.8 21.8-13.1 38.5-33.9 46.4-58.6-20.4 12.1-42.9 20.8-66.8 25.6C410.4 62 384.6 48 355 48c-55.1 0-99.8 44.7-99.8 99.8 0 7.8 .9 15.4 2.6 22.7C169.4 165.2 89.6 123 37.5 59.5c-8.6 14.7-13.5 31.8-13.5 50 0 34.6 17.6 65.2 44.4 83.1-16.3-.5-31.6-5-45-12.4c-.2 41.1 29.1 75.5 67.8 83.4-7.1 1.9-14.6 2.9-22.3 2.9-5.5 0-10.9-.5-16.2-1.5 10.9 34 42.4 58.7 79.8 59.4-29.2 22.9-65.9 36.6-105.8 36.6-6.9 0-13.7-.4-20.4-1.2C36.8 404.6 80.5 416 126.2 416c152.1 0 235.3-126.1 235.3-235.3 0-3.6-.1-7.1-.2-10.6 16.2-11.7 30.2-26.3 41.3-43z"
                        />
                    </svg>
                </a>
                <a href="#!" class="p-2 hover:bg-[#cfe1b9] rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 488 512"
                        class="h-6 w-6"
                    >
                        <path
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        />
                    </svg>
                </a>
                <a href="#!" class="p-2 hover:bg-[#cfe1b9] rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                        class="h-6 w-6"
                    >
                        <path
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.8 9.9 67.6 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388.3c-7.8 19.7-22.9 35.1-42.5 42.5-29.5 11.7-99.5 9-132.3 9s-102.7 2.6-132.3-9c-19.7-7.8-35.1-22.9-42.5-42.5-11.7-29.5-9-99.5-9-132.3s-2.6-102.7 9-132.3c7.8-19.7 22.9-35.1 42.5-42.5 29.5-11.7 99.5-9 132.3-9s102.7-2.6 132.3 9c19.7 7.8 35.1 22.9 42.5 42.5 11.7 29.5 9 99.5 9 132.3s2.7 102.8-9 132.3z"
                        />
                    </svg>
                </a>
                <a href="#!" class="p-2 hover:bg-[#cfe1b9] rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                        class="h-6 w-6"
                    >
                        <path
                            d="M100.3 448H7V148.9h93.3V448zm-46.5-340.2C24.1 107.8 0 83.4 0 53.5S24.1-1 53.8-1s53.5 24.4 53.5 54.2-24.1 54.1-53.5 54.1zM447.8 448H354.5V302.4c0-34.8-.7-79.5-48.4-79.5-48.4 0-55.9 37.8-55.9 76.9V448H157V148.9h89.3v40.8h1.3c12.4-23.5 42.6-48.4 87.6-48.4 93.8 0 111.1 61.8 111.1 142.3V448z"
                        />
                    </svg>
                </a>
            </div>
            <div class="w-full p-2 text-center text-[#718355]">
                © 2024 Copyright:
                <a href="/" class="text-[#718355]">AnJos Apartment</a>
            </div>
        </footer>
    </section>
</template>

<script setup></script>

<style scoped>
.background {
    background-color: #e9f5db;
}
</style>
