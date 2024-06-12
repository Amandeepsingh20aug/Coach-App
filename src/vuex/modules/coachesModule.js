const coaches = {
  namespaced: true,
  state() {
    return {
      didlogout : false,
      userId: null,
      token : null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations: {
    addnewCoaches(state, payload) {
      state.coaches.push(payload);
    },
    fetchCoaches(state, payload) {
      state.coaches = payload;
    },
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didlogout = false
    },
    didAutoLogout(state) {
       state.didlogout = true
    }
  },
  getters: {
    AutoLogout(state) {
     return state.didlogout
    },
    getoken (state) {
     return state.token
    },
    getUserId(state) {
      return state.userId;
    },
    getCoaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(state) {
      const coaches = state.coaches;
      const userID = state.userId;
      return coaches.some((coach) => coach.id === userID);
    },
    isAuthenticated (state) {
      if(state.token !== null){
        return true
      } else {
        return false
      }
    }
  },
  actions: {
    async newCoach(context, payload) {
      const userId = context.state.userId;
      const coachData = {
        firstName: payload.first,
        lastName: payload.last,
        description: payload.desc,
        areas: payload.areas,
        hourlyRate: payload.rate,
      };

      const token = context.state.token
      const response = await fetch(
        `https://coach-demo-app-4661e-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token,
        {
          method: 'PUT',
          body: JSON.stringify(coachData),
        }
      );
      if (!response.ok) {
        console.log('Not ok');
      }
      context.commit('addnewCoaches', {
        ...coachData,
        id: userId,
      });
    },
    async loadCoaches(context) {
      const response = await fetch(
        `https://coach-demo-app-4661e-default-rtdb.firebaseio.com/coaches.json`
      );

      const responseData = await response.json();


      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch');
        throw error;
      }

      const coaches = [];

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          areas: responseData[key].areas,
          hourlyRate: responseData[key].hourlyRate,
        };
        coaches.push(coach);
      }
      context.commit('fetchCoaches', coaches);
    },


    async login(context,payload) {
     return context.dispatch('auth',{
        ...payload,
        mode : 'login'
      })
    },


    async signUp(context, payload) {
      return context.dispatch('auth',{
        ...payload,
        mode : 'signup'
      })
    },

    async auth (context,payload) {
      const mode = payload.mode;
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4ATXyzG-hf43KNviaerna-s22kh7iRZA'

      if(mode === 'signup') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4ATXyzG-hf43KNviaerna-s22kh7iRZA'
      }
      const response = await fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(response.message || 'Fialed to signup');
        throw error;
      }
      
      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn

      localStorage.setItem('token',responseData.idToken)
      localStorage.setItem('userId',responseData.localId)
      localStorage.setItem('expire',expirationDate)

      const timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, expiresIn);

      localStorage.setItem('timer', timer);

      context.commit('setUser', {
        token : responseData.idToken,
        userId : responseData.localId,
      })
    },
    autoLogin (context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpire = localStorage.getItem('expire');

      const expiresIn = +tokenExpire - new Date().getTime();

      if(expiresIn < 0){
        return;
      }

      const timer = setTimeout(function () {
        context.dispatch('autoLogout');
      }, expiresIn);

      localStorage.setItem('timer', timer);     
 
      if(token && userId) {
        context.commit('setUser', {
          token : token,
          userId : userId,
        })
      }
    },
    logout (context) {

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expire')

      const existingTimer = localStorage.getItem('timer');
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      context.commit('setUser',{
        userId : null,
        token : null,
      })
    },
    autoLogout (context) {
      context.dispatch('logout');
      context.commit('didAutoLogout')
    }
  },
};

export default coaches;
