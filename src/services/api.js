import request from '@/utils/request'
import { stringify } from 'qs'

export async function fakeLogin(params) {
    return request('/api/login/account', {
        method: 'POST',
        body: params
    })
}

export async function queryUserList(params) {
    return request(`/api/user/list?${stringify(params)}`)
}

export async function deleteUserItem(param) {
    return request(`/api/user/delete/${param.id}`)
}