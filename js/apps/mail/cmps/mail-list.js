
export default {
    props: ['mails'],
    template:`
    <section>
        <ul>
            <li v-for="mail in mails" :key="mail.id">
                <ul>
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
    methods:{
        remove(mailId) {
            this.$emit('remove', mailId)
        }
    }
    // mounted() {
    //     console.log(this.mails)
    // }
}