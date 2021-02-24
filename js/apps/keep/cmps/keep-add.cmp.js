export default {
    template: `
    <section>
        <select v-model="cmp.type" @change="changeCmp">
            <option value="noteTxt">Text Note</option>
            <option value="noteTodos">Todos Note</option>
            <option value="noteImg">Img Note</option>
            <option value="noteVideo">Video Note</option>
        </select>
        <input v-if="cmp.type==='noteTxt'" type="text" placeholder="what's on your'e mind?" v-model="cmp.info.txt">
        <input v-if="cmp.type==='noteTodos'" type="text" placeholder="what's your'e todos?" v-model="todo">
        <button v-if="cmp.type==='noteTodos'" @click="addTodo">ADDtodo</button>
        <input v-if="cmp.type==='noteImg'" type="file" @change="ImgInput" />
        <button v-if="cmp.type" @click="saveNote">ADD note</button>
    </section>
    `,
    data() {
        return {
            cmp: {
                type: null,
                info: {}
            },
            todo: null
        }
    },
    methods: {
        changeCmp() {
            this.cmp.info = {}
            if (this.cmp.type === 'noteTxt') this.cmp.info.txt = null;
            if (this.cmp.type === 'noteTodos') this.cmp.info.todos = [];
            if (this.cmp.type === 'noteImg') this.cmp.info.url = null;
        },
        saveNote() {
            this.$emit('save', this.cmp);
            this.cmp = {
                type: null,
                info: {}
            }
        },
        addTodo() {
            this.cmp.info.todos.push(this.todo);
            this.todo = null;
        },
        ImgInput(ev) {
            this.loadImageFromInput(ev)
        },

        loadImageFromInput(ev) {
            var reader = new FileReader()

            reader.onload = (event) => {
                // var img = new Image()
                // img.onload = onImageReady.bind(null, img)
                this.cmp.info.url = event.target.result
                console.log(this.cmp);
                // console.log(img.src);
            }
            reader.readAsDataURL(ev.target.files[0])
        }
    }
}