import { routerRedux } from 'dva/router'
import { fakeLogin } from '@/services/api'


export default {
    namespace: 'login',

    state: {
        status: undefined
    },

    effects: {
        *login({ payload }, {call, put}) {
            debugger
            const response = yield call(fakeLogin, payload)
            console.log(response)
        }
    }
}