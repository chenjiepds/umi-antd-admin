import { queryUserList } from '@/services/api'

export default {
    namespace: 'list',

    state: {
        list: []
    },

    effects: {
        *query({payload}, {call, put}) {
            const response = yield call(queryUserList, payload)
            
            yield put({
                type: 'queryList',
                payload: Array.isArray(response.data) ? response.data : []
            })
        }
    },

    reducers: {
        queryList(state, action) {
            return {
                ...state,
                list: action.payload
            }
        }
    }
}