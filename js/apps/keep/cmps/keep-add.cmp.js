export default {
    template: `
    <section>
        <h4>Which note would you like to add?</h4>
        <!-- <select v-model="cmp.type" @change="changeCmp">
            <option value="noteTxt">Text Note</option>
            <option value="noteTodos">Todos Note</option>
            <option value="noteImg">Img Note</option>
            <option value="noteVideo">Video Note</option>
        </select> -->
        <div class="note-type-btn">
            <button title="reminder" class="fa fa-ellipsis-h" @click="changeCmp('noteTxt')"></button>
            <button title="todo list" class="fa fa-list-ul" @click="changeCmp('noteTodos')"></button>
            <button title="image" class="fa fa-image" @click="changeCmp('noteImg')"></button>
        </div>
        <!-- TODO: FORM -->
        <input v-if="cmp.type==='noteTxt'" type="text" placeholder="what's on your'e mind?" v-model="cmp.info.txt">
        <input v-if="cmp.type==='noteTodos'" type="text" placeholder="what's your'e todos?" v-model="todo">
        <button title="add todo" class="fa fa-plus" v-if="cmp.type==='noteTodos'" @click="addTodo"></button>
        <input  v-if="cmp.type==='noteImg'" type="file" @change="ImgInput" />
        <button title="save" class="fa fa-save" v-if="cmp.type" @click="saveNote"></button>
    </section>
    `,
    data() {
        return {
            cmp: {
                type:'noteTxt',
                info: {},
                color:'#ffffff',
                isPinned:false
            },
            todo: null
        }
    },
    methods: {
        changeCmp(type) {
            this.cmp.type=type;
            this.cmp.info = {}
            if (this.cmp.type === 'noteTxt') this.cmp.info.txt = null;
            if (this.cmp.type === 'noteTodos') this.cmp.info.todos = [];
            if (this.cmp.type === 'noteImg') this.cmp.info.url = null;
        },
        saveNote() {
            this.$emit('save', this.cmp);
            this.cmp = {
                type: null,
                info: {},
                color:'#ffffff',
                isPinned:false
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
                this.cmp.info.url = event.target.result
                console.log(this.cmp);
            }
            reader.readAsDataURL(ev.target.files[0])
        }
    }
}