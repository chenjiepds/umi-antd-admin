import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Icon, Input } from 'antd'

import styles from './Login.less'
const FormItem = Form.Item

@Form.create()
@connect()
class Login extends PureComponent {
    handleOk = () => {
        const { dispatch, form } = this.props
        const { validateFieldsAndScroll } = form
        validateFieldsAndScroll((errors, values) => {
            if(!errors) {
                dispatch({
                    type: 'login/login',
                    payload: values
                })
            }
        })
    }
    render() {
        const { getFieldDecorator }  = this.props.form
        return (
            <Fragment>
                <div className={styles.login}>
                    <Form>
                        <FormItem hasFeedback>
                            { getFieldDecorator('username', {
                                rules: [
                                    {required: true, message: '请输入用户名'}
                                ]
                            })(
                                <Input prefix={<Icon type='user' style={{color: 'rgba(0,0,0,0.25)'}} />} placeholder="用户名" 
                                    onPressEnter= {this.handleOk}/>
                            )}
                        </FormItem>
                        <FormItem hasFeedback>
                            { getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码'}
                                ]
                            })(
                                <Input prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,0.25)'}} />} 
                                    type="password" placeholder="密码" onPressEnter={this.handleOk}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick= {this.handleOk}>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

Login.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
}
export default Login