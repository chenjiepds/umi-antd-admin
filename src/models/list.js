import { queryUserList, deleteUserItem } from '@/services/api'

export default {
    namespace: 'list',

    state: {
    },

    effects: {
        *query({payload}, {call, put}) {
            const response = yield call(queryUserList, payload)
        
            yield put({
                type: 'queryList',
                payload: {
                    userList: Array.isArray(response.data) ? response.data : [],
                    pagination: {
                        current: Number(payload.page) || 1,
                        pageSize: Number(payload.pageSize) || 10,
                        total: response.total
                    }
                }
            })
        },
        *delete({payload}, {call, put}) {
            const data = yield call(deleteUserItem, {id: payload})
            console.log(data)
        }
    },

    reducers: {
        queryList(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}