import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',
    SET_USER: 'SET_USER'
}

const state = {
    isAuthenticated: false,
    user: {}
}

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
}

const mutations = {
    [types.SET_AUTHENTICATED](state, isAuthenticated) {
        //设置了一个方法，名字为types.SET_AUTHENTICATED。参数为state, isAuthenticated
        if (isAuthenticated) { //判断是否授权
            state.isAuthenticated = isAuthenticated
        } else {
            state.isAuthenticated = false
        }
    },
    [types.SET_USER](state, user) {
        if (user) { //判断user是否存在
            state.user = user
        } else {
            state.user = {}
        }
    }
}

const actions = {
    setAuthenticated: ({ commit }, isAuthenticated) => { //授权
        commit(types.SET_AUTHENTICATED, isAuthenticated)
    },
    setUser: ({ commit }, user) => { //用户
        commit(types.SET_USER, user)
    },
    clearCurrentState: ({ commit }) => { //清除当前状态
        commit(types.SET_AUTHENTICATED, false)
        commit(types.SET_USER, null)
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})