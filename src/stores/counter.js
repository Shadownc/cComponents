import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
    state: () => ({
        count: 0,
        access_token:null
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
        token: state => state.access_token
    },
    actions: {
        increment() {
            this.count++
        },
        decrease() {
            this.count--
        }
    }
})