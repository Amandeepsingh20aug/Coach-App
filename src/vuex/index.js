import { createStore } from 'vuex';
import coaches from './modules/coachesModule'
import requests from './modules/requestsModule'
const store = createStore({
  modules: {
    coaches,
    requests,
  },
  // state () {
  //   return {
     
  //   }
  // },
  // getters : {
  //   userId (state) {
  //   return state.userId
  //   }
  // }
});
export default store;