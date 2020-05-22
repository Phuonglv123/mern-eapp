import React, {Component} from 'react';
import {Breadcrumb, Layout, Menu} from 'antd';
import {PieChartOutlined,} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import style from './LayoutAdmin.module.scss'
import AppURL from "../routes/AppURL";
import App from "../../App";
import HeaderAdmin from "../MyHeader/HeaderAdmin";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class LayoutAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className={style.logo}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                        <Menu.Item key={AppURL.dashboard()} icon={<PieChartOutlined/>}>
                            <Link to={AppURL.dashboard()}>
                                Dashboard
                            </Link>
                        </Menu.Item>


                        <Menu.Item key={AppURL.category()} icon={<PieChartOutlined/>}>
                            <Link to={AppURL.category()}>
                                Category
                            </Link>
                        </Menu.Item>


                        <Menu.Item key={AppURL.product()} icon={<PieChartOutlined/>}>
                            <Link to={AppURL.product()}>
                                Product
                            </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <HeaderAdmin/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 14, minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutAdmin;
