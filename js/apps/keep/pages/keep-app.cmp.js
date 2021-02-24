import keepFilter from '../cmps/keep-filter.cmp.js'
import keepList from '../cmps/keep-list.cmp.js'

export default {
    template:`
        <section>
            <h1>keep page</h1>
            <keep-filter/>
            <keep-list/>
            <!-- <router-link to="/add" style="color:red">Add A Book</router-link> -->
            <!-- <book-details v-else :book="selectedBook" @close="selectedBook = null"/> -->
        </section>
    `,
    components:{
        keepFilter,
        keepList
    }
}