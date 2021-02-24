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
            <section class="notes">
                <div v-for="cmp in notes">
                    <component :is="cmp.type" :info="cmp.info" class="note"></component>
                </div>
            </section>
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
        .then(notes=>{
            console.log('notes:', notes)
            this.notes=notes
        });
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