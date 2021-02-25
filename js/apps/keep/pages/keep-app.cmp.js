import { keepService } from '../services/keep-service.js'
import { eventBus } from '../../../services/event-bus.service.js'
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
            <keep-filter  @filter="setFilter"/>
            <keep-add class="add" @save="save"/>
            <section class="notes">
                <div v-for="cmp in notes">
                    <component
                     :is="cmp.type"
                     :info="cmp.info"
                     :color="cmp.color"
                     :isPinned="cmp.isPinned"
                     :id="cmp.id" 
                     class="note" 
                     @edit="edit" 
                     @remove="remove"
                     @pin="pin"
                     @unpin="unpin"
                     @changeColor="changeColor"
                     ></component>
                </div>
            </section>
        </section>
    `,
    data() {
        return {
            notes: null,
            filter:null
        }
    },
    methods: {
        getNotes() {
            keepService.query()
                .then(notes => {
                    console.log('notes:', notes)
                    if(this.filter){
                        const notesToShow=notes.filter(note=>{
                            if(note.type==='noteTodos'){
                                return note.info.todos.some(todo=>todo.txt.includes(this.filter))
                            }
                            else{
                                if(note.info.txt){
                                    return note.info.txt.includes(this.filter);
                                }
                                else return;
                            }
                        })
                        console.log('notesToShow:', notesToShow)
                        this.notes = notesToShow
                    }
                    else{
                        this.notes=notes;
                    }
                });
        },
        save(note) {
            keepService.save(note)
                .then(() => this.getNotes())
                .then(() => this.showMsg('success'))
                .catch(()=> this.showMsg('error'))
        },
        edit(id, val) {
            keepService.getById(id)
            .then(note => {
                    if(typeof (val) === 'string') note.info.txt = val;
                    else note.info.todos=val;                   
                    console.log('val:', val) 
                    keepService.save(note)
                    .then(() => this.getNotes())
                    .then(() => this.showMsg('success'))
                    .catch(()=> this.showMsg('error'))
                })
            
        },
        remove(id) {
            keepService.remove(id)
                .then(() => this.getNotes())
                .then(() => this.showMsg('success'))
                .catch(()=> this.showMsg('error'))
        },
        pin(id) {
            keepService.getIdxById(id)
                .then(noteIdx => {
                    const note = this.notes.splice(noteIdx, 1)[0];
                    note.isPinned = true;
                    this.notes.unshift(note);
                    keepService.saveNotes(this.notes)
                        .then(() => {
                            keepService.save(note)
                                .then(() => this.getNotes())
                                .then(() => this.showMsg('success'))
                                .catch(()=> this.showMsg('error'))
                        })
                })

        },
        unpin(id) {
            keepService.getIdxById(id)
                .then(noteIdx => {
                    const note = this.notes.splice(noteIdx, 1)[0];
                    note.isPinned = false;
                    this.notes.push(note);
                    keepService.saveNotes(this.notes)
                        .then(() => {
                            keepService.save(note)
                                .then(() => this.getNotes())
                                .then(() => this.showMsg('success'))
                                .catch(()=> this.showMsg('error'))
                        })
                })

        },
        changeColor(id, color) {
            keepService.getById(id)
                .then(note => {
                    note.color = color;
                    keepService.save(note)
                        .then(() => this.getNotes())
                        .then(() => this.showMsg('success'))
                        .catch(()=> this.showMsg('error'))
                })
        },
        setFilter(filterKey){
            console.log('filterKey:', filterKey)
            this.filter=filterKey;
            this.getNotes();
        },
        showMsg(type) {
            const msg = {
                txt: (type==='success')?'note saved':'try again later!',
                type
            }
            eventBus.$emit('show-msg', msg);
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