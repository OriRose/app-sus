import {eventBus} from '../../../services/event-bus.service.js'
export default {
    template: `
                <nav>
                  <button :style="getTextColor" v-if="!isPinned" title="pin" @click="pin" class="fas fa-thumbtack"></button>
                  <button :style="getTextColor" v-if="isPinned" :class="{rotate:isPinned}" title="un pin" @click="unpin" class="fas fa-thumbtack"></button>
                  <button :style="getTextColor" @click="isChangeColor=!isChangeColor" class="fas fa-palette">
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
            setTimeout(() => {
                this.isEdit = !this.isEdit;
            }, 0);
        },
        remove() {
            eventBus.$emit('remove', this.id)
        },
        pin() {
            eventBus.$emit('pin', this.id)
        },
        unpin() {
            eventBus.$emit('unpin', this.id)
        },
        changeColor(color) {
            eventBus.$emit('changeColor', this.id, color)
        },
        startEdit() {
            this.isEdit = !this.isEdit;
            this.$emit('startEdit')
        }
    },
    computed: {
        getStyle() {
            return (this.color === 'black') ? 'background-color:black;color:white' : `background-color:${this.color}`
        },
        getTextColor() {
            return (this.color === 'black') ? 'color:white' : ``;
        }
    }
}