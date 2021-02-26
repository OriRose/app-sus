import {mailService} from '../services/mail-service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template:`
        <div>
            <button @click="onClose">X</button>
            <form>
                <input type="email" placeholder="To..." v-model="recepient">
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

            const newEmail = mailService.getEmptyMail()
            newEmail.sender.address = this.recepient
            newEmail.subject = (this.subject==='') ? '(no subject)' : this.subject
            newEmail.content = this.content
            newEmail.folder = (this.recepient==='admin@appsus.org') ? 'outbox' : 'inbox'
            this.$emit('saveNewMail',newEmail)
            eventBus.$emit('show-msg',{txt:'Mail sent!'})
            this.onClose()
        },
        onClose(){
            this.$emit('closeMe')
        }
    }
}