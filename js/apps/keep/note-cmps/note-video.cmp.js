export default {
    template: `
          <section>
            <iframe
                width="150" height="112"
                :src="info.url">
            </iframe>
            <nav>
                  <button @click="edit">edit</button>
                  <button @click="remove">delete</button>
              </nav>
          </section>
          `,
    props: ["info","id"],
    methods:{
        edit(){
            this.$emit('edit',this.id)
        },
        remove(){
            this.$emit('remove',this.id)
        }
    }
};