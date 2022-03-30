export default {
	css: [],
	axios: {},
	plugins: [],
	loading: false,
	components: true,
	tailwindcss: { mode: 'jit' },
	build: { transpile: [/echarts/, /zrender/] },
	modules: ['@nuxtjs/axios', '@nuxtjs/toast', '@nuxtjs/dayjs'],
	buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/composition-api/module'],
	toast: {
      position: 'top-center',
      duration: 3000,
      register: [ // Register custom toasts
        {
          name: 'my-error',
          message: 'Oops...Something went wrong',
          options: {
            type: 'error'
          }
        }
      ]
  	},
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
