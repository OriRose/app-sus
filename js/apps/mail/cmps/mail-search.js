export default {
    template: `
        <section>
            <input ref="searchInput" type="text" placeholder="Search mail..." @input="setSearch" v-model="searchString">
        </section>
    `,
    data() {
        return {
            searchString: ''
        }
    },
    methods: {
        setSearch() {
            this.$emit('searched', this.searchString)
        }
    },
    mounted(){
        console.log('mounted');
        this.$refs.searchInput.focus()
    }
}