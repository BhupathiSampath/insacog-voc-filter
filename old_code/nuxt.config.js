export default {
	css: [],
	plugins: [],
	components: true,
	tailwindcss: { mode: 'jit' },
	buildModules: ['@nuxtjs/tailwindcss'],
	modules: ['@nuxtjs/axios', '@nuxtjs/toast'],
	build: { transpile: [/echarts/, /zrender/] },
	env: {
		baseUrl: process.env.BASE_URL || 'http://10.10.6.87/api',
		downloadUrl: process.env.downloadUrl || 'http://10.10.6.87/download',
	},
	head: {
		htmlAttrs: { lang: 'en' },
		title: 'INSACOG QueryHub',
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		meta: [
			{ charset: 'utf-8' },
			{ name: 'format-detection', content: 'telephone=no' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
	},
}
