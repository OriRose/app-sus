import { myRouter } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'

const options = {
    el: '#app',
    router: myRouter,
    template: `
    <section>
        <!-- <app-header/> -->
        <!-- <router-view/> -->
    </section>
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