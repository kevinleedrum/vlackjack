import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const state = {
  isTitleShowing: true,
  settings: {
    deckCount: 6,
    startingBank: 25,
    shuffleAfterPercent: 0.75,
    minimumBet: 1,
    showBasicStrategy: false
  },
  bank: 0,
  shoe: [],
  hands: [],
  activeHandIndex: null,
  isDealing: false,
  showDrawer: false
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
