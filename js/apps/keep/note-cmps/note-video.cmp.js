export default {
    template: `
          <section :style="getStyle">
          <span :class="{fa:isPinned, 'fa-paperclip':isPinned}"></span>
              <p v-if="!isEdit" @click="startEdit">{{info.txt}}</p>
              <input ref="editInput" v-show="isEdit" type="text" v-model="txt">
            <iframe
                width="100%" height="100%"
                :src="getUrl">
            </iframe>
            <nav>
                  <button v-if="!isPinned" title="pin" @click="pin" class="fas fa-thumbtack"></button>
                  <button v-if="isPinned" :class="{rotate:isPinned}" title="un pin" @click="unpin" class="fas fa-thumbtack"></button>
                  <button @click="isChangeColor=!isChangeColor" class="fas fa-palette">
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
                  <button :style="getTextColor" v-if="!isEdit" title="add title" @click.self="startEdit" class="fas fa-edit"></button>
                  <button :style="getTextColor" v-if="isEdit" title="save" @click.self="edit" class="fas fa-save"></button>
                  <button :style="getTextColor" title="delete" @click="remove" class="fas fa-trash"></button>
                </nav>
            </section>
            `,
    props: ["info", "id", "color", "isPinned"],
    data() {
        return {
            isChangeColor: false,
            isEdit: false,
            txt: this.info.txt
        }
    },
    methods: {
        edit() {
            this.$emit('edit', this.id, this.txt)
            setTimeout(()=>{
                this.isEdit = !this.isEdit;
            },0);
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
            setTimeout(() => {
                this.$refs.editInput.focus();
            }, 0);
        }

    },
    computed: {
        getStyle() {
            return (this.color === 'black') ? 'background-color:black;color:white' : `background-color:${this.color}`
        },
        getTextColor() {
            return (this.color === 'black') ? 'color:white' : ``;
        },
        getUrl(){
            var url=this.info.url.replace('watch?v=', 'embed/');
            return url;
        }
    }
};