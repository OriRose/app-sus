import { myRouter } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'

const options = {
    el: '#app',
    router: myRouter,
    template: `
        <app-header>
    `,
    data() {
        return {
        }
    },
    components: {
        appHeader
    }
}

const app = new Vue(options)