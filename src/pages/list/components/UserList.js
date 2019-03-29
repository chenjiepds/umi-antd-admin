import React, { PureComponent } from 'react'
import { Table, Avatar } from 'antd' 
import DropOption from '@/components/DropOption/DropOption'
import Link from 'umi/link'

class UserList extends PureComponent {
    render() {
        const { ...listProps } = this.props
        const columns = [
            {
                title: '头像',
                dataIndex: 'avatar',
                fixed: 'left',
                render: text => <Avatar style={{marginLeft: 8}} src={text}/>
            },
            {
                title: '名字',
                dataIndex: 'name',
                render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '电子邮箱',
                dataIndex: 'email'
            },
            {
                title: '联系方式',
                dataIndex: 'phone'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                render: (text, record) => {
                    return (
                        <DropOption onMenuClick = { e => this.handleMenuClick(record, e)}
                            menuOptions = {[
                                { key: '1', name: '更新' },
                                { key: '2', name: '删除' }
                            ]}
                        />
                    )
                }
            }
        ]

        return (
            <Table
            {...listProps}
                bordered
                columns={columns}
                simple
                rowKey={record => record.id}
            ></Table>
        )
    }
}

export default UserList