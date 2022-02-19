import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	datahub_stats: {},
	lineage_class: {
		chartdata: {},
		loaded: false
	},
	datahub_loaded: false,
})

export const getters = {
	getField,
}

export const mutations = {
	SET_DATAHUB_STATS(state, payload) {
		state.datahub_stats = payload
		state.datahub_loaded = true
	},
	SET_LINEAGE_CLASSIFICATION(state, payload) {
		state.lineage_class.chartdata = payload
		state.lineage_class.loaded  = true
	},
	updateField,
}

export const actions = {
	async CallINSACOGDataHubStats({ commit, dispatch }) {
		const response = await this.$axios.$post('https://research.nibmg.ac.in/insacog/api/files/landing-stats/')
		await commit('SET_DATAHUB_STATS', response)
	},
	async CallLineageClassification({ commit, dispatch }) {
		const response = await this.$axios.$get('http://10.10.6.87/api/linclassification/')
		await commit('SET_LINEAGE_CLASSIFICATION', response)
	},
}
