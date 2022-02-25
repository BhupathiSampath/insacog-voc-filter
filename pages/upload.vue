<template>
  <div class="p-4">
    <div class="container flex justify-center py-1 mx-auto">
            <div class="md:grid md:grid-cols-2 md:gap-6">
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <div class="flex flex-col flex-grow mb-3">
                      <div x-data="{ files: null }" id="FileUpload" class="block w-full py-2 px-3 relative bg-white appearance-none border-2 border-gray-300 border-solid rounded-md hover:shadow-outline-gray">
                          <input type="file" multiple
                                class="absolute inset-0 z-50 m-0 p-0 w-full h-full outline-none opacity-0"
                                x-on:change="files = $event.target.files; console.log($event.target.files);"
                                x-on:dragover="$el.classList.add('active')" x-on:dragleave="$el.classList.remove('active')" x-on:drop="$el.classList.remove('active')" 
                                name="file" id="file" ref="file" v-on:change="handleFileUpload()"
                          >
                          <template x-if="files !== null">
                              <div class="flex flex-col space-y-1">
                                  <template x-for="(_,index) in Array.from({ length: files.length })">
                                      <div class="flex flex-row items-center space-x-2">
                                          <template x-if="files[index].type.includes('audio/')"><i class="far fa-file-audio fa-fw"></i></template>
                                          <template x-if="files[index].type.includes('application/')"><i class="far fa-file-alt fa-fw"></i></template>
                                          <template x-if="files[index].type.includes('image/')"><i class="far fa-file-image fa-fw"></i></template>
                                          <template x-if="files[index].type.includes('video/')"><i class="far fa-file-video fa-fw"></i></template>
                                          <span class="font-medium text-gray-900" x-text="files[index].name">Uploading</span>
                                          <span class="text-xs self-end text-gray-500" x-text="filesize(files[index].size)">...</span>
                                      </div>
                                  </template>
                              </div>
                          </template>
                          <template x-if="files === null">
                              <div class="flex flex-col space-y-2 items-center justify-center">
                                  <i class="fas fa-cloud-upload-alt fa-3x text-currentColor"></i>
                                  <p class="text-gray-700">Drag your files here or click in this area.</p>
                                  <a href="javascript:void(0)" class="flex items-center mx-auto py-2 px-4 text-white text-center font-medium border border-transparent rounded-md outline-none bg-red-700">Select a file</a>
                              </div>
                          </template>
                      </div>
                  </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" v-on:click="submitFile()">Submit</button>
                            <!-- <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                            </button> -->
                        </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  export default {    data(){
      return {
        file: '',
      }
    },
    components: {
  },

    methods: {
      submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            this.$axios.post( 'http://10.10.6.87/api/adddata/',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){

          this.$toast.success('Success')
          console.log('SUCCESS!!');
        })
        .catch(function(){
          this.$toast.danger('Error while authenticating')
          console.log('FAILURE!!');
        });
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  }
</script>
