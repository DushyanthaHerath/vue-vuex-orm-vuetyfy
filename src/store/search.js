const Search = {
    state: {
        organizations: [],
        tickets: [],
        users: []
    },
    mutations: {
        setSelected (state, obj) {
            // `state` is the local module state
            state.organizations = obj.organizations;
            state.tickets = obj.tickets;
            state.users = obj.users;
        }
    },

    getters: {
        getSelected (state) {
            return state;
        }
    }
}
export default Search;
