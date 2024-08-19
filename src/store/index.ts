import {createStore} from "vuex";

export type IUpdateDataEvent = {
    blue: number
    red: number
}
export default createStore({
    state: {
        channel: new BroadcastChannel('shared-channel'), blue: 0, red: 0, max: 10000,
    },

    getters: {
        getChannel: state => state.channel,
        getBlue: state => state.blue,
        getRed: state => state.red,
        getMax: state => state.max,
        getRedProc: state => Math.ceil(state.red / state.max * 100),
        getBlueProc: state => Math.ceil(state.blue / state.max * 100),

    },

    mutations: {
        setRed(state, val: number) {
            state.red = val;
        }, setBlue(state, val: number) {
            state.blue = val;
        },
    },

    actions: {
        changeValue({
                        dispatch, commit, state
                    }, payload: IUpdateDataEvent) {
            commit('setBlue', payload.blue);
            commit('setRed', payload.red);

            dispatch('saveData', payload)

            state.channel.postMessage(payload);
        },

        saveData({state: {red, blue}}) {
            localStorage.setItem('data', JSON.stringify({red, blue}))
        }, updateData({commit}, {red, blue}) {
            commit('setRed', red);
            commit('setBlue', blue);
        }, updateDataLS({dispatch}) {
            const data = localStorage.getItem('data')
            if (data) {
                dispatch('updateData', JSON.parse(data) as IUpdateDataEvent)
            }
        }
    },
});
