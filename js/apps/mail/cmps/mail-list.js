import {mailService} from '../services/mail-service.js'

export default {
    props: ['mails'],
    template: `
    <section>
        <ul>
            <li v-for="mail in mails" :key="mail.id">
                <ul>
                    <li>
                    <button v-if="mail.isStarred" @click="toggleStar(mail)">★</button>
                    <button v-else @click="toggleStar(mail)">☆</button>
                    </li>
                    <li>
                        {{mail.sender.name}}
                    </li>
                    <li>
                        {{mail.subject}}
                    </li>
                    <li>
                        {{mail.timestamp}}
                    </li>
                    <li>
                    <button @click="remove(mail.id)">X</button>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
    `,
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        },
        toggleStar(mail){
            mail.isStarred = !mail.isStarred
            mailService.save(mail)
        }
    }
    // mounted() {
    //     console.log(this.mails)
    // }
}