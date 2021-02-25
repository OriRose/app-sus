export default {
    props: ['mail'],
    template: `
    <ul>
                    <li>
                    <button v-if="mail.isStarred" @click="toggleStar(mail)">★</button>
                    <button v-else @click="toggleStar(mail)">☆</button>
                    </li>
                    <li @click="display(mail.id)">
                        {{mail.sender.name}}
                    </li>
                    <li @click="display(mail.id)">
                        {{mail.subject}}
                    </li>
                    <li @click="display(mail.id)">
                        {{mail.timestamp}}
                    </li>
                    <li>
                    <button @click="remove(mail.id)">X</button>
                    </li>
    </ul>
    `,
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
        }
    }
}