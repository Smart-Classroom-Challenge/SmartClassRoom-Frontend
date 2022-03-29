import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    jwt: '',
    jwt_refresh: '',
  }),
  getters: {
    // automatically infers the return type as a number
    jwt(token) {
      if (state.jwt === '') {
        return ''
      }
      return state.jwt
    },
    jwt_refresh(token) {
      if (state.jwt_refresh === '') {
        return ''
      }
      return state.jwt_refresh
    },
    
  },
  actions: {
    set_jwt(token) {
      this.jwt = token;
    },
    set_rjwt(token) {
      this.jwt_refresh = token;
    },
  },
})


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
