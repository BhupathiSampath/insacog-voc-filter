import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
	datahub_stats: {},
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
	updateField,
}

export const actions = {
	async CallINSACOGDataHubStats({ commit, dispatch }) {
		const response = await this.$axios.$post('https://research.nibmg.ac.in/insacog/api/files/landing-stats/')
		await commit('SET_DATAHUB_STATS', response)
	},
}
