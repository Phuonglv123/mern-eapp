import React, {Component} from 'react';
import style from "../layout/LayoutAdmin.module.scss";
import {Layout} from 'antd';

const {Header} = Layout;

class HeaderAdmin extends Component {
    render() {
        return (
            <Header className={style.siteLayoutBackground} style={{padding: 0}}>
                <div>
                    sssss
                </div>
            </Header>
        );
    }
}

export default HeaderAdmin;
