<template>
    <div class="p-4">
        <div :class="GetClass()">
            <div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
                <svg
                    fill="none"
                    class="w-6 h-6 animate-spin"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                        fill="currentColor"
                        fill-rule="evenodd"
                    />
                </svg>

                <div>Uploading ...</div>
            </div>
        </div>
        <div class="container flex justify-center py-1 mx-auto">
            <div class="md:grid md:grid-cols-2 md:gap-6 w-full">
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <div class="flex flex-col flex-grow mb-3">
                        <div
                            x-data="{ files: null }"
                            id="FileUpload"
                            class="block w-full py-2 px-3 relative bg-white appearance-none border-2 border-gray-300 border-solid rounded-md hover:shadow-outline-gray cursor-pointer"
                        >
                            <input
                                type="file"
                                multiple
                                class="absolute inset-0 z-50 m-0 p-0 w-full h-full outline-none opacity-0 cursor-pointer"
                                x-on:change="files = $event.target.files; console.log($event.target.files);"
                                x-on:dragover="$el.classList.add('active')"
                                x-on:dragleave="$el.classList.remove('active')"
                                x-on:drop="$el.classList.remove('active')"
                                name="file"
                                id="file"
                                ref="file"
                                v-on:change="handleFileUpload()"
                            />
                            <template x-if="files !== null">
                                <div class="flex flex-col space-y-1">
                                    <template x-for="(_,index) in Array.from({ length: files.length })">
                                        <div class="flex flex-row items-center space-x-2">
                                            <template x-if="files[index].type.includes('audio/')"
                                                ><i class="far fa-file-audio fa-fw"></i
                                            ></template>
                                            <template x-if="files[index].type.includes('application/')"
                                                ><i class="far fa-file-alt fa-fw"></i
                                            ></template>
                                            <template x-if="files[index].type.includes('image/')"
                                                ><i class="far fa-file-image fa-fw"></i
                                            ></template>
                                            <template x-if="files[index].type.includes('video/')"
                                                ><i class="far fa-file-video fa-fw"></i
                                            ></template>
                                            <!-- <span class="font-medium text-gray-900" x-text="files[index].name"
                                                >Uploading</span
                                            >
                                            <span
                                                class="text-xs self-end text-gray-500"
                                                x-text="filesize(files[index].size)"
                                                >...</span
                                            > -->
                                        </div>
                                    </template>
                                </div>
                            </template>
                            <template x-if="files === null">
                                <div class="flex flex-col space-y-2 items-center justify-center">
                                    <i class="fas fa-cloud-upload-alt fa-3x text-currentColor"></i>
                                    <p class="text-gray-700">Drag your files here or click in this area to uplaod data.</p>
                                    <p class="text-blue-700">{{file.name}}</p>
                                    <a
                                        href="javascript:void(0)"
                                        class="flex items-center mx-auto py-2 px-4 text-white text-center font-medium border border-transparent rounded-md outline-none bg-red-500"
                                        >Select a file or Drag and drop the file here</a
                                    >
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button v-if="file.name"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                            v-on:click="submitFile()"
                        >
                            Submit
                        </button>
                        <button v-else
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 w-full  opacity-50 cursor-not-allowed"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: '',
            active: false,
            limitationList: 10,

            chart_loader: true,
            loader_option: {
                lineWidth: 3,
                fontSize: 14,
                text: 'Loading',
                fontWeight: 500,
                color: '#c23531',
                maskColor: '#f6f8f9',
                fontFamily: 'Averta',
            },
        }
    },
    components: {},

    methods: {
        GetClass() {
            return this.active
                ? 'flex items-center justify-center w-full h-full'
                : 'flex items-center justify-center w-full h-full hidden'
        },
        GetClass1() {
            return this.active
                ? 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full  opacity-50 cursor-not-allowed'
                : 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full'
        },
        async submitFile() {
            let formData = new FormData()
            formData.append('file', this.file)
            this.active = true
            console.log(this.file.name)
            try {
                await this.$axios.post('http://127.0.0.1:8080/api/adddata/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                console.log(this.file)
                this.active = false
                this.$toast.success('Successfully uploaded')
            } catch (e) {
                console.log('FAILURE!!')
                this.active = false
                this.$toast.error('Something went wrong')
            }
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0]
        },
    },
}
</script>
