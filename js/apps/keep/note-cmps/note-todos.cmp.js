export default {
    template: `
          <section :style="{backgroundColor:color}">
          <span :class="{fa:isPinned, 'fa-paperclip':isPinned}"></span>
              <ul>
                  <li v-if="!isEdit" v-for="(todo,idx) in info.todos" @click="startEdit(todo,idx)">
                      <span>{{todo}}</span>
                      <hr/>
                    </li>
                  <input @focusout="edit" v-if="isEdit" type="text" v-model="todo.txt">
              </ul>
              <nav>                  
                  <button v-if="!isPinned" title="pin" @click="pin" class="fas fa-thumbtack"></button>
                  <button v-if="isPinned" :class="{rotate:isPinned}" title="un pin" @click="unpin" class="fas fa-thumbtack"></button>
                  <button title="change color" @click="isChangeColor=!isChangeColor" class="fas fa-palette">
                      <nav v-if="isChangeColor">
                          <span @click="changeColor('red')" style="background-color:red">&nbsp;</span>
                          <span @click="changeColor('blue')" style="background-color:blue">&nbsp;</span>
                          <span @click="changeColor('green')" style="background-color:green">&nbsp;</span>
                          <span @click="changeColor('brown')" style="background-color:brown">&nbsp;</span>
                          <span @click="changeColor('orange')" style="background-color:orange">&nbsp;</span>
                          <span @click="changeColor('pink')" style="background-color:pink">&nbsp;</span>
                          <span @click="changeColor('white')" style="background-color:white">&nbsp;</span>
                          <!-- <span @click="changeColor('black')" style="background-color:black">&nbsp;</span> -->
                      </nav>
                  </button>
                  <button title="edit" @click="edit" class="fas fa-edit"></button>
                  <button title="delete" @click="remove" class="fas fa-trash"></button>
                </nav>
            </section>
            `,
    props: ["info", "id", "color", "isPinned"],
    data() {
        return {
            isChangeColor: false,
            isEdit: false,
            todo: {},
        }
    },
    methods: {
        edit() {
            this.$emit('edit', this.id, this.todo)
            this.isEdit = !this.isEdit;
            this.todo = {};
        },
        remove() {
            this.$emit('remove', this.id)
        },
        pin() {
            this.$emit('pin', this.id)
        },
        unpin() {
            this.$emit('unpin', this.id)
        },
        changeColor(color) {
            this.$emit('changeColor', this.id, color)
        },
        startEdit(todo, idx) {
            this.isEdit = !this.isEdit;
            this.todo = {
                txt: todo,
                idx
            };
            // this.$refs.editInput.focus();
        }

    }
};