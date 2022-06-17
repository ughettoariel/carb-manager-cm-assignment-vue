import { defineStore } from "pinia";
import getUser from "@/api/getUser";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    error: false,
  }),

  actions: {
    async fetchUser() {
      try {
        this.user = await getUser();
      } catch (e) {
        this.error = true;
      }
    },
  },
});
