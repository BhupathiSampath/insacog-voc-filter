<template>
	<!-- <div class="min-h-screen p-10 bg-gray-100"> -->
		<div class="max-w-md inline-block">
			<!-- <label for="select" class="font-semibold block py-2">Select Input:</label> -->

			<div class="relative">
				<div class="h-10 w-full bg-white flex border border-gray-200 rounded items-center">
					<input
						checked
						id="select"
						name="select"
						:value="selected"
						placeholder="Select something"
						class="px-4 appearance-none outline-none text-gray-800 w-full pointer-events-none"
					/>

					<button
						@click="EmptyAction()"
						class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600"
					>
						<svg
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="w-4 h-4 mx-2 fill-current"
							xmlns="http://www.w3.org/2000/svg"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
					<label
						for="show_more"
						@click="ShowDropdown()"
						class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
					>
						<svg
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="w-4 h-4 mx-2 fill-current"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polyline points="18 15 12 9 6 15"></polyline>
						</svg>
					</label>
				</div>

				<div
					v-if="dropdown"
					class="absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200"
				>
					<div class="cursor-pointer group" v-for="(option, index) in options" :key="index">
						<a :class="GetClass(option)" @click="Action(index)">
							{{ option.name }}
						</a>
					</div>
				</div>
			</div>
		</div>
	<!-- </div> -->
</template>

<script>
export default {
	data: () => ({
		selected: '',
		dropdown: false,
		options: [
          { name: 'Python', active: false },
          { name: 'Javascript', active: false },
          { name: 'Node', active: false },
          { name: 'PHP', active: false },
        ],
      // isShowing : false,
	}),
	props: {
		options: { type: Array, required: true },
	},
	methods: {
		GetClass(option) {
			return option.active
				? 'block p-2 border-transparent border-l-4 group-hover:border-blue-600 border-blue-600 group-hover:bg-gray-100'
				: 'block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100'
		},
		ShowDropdown() {
			if (this.dropdown) {
				this.HideDropdown()
				return
			}
			this.dropdown = true
		},
		HideDropdown() {
			this.dropdown = false
		},
		Action(index) {
			this.options.map((d) => (d.active = false))
			this.options[index].active = true
			this.selected = this.options[index].name
			this.HideDropdown()
		},
		EmptyAction() {
			this.selected = ''
			this.options.map((d) => (d.active = false))
			this.HideDropdown()
		},
	},
	mounted() {
		this.$nextTick(() => {})
	},
}
</script>

<style scoped></style>
