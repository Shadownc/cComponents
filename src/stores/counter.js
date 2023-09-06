import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
    state: () => ({
        count: 0,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
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