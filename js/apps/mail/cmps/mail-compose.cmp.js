export default {
    template:`
        <div>
            <form>
                <input type="text" placeholder="To..." v-model="recepient">
                <input type="text" placeholder="Subject" v-model="subject">
                <input type="text" v-model="content">
                <button @click="sendMail">Send</button>
            </form>
        </div>
    `,
    data() {
        return {
            recepient:'',
            subject:'',
            content:''
        }
    },
    methods:{
        sendMail(ev){
            ev.preventDefault()

            console.log('hi')
        }
    }
}