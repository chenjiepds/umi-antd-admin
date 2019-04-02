import React, { PureComponent } from 'react'
import { Table, Avatar, Modal } from 'antd' 
import PropTypes from 'prop-types'
import DropOption from '@/components/DropOption/DropOption'
import Link from 'umi/link'

const { confirm } = Modal

class UserList extends PureComponent {

    constructor(props) {
        super(props)
    }

    handleMenuClick(record, e) {
        const { onEditItem, onDeleteItem } = this.props 

        if(e.key === '1') {
            onEditItem(record)
        } else if (e.key === '2') {
            confirm({
                title: '确定删除该条记录吗？',
                onOk() {
                    onDeleteItem(record.id)
                } 
            })
        }
    }

    handleTableChange(pagination, filters, sorter) {
        const { onChange } = this.props;
        if(onChange) {
            onChange(pagination, filters, sorter)
        }
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      }

    render() {
        const { selectedRowKeys, ...listProps} = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        
        const columns = [
            {
                title: '头像',
                dataIndex: 'avatar',
                // fixed: 'left',
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
                // fixed: 'right',
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
                rowSelection = {rowSelection}
                pagination = {{
                    ...listProps.pagination,
                    showTotal: total => `共${total}条`
                }}
                onChange = {this.handleTableChange.bind(this)}
                bordered
                columns={columns}
                simple
                rowKey={record => record.id}
            ></Table>
        )
    }
}

UserList.propTypes = {
    onDelteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    listProps: PropTypes.object,
    onChange: PropTypes.func.isRequired
}

export default UserList