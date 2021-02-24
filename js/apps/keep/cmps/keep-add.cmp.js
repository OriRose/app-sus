import {keepService} from '../services/keep-service.js'
export default {
    template:`
    <section>
        <select name="" id="" v-model="inputType">
            <option value="txt">Text Note</option>
            <option value="todos">Todos Note</option>
            <option value="img">Img Note</option>
            <option value="video">Video Note</option>
        </select>
        <input v-if="inputType==='txt'" type="text" placeholder="what's on your'e mind?" v-model="txt">
        <input v-if="inputType==='todos'" type="text" placeholder="what's your'e todos?">
        <input v-if="inputType==='img'" type="file" onchange="onImgInput(event)" />
        <button @click="saveNote">ADD</button>
        <pre>
            {{txt}}
        </pre>
    </section>
    `,
    data(){
        return {
            inputType:null,
            txt:null,
            todos:null,
            img:null,
            video:null
        }
    },
    methods:{
        saveNote(){
            if(inputType==='txt') keepService.save(this.txt);
            if(inputType==='todos') keepService.save(this.todos);
            if(inputType==='img') keepService.save(this.img);
        }
    }
}