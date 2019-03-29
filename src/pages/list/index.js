import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import UserList from './components/UserList'
import { connect } from 'dva'

@connect(({ list, loading }) => ({list, loading }))
class List extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/query',
            payload: {}
        })
    }

    render() {
        const { loading, list:{list} } = this.props;
        const listProps = {
            dataSource: list,
            loading: loading.effects['list/query']
        }
        return (
            <UserList {...listProps}/>
        )
    }
}
export default List