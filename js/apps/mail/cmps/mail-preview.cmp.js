export default {
    props: ['mail'],
    template: `
    <div class="mail-preview">
                    
                    <button v-if="mail.isStarred" @click="toggleStar(mail)">★</button>
                    <button v-else @click="toggleStar(mail)">☆</button>
                    <div class="mail-preview-inner-container">
                    <div class="contact-container" @click="display(mail.id)" v-bind:class="{bold : isBold}">
                        {{mail.sender.name}}
                    </div>
                    <div @click="display(mail.id)" v-bind:class="{bold : isBold}">
                        {{mail.subject}}
                    </div>
                    <div @click="display(mail.id)" v-bind:class="{bold : isBold}">
                        {{mail.timestamp}}
                    </div>
                    </div>
                    <button class="mail-delete-btn" @click="remove(mail.id)">X</button>

                    
    </div>
    `,
    data () {
        return {
            mailData: this.mail
        }
    },
    methods: {
        remove(mailId){
            this.$emit('remove',mailId)
        },
        display(mailId){
            this.$emit('display',mailId)
        },
        toggleStar(mail){
            mail.isStarred = !mail.isStarred
            this.$emit('star',mail)
        },
    },
    computed: {
        isBold(){
            return !this.mail.wasRead
        }
    }
}