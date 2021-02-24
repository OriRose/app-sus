export default {
    props: ["info","id"],
    template: `
          <section>
              <img :src="info.url">
              <nav>
                  <button @click="edit">edit</button>
                  <button @click="remove">delete</button>
              </nav>
          </section>
          `,
          methods:{
              edit(){
                  this.$emit('edit',this.id)
              },
              remove(){
                  this.$emit('remove',this.id)
              }
          }
  };