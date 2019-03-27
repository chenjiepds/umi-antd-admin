import request from '@/utils/request'
import { stringfy } from 'qs'

export async function fakeLogin(params) {
    return request('/api/login/account', {
        method: 'POST',
        body: params
    })
}