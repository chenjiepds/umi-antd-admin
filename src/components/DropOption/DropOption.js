import React from 'react'
import { Menu, Dropdown, Icon, Button } from 'antd'
import PropTypes from 'prop-types'

const DropOption = ({onMenuClick, menuOptions = [], buttonStyle, dropDownProps}) => {
    const menu = menuOptions.map(item => (
        <Menu.Item key={item.key} >{item.name}</Menu.Item>
    ))
    return (
        <Dropdown overlay={<Menu onClick={onMenuClick}>{menu}</Menu>} {...dropDownProps}>
            <Button style={{border: 'none', ...buttonStyle}}>
                <Icon style={{ marginRight: 2}} type="bars"></Icon>
                <Icon type="down"></Icon>
            </Button>
        </Dropdown>
    )
}

DropOption.propTypes = {
    onMenuClick: PropTypes.func,
    menuOptions: PropTypes.array.isRequired,
    buttonStyle: PropTypes.object,
    dropDownProps: PropTypes.object
}

export default DropOption
