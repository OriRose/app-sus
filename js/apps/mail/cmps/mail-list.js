// import {mailService} from '../services/mail-service.js'

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
                    <li @click="displayMail(mail.id)">
                        {{mail.sender.name}}
                    </li>
                    <li @click="displayMail(mail.id)">
                        {{mail.subject}}
                    </li>
                    <li @click="displayMail(mail.id)">
                        {{mail.timestamp}}
                    </li>
                    <li>
                    <button @click="remove(mail.id)">X</button>
                    </li>
                </ul>
                <ul v-if="(mail.id===displayedMailIdx)">
                    <h1>{{mail.subject}}</h1>
                    <h2><span>{{mail.sender.name}}</span> <span>{{mail.sender.address}}</span></h2>
                    <p>{{mail.content}}</p>
                </ul>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            displayedMailIdx: null
        }
    },
    methods: {
        remove(mailId) {
            this.$emit('remove', mailId)
        },
        toggleStar(mail) {
            mail.isStarred = !mail.isStarred
            this.$emit('starred', mail)
        },
        displayMail(mailId) {
            if(mailId === this.displayedMailIdx) this.displayedMailIdx = null
            else this.displayedMailIdx = mailId
        }
    }
}