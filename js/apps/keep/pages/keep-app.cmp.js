import { keepService } from '../services/keep-service.js'
import keepFilter from '../cmps/keep-filter.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'
import keepList from '../cmps/keep-list.cmp.js'

import noteImg from '../note-cmps/note-img.cmp.js'
import noteTxt from '../note-cmps/note-txt.cmp.js'
import noteTodos from '../note-cmps/note-todos.cmp.js'
import noteVideo from '../note-cmps/note-video.cmp.js'

export default {
    template: `
        <section class="main-content">
            <!-- <keep-filter/> -->
            <keep-add class="add" @save="save"/>
            <section class="notes">
                <div v-for="cmp in notes">
                    <component
                     :is="cmp.type"
                     :info="cmp.info"
                     :color="cmp.color"
                     :id="cmp.id" 
                     class="note" 
                     @edit="edit" 
                     @remove="remove"
                     @pin="pin"
                     @changeColor="changeColor"
                     ></component>
                </div>
            </section>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    methods: {
        getNotes() {
            keepService.query()
                .then(notes => {
                    console.log('notes:', notes)
                    this.notes = notes
                });
        },
        save(note) {
            keepService.save(note)
                .then(() => this.getNotes());
        },
        edit(id,val) {
            console.log('val:', val)
            keepService.getById(id)
                .then(note => {
                    console.log(typeof(val));
                    if(typeof(val)==='string') note.info.txt=val;
                    else note.info.todos[val.idx] = val.txt;
                    keepService.save(note)
                        .then(() => this.getNotes());
                })
        },
        remove(id) {
            keepService.remove(id)
                .then(() => this.getNotes());
        },
        pin(id) {
            keepService.getIdxById(id)
                .then(noteIdx => {
                    const note=this.notes.splice(noteIdx,1)[0];
                    this.notes.unshift(note);
                    keepService.saveNotes(this.notes)
                        .then(() => this.getNotes());
                })

        },
        changeColor(id, color) {
            keepService.getById(id)
                .then(note => {
                    note.color = color;
                    keepService.save(note)
                        .then(() => this.getNotes());
                })
        }
    },
    created() {
        this.getNotes();
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