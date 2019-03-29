import { routerRedux } from 'dva/router'
import { stringify } from 'qs'
import { fakeLogin } from '@/services/api'
import { setAuthority } from '@/utils/authority'
import { getPageQuery } from '@/utils/utils'


export default {
    namespace: 'login',

    state: {
        status: undefined
    },

    effects: {
        *login({ payload }, {call, put}) {
            const response = yield call(fakeLogin, payload)
            yield put({
                type: 'changeLoginStatus',
                payload: response
            })
            if(response.status == 'ok') {
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();  
                let { redirect } = params;
                
                if(redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if(redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if(redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'))
            }
        },
        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                    currentAuthority: 'guest'
                }
            });
            console.log(stringify(window.location.href))
            yield put(routerRedux.push({
                pathname: '/user/login',
                search: stringify({
                    redirect: window.location.href
                })
            }))
        }
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            console.log(...state)
            debugger
            return {
                ...state,
                status: payload.status,
            }
        }
    }
}