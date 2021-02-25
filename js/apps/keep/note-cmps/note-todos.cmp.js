export default {
    template: `
          <section :style="getStyle">
          <span :class="{fa:isPinned, 'fa-paperclip':isPinned}"></span>
              <ul>
                  <li v-for="(todo,idx) in info.todos" @click="checkTodo(idx)">
                      <span v-if="!isEdit">{{todo.txt}}</span>
                      <span v-if="!isEdit" :class="{fa:todo.isDone,'fa-check-circle':todo.isDone}"></span>
                      <input v-if="isEdit" type="text" v-model="todos[idx].txt">
                      <hr/>
                    </li>
              </ul>
              <nav>                  
                  <button :style="getTextColor" v-if="!isPinned" title="pin" @click="pin" class="fas fa-thumbtack"></button>
                  <button :style="getTextColor" v-if="isPinned" :class="{rotate:isPinned}" title="un pin" @click="unpin" class="fas fa-thumbtack"></button>
                  <button :style="getTextColor" title="change color" @click="isChangeColor=!isChangeColor" class="fas fa-palette">
                      <nav v-if="isChangeColor">
                          <span @click="changeColor('red')" style="background-color:red">&nbsp;</span>
                          <span @click="changeColor('blue')" style="background-color:blue">&nbsp;</span>
                          <span @click="changeColor('green')" style="background-color:green">&nbsp;</span>
                          <span @click="changeColor('brown')" style="background-color:brown">&nbsp;</span>
                          <span @click="changeColor('orange')" style="background-color:orange">&nbsp;</span>
                          <span @click="changeColor('pink')" style="background-color:pink">&nbsp;</span>
                          <span @click="changeColor('white')" style="background-color:white">&nbsp;</span>
                          <span @click="changeColor('black')" style="background-color:black">&nbsp;</span>
                      </nav>
                  </button>
                  <button :style="getTextColor" v-if="!isEdit" title="edit" @click="startEdit" class="fas fa-edit"></button>
                  <button :style="getTextColor" v-if="isEdit" title="save" @click="edit" class="fas fa-save"></button>
                  <button :style="getTextColor" title="delete" @click="remove" class="fas fa-trash"></button>
                </nav>
            </section>
            `,
    props: ["info", "id", "color", "isPinned"],
    data() {
        return {
            isChangeColor: false,
            isEdit: false,
            todos: this.info.todos,
        }
    },
    methods: {
        edit() {
            this.$emit('edit', this.id, this.todos)
            this.isEdit = !this.isEdit;
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
        startEdit() {
            this.isEdit = !this.isEdit;
        },
        checkTodo(idx){
            if(this.isEdit) return;
            this.todos[idx].isDone=!this.todos[idx].isDone;
            this.$emit('edit', this.id, this.todos);
        }

    },
    computed:{
        getStyle(){
            return (this.color==='black')?'background-color:black;color:white':`background-color:${this.color}`
        },
        getTextColor() {
            return (this.color === 'black') ? 'color:white' : ``;
        }
    }
};