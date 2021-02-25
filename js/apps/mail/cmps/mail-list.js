import mailDetails from './mail-details.js'

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
                <mail-details :mail="mail" v-if="(mail.id===displayedMailIdx)">
                    
                </mail-details>
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
    },
    components: {
        mailDetails
    }
}