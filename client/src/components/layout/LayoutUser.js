import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import style from './LayoutUser.module.scss';

const {Header, Content, Footer} = Layout;

class LayoutUser extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className={style.logo}/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <div className={style.siteLayoutContent}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

export default LayoutUser;
