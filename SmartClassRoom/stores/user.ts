import { acceptHMRUpdate, defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    jwt: "",
    jwt_refresh: "",
    search: "",
    show: false,
    showm: false,
    Classrooms: true,
    Measurements: false,
  }),
  getters: {
    // automatically infers the return type as a number
    get_jwt() {
      return this.state.jwt;
    },
    get_jwt_refresh() {
      return this.state.jwt_refresh;
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
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
