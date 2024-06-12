const requests = {
  namespaced:true,
  state (){
    return {
      requests : [],
      coachId : ''
    }
  },
  mutations : {
    getrequest(state,payload){
     state.requests.push(payload)
    },
    setrequest(state,payload) {
      state.requests = payload
    }
  },
  getters : {
    fetchRequest(state) {
      return state.requests
    },
    getUserIdFromCoaches(state, getters, rootState) {
      return rootState.coaches.userId;
    },
    getUsertokenFromCoaches(state, getters, rootState) {
      return rootState.coaches.token;
    },
  }, 
  
  actions : {
    async addRequest(context,payload){
      context.state.coachId = payload.coachId
      const newRequest = {
        userEmail : payload.email,
        message : payload.message
      }

      const response = await fetch(`https://coach-demo-app-4661e-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,{
        method : 'POST',
        body : JSON.stringify(newRequest)
      })

      if(!response.ok){
        const error = new Error(responseData.message || 'Failed to send request')
        throw error
      }
      newRequest.id = responseData.name
      newRequest.coachId = payload.coachId
      const responseData = await response.json();
      context.commit('getrequest',newRequest)
    },
    async gettingRequest (context) {
         const coachId = context.getters.getUserIdFromCoaches;
         const token = context.getters.getUsertokenFromCoaches;
         const response = await fetch(`https://coach-demo-app-4661e-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token)
         const responseData = await response.json()

         if(!response.ok) {
          const error = new Error(responseData.message || 'Failed to fetch');
          throw error
         }

         const request = []

         for(const key in responseData){
          const req = {
            id: key,
            coachId : coachId,
            userEmail : responseData[key].userEmail,
            message : responseData[key].message
          }
          request.push(req)
         }

         context.commit('setrequest',request)
    }
  }
}

export default requests