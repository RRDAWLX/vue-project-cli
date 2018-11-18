export default {
  updateUserInfo(state, userInfo) {
    state.userName = userInfo.userName
    state.userId = userInfo.userId
  }
}