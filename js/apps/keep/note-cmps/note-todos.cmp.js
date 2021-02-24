export default {
    template: `
          <section>
              <ul>
                  <li v-for="todo in info.todos">{{todo}}</li>
              </ul>
              
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