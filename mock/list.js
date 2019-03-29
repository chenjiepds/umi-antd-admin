import { randomAvatar } from './_utils'
import Mock from 'mockjs'

let userListData = Mock.mock({
    'data|80-100':[
        {
            id: '@id',
            name: '@name',
            nickName: '@last',
            phone: /^1[34578]\d{9}$/,
            'age|11-99': 1,
            address: '@country(true)',
            isMale: '@boolean',
            email: '@email',
            createTime: '@datetime',
            avatar() {
                return randomAvatar()
            }
        }
    ]
})

let database = userListData.data;

export default {
    'GET /api/user/list': (req, res) => {
        const { query } = req;
        let { pageSize, page, ...other } = query
        pageSize = pageSize || 10
        page = page || 1

        let newData = database;

        res.status(200).json({
            data: newData.slice((page -1) * pageSize, page * pageSize),
            total: newData.length
        })
    }
}