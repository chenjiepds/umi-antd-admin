import React, { PureComponent, Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import UserList from './components/UserList'
import { connect } from 'dva'

@connect(({ list, loading }) => ({list, loading }))
class List extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh(params){
        const { dispatch } = this.props;
        dispatch({
            type: 'list/query',
            payload: {...params}
        })
    }

    handleTableChange(pagination, filters, sorter){
        this.handleRefresh({
            page: pagination.current,
            pageSize: pagination.pageSize
        })
    }
    render() {
        
        const { loading, list, dispatch } = this.props;
        const { userList, pagination } = list
        const paginationProps = {
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true
        }
        const _that = this;
        const listProps = {
            dataSource: userList,
            loading: loading.effects['list/query'],
            pagination: paginationProps,
            onDeleteItem(id) {
                dispatch({
                    type: 'list/delete',
                    payload: id
                }).then(() => {
                    _that.handleRefresh()
                })
            }
        }
        return (
            <UserList 
                {...listProps} 
                onChange= { this.handleTableChange.bind(this) } 
            />
        )
    }
}
export default List