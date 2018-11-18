export default {
  fetchUserInfo({ commit }) {
    setTimeout(() => {
      commit('updateUserInfo', {
        userName: 'rrdawlx',
        userId: '99999'
      })
    }, 1000)
  }
}