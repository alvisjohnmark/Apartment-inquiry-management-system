<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Anjos Apartment</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-1D7ehHpH3em+6MWYr1Ls6vCzU9ABFJlEYy9y8f3s1VnXy6MgMHFVUEI/1Iv09ZNUojd9WBGKAVvl9GoqdeYtxw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @vite(['resources/js/app.js'])
    </head>
    <body class="font-sans antialiased">
        <div id="app">
            <router-view></router-view>
        </div>
    </body>
</html>