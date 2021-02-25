export default {
    template: `
          <section :style="getStyle">
          <span :class="{fa:isPinned, 'fa-paperclip':isPinned}"></span>
            <iframe
                width="150" height="112"
                :src="info.url">
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
                  <button @click="edit" class="fas fa-edit"></button>
                  <button @click="remove" class="fas fa-trash"></button>
                </nav>
            </section>
            `,
    props: ["info", "id", "color", "isPinned"],
    data() {
        return {
            isChangeColor: false,
        }
    },
    methods: {
        edit() {
            this.$emit('edit', this.id)
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
        }

    },
    computed: {
        getStyle() {
            return (this.color === 'black') ? 'background-color:black;color:white' : `background-color:${this.color}`
        }
    }
};