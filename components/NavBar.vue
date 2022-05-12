<template>
    <!--  <nav class="md:flex space-x-10 bg-gray-800">
        <div class="max-w-full mx-auto">
            <div
                class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
            >
                <NuxtLink
                    to="/"
                    class="text-base font-medium text-gray-500 hover:text-gray-900"
                >Sequences</NuxtLink>
                <NuxtLink
                    to="/upload"
                    class="text-base font-medium text-gray-500 hover:text-gray-900"
                >Upload</NuxtLink>
            </div>
        </div>
    </nav>-->

    
    <!-- <div class="p-2 mt-0 fixed w-full z-10 top-0"> -->
    <div class="min-h-10-screen">
        <div class="antialiased bg-gray-100 dark-mode:bg-gray-900">
            <div
                class="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800"
            >
                <div
                    class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
                >
                    <div class="flex flex-row items-center justify-between p-4">
                        <img class= "relative shadow-sm
                        w-1720 h-10 " src="https://research.nibmg.ac.in/insacog/_nuxt/img/insacog_queryhub_logo.409f041.png" />
                    </div>
                    <nav
                        class="flex-col flex-grow hidden md:pb-0 md:flex md:justify-end md:flex-row"
                    >
                        <NuxtLink
                            to="/upload"
                            class="px-4 py-2 mt-2 text-md font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        >Upload</NuxtLink>
                        <NuxtLink
                            to="/"
                            class="px-4 py-2 mt-2 text-md font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        >Sequences</NuxtLink>
                        <NuxtLink
                            to="/weekly_analysis"
                            class="px-4 py-2 mt-2 text-md font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        >Weekly report</NuxtLink>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
