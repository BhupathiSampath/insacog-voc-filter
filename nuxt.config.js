export default {
	css: [],
	axios: {},
	build: {},
	plugins: [],
	loading: false,
	components: true,
	tailwindcss: { mode: 'jit' },
	buildModules: ['@nuxtjs/tailwindcss'],
	modules: ['@nuxtjs/axios', '@nuxtjs/toast', '@nuxtjs/dayjs'],
	head: {
		title: 'INSACOG-QueryHub',
		htmlAttrs: { lang: 'en' },
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
}
