import { shallowMount } from "@vue/test-utils"
import App from "../../components/App.vue"

describe("App", () => {
    it("is a Vue instance", () => {
        const wrapper = shallowMount(App)
        
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})