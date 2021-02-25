import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailSearch from '../cmps/mail-search.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
    template: `
    <section>
        <button>+ Compose</button>
        <mail-search @searched="getSearch"></mail-search>
        <mail-filter></mail-filter>
        <mail-list :mails="mailsToShow" @remove="removeMail" @starred="saveMail"></mail-list>
    </section>
    `,
    data() {
        return {
            mails: [],
            searchString: '',
            // filterBy:null
        }
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => this.mails = mails)
        },
        removeMail(mailId) {
            mailService.remove(mailId)
                .then(this.loadMails)
        },
        getSearch(searchString) {
            this.searchString = searchString
        },
        saveMail(mail){
            mailService.save(mail)
        }
    },
    computed: {
        mailsToShow() {
            if (!this.searchString) return this.mails

            const searchStringLowercased = this.searchString.toLowerCase()
            const mailsToShow = this.mails.filter(mail => {
                return (mail.sender.name.toLowerCase().includes(searchStringLowercased) ||
                    mail.sender.address.toLowerCase().includes(searchStringLowercased) ||
                    mail.subject.toLowerCase().includes(searchStringLowercased) ||
                    mail.content.toLowerCase().includes(searchStringLowercased))
            })

            return mailsToShow
        }
    },
    created() {
        this.loadMails()
    },
    components:
    {
        mailList, mailFilter, mailSearch
    }
}