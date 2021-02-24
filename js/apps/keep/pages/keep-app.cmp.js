import {keepService} from '../services/keep-service.js'
import keepFilter from '../cmps/keep-filter.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'
import keepList from '../cmps/keep-list.cmp.js'

import noteImg from '../note-cmps/note-img.cmp.js'
import noteTxt from '../note-cmps/note-txt.cmp.js'
import noteTodos from '../note-cmps/note-todos.cmp.js'
import noteVideo from '../note-cmps/note-video.cmp.js'

export default {
    template: `
        <section>
            <h1>keep page</h1>
            <!-- <keep-filter/> -->
            <keep-add/>
            <div v-for="cmp in notes"></div>
            <!-- <router-link to="/add" style="color:red">Add A Book</router-link> -->
            <!-- <book-details v-else :book="selectedBook" @close="selectedBook = null"/> -->
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        keepService.query()
        .then(notes=>this.notes=notes);
    },
    components: {
        keepFilter,
        keepAdd,
        keepList,
        noteImg,
        noteTxt,
        noteTodos,
        noteVideo
    }
}