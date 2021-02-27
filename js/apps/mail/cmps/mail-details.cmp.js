export default {
    props:['mail'],
    template:`<div class="mail-details">
    <h1>{{mail.subject}}</h1>
    <h2><span>{{mail.sender.name}}</span> <<span>{{mail.sender.address}}</span>></h2><br>
    <h5>{{mail.content}}</h5>
    </div>
    `,
    created() {
        this.mail.wasRead = true
        this.$emit('wasRead',this.mail)
    }
}