import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailSearch from '../cmps/mail-search.cmp.js'
import { mailService } from '../services/mail-service.js'
import mailCompose from '../cmps/mail-compose.cmp.js'
import mailReadUnreadFilter from '../cmps/mail-read-unread-filter.cmp.js'

export default {
    template: `
    <section>
        <button @click="showComposer">+ Compose</button>
        <mail-search @searched="getSearch"></mail-search>
        <mail-read-unread-filter @readUnreadFilterChanged="setReadUnreadFilter"></mail-read-unread-filter>
        <mail-filter @folderChanged="getFolder"></mail-filter>
        <mail-list :mails="mailsToShow" @remove="removeMail" @starred="saveMail" @wasRead="saveMail"></mail-list>
        <mail-compose :mail="mailToEdit" v-if="composerVisible" @closeMe="hideComposer" @saveNewMail="saveMail"></mail-compose>
    </section>
    `,
    data() {
        return {
            mails: [],
            searchString: '',
            filterByFolder: 'inbox',
            composerVisible: false,
            mailToEdit: mailService.getEmptyMail(),
            readUnreadFilter: 'all'
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
        getFolder(folder) {
            this.filterByFolder = folder
        },
        saveMail(mail) {
            mailService.save(mail)
                .then(console.log('saved!'))
                .then(this.loadMails)
        },
        showComposer() {
            this.composerVisible = true
        },
        hideComposer() {
            this.composerVisible = false
        },
        setReadUnreadFilter(filter){
            this.readUnreadFilter = filter
        }
    },
    computed: {
        mailsToShow() {
            let mailsInFolder = [];

            if (this.filterByFolder === 'inbox') {
                this.mails.forEach(mail => {
                    if (mail.folder==='inbox') mailsInFolder.push(mail)
                });
            }

            if (this.filterByFolder === 'sent') {
                this.mails.forEach(mail => {
                    if (mail.folder==='outbox') mailsInFolder.push(mail)
                });
            }

            if (this.filterByFolder === 'starred') {
                this.mails.forEach(mail => {
                    if (mail.isStarred) mailsInFolder.push(mail)
                });
            }

            if (this.filterByFolder === 'drafts') {
                this.mails.forEach(mail => {
                    if (mail.folder==='drafts') mailsInFolder.push(mail)
                });
            }
            // if (!this.searchString) return mailsInFolder

            const searchStringLowercased = this.searchString.toLowerCase()
            const mailsToShow = mailsInFolder.filter(mail => {
                return (mail.sender.name.toLowerCase().includes(searchStringLowercased) ||
                    mail.sender.address.toLowerCase().includes(searchStringLowercased) ||
                    mail.subject.toLowerCase().includes(searchStringLowercased) ||
                    mail.content.toLowerCase().includes(searchStringLowercased))
            })

            if(this.readUnreadFilter==='read'){
                const mailAfterReadUnreadFilter = mailsToShow.filter(mail => {
                    return mail.wasRead
                })
                return mailAfterReadUnreadFilter
            }
            else if(this.readUnreadFilter==='unread'){
                const mailAfterReadUnreadFilter = mailsToShow.filter(mail => {
                    return !mail.wasRead
                })
                return mailAfterReadUnreadFilter
            }

            return mailsToShow
        }
    },
    mounted() {
        this.loadMails()
    },
    components:
    {
        mailList, mailFilter, mailSearch, mailCompose,mailReadUnreadFilter
    }
}