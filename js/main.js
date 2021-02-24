import { myRouter } from './routes.js'

const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section>
            <h1>main</h1>
        </section>
    `,
    data() {
        return {
        }
    },
    components: {
    }
}

const app = new Vue(options)