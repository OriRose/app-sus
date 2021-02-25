import mailDetails from './mail-details.cmp.js'
import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
    <section>
        <ul>
            <li v-for="mail in mails" :key="mail.id">
                <mail-preview :mail="mail" @remove="remove" @display="displayMail" @starred="toggleStar">
                    
                </mail-preview>
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
            this.$emit('starred', mail)
        },
        displayMail(mailId) {
            if(mailId === this.displayedMailIdx) this.displayedMailIdx = null
            else this.displayedMailIdx = mailId
        }
    },
    components: {
        mailDetails, mailPreview
    }
}