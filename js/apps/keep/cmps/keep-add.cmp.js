import {keepService} from '../services/keep-service.js'
export default {
    template:`
    <section>
        <select name="" id="" v-model="cmp.type" @change="changeCmp">
            <option value="noteTxt">Text Note</option>
            <option value="noteTodos">Todos Note</option>
            <option value="noteImg">Img Note</option>
            <option value="noteVideo">Video Note</option>
        </select>
        <input v-if="cmp.type==='noteTxt'" type="text" placeholder="what's on your'e mind?" v-model="cmp.info.txt">
        <input v-if="cmp.type==='noteTodos'" type="text" placeholder="what's your'e todos?" v-model="todo">
        <button v-if="cmp.type==='noteTodos'" @click="addTodo">ADDtodo</button>
        <input v-if="cmp.type==='noteImg'" type="file" onchange="onImgInput(event)" />
        <button @click="saveNote">ADD note</button>
        <pre>
            {{cmp}}
        </pre>
    </section>
    `,
    data(){
        return {
            cmp:{
                type:null,
                info:{}
            },
            todo:null
        }
    },
    methods:{
        changeCmp(){
            this.cmp.info={}
            if(this.cmp.type==='noteTxt') this.cmp.info.txt=null;
            if(this.cmp.type==='noteTodos') this.cmp.info.todos=[];
            if(this.cmp.type==='noteImg') this.cmp.info.url=null;
        },
        saveNote(){
            console.log(this.cmp);
            keepService.save(this.cmp)
                .then(()=>{
                    this.cmp={
                        type:null,
                        info:{}
                    }
                })
        },
        addTodo(){
            this.cmp.info.todos.push(this.todo);
            this.todo=null;
        }
    }
}