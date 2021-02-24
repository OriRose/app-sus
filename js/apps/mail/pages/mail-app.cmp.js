import mailList from '../cmps/mail-list.js'
import mailFilter from '../cmps/mail-filter.js'
import mailSearch from '../cmps/mail-search.js'
import { mailService } from '../services/mail-service.js'

export default {
    template: `
    <section>
        <button>+ Compose</button>
        <mail-search @searched="getSearch"></mail-search>
        <mail-filter></mail-filter>
        <mail-list :mails="mailsToShow"></mail-list>
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
        }
    },
    computed: {
        mailsToShow() {
            if (this.searchString) {
                const searchStringLowercased = this.searchString.toLowerCase()
                const mailsToShow = this.mails.filter(mail => {
                    return (mail.sender.name.toLowerCase().includes(searchStringLowercased) ||
                        mail.sender.address.toLowerCase().includes(searchStringLowercased) ||
                        mail.topic.toLowerCase().includes(searchStringLowercased) ||
                        mail.content.toLowerCase().includes(searchStringLowercased))
                })
            }
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