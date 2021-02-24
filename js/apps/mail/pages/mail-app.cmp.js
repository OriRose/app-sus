import mailList from '../cmps/mail-list.js'
import mailFilter from '../cmps/mail-filter.js'
import mailSearch from '../cmps/mail-search.js'

export default{
    template:`
    <section>
        <button>+ Compose</button>
        <mail-search></mail-search>
        <mail-filter></mail-filter>
        <mail-list></mail-list>
    </section>
    `,
    components:
    {
        mailList, mailFilter,mailSearch
    }
}