export default {
    template:`
        <div>
            <form>
                <input type="text" placeholder="To...">
                <input type="text" placeholder="Subject">
                <input type="text">
                <button @click="sendMail">Send</button>
            </form>
        </div>
    `,
    methods:{
        sendMail(){
            console.log('hi')
        }
    }
}