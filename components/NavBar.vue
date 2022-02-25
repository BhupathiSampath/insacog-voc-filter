<template>
    <nav class="md:flex space-x-10 bg-gray-800">
        <div class="max-w-full mx-auto">
            <div
                class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
            >
                <NuxtLink
                    to="/"
                    class="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                    Sequences
                </NuxtLink>
                <NuxtLink
                    to="/upload"
                    class="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                    Upload
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>
