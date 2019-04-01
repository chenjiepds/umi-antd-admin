import React, { PureComponent, Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import UserList from './components/UserList'
import { connect } from 'dva'

@connect(({ list, loading }) => ({list, loading }))
class List extends Component {
    componentDidMount() {
        this.handleRefresh()
    }

    handleRefresh() {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/query',
            payload: {}
        })
    }

    render() {
        debugger
        const { loading, list, dispatch } = this.props;
        const { userList, pagination } = list
        const _that = this;
        const listProps = {
            dataSource: userList,
            loading: loading.effects['list/query'],
            pagination,
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
            <UserList {...listProps}/>
        )
    }
}
export default List