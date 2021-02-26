import { myRouter } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'

const options = {
    el: '#app',
    router: myRouter,
    template: `
    <section>
        <user-msg/>
        <app-header/>
        <router-view/>
        <footer>
            &copy copyrights 2021
        </footer>
    </section>
    `,
    data() {
        return {
        }
    },
    components: {
        appHeader,
        userMsg
    }
}

const app = new Vue(options)