import React from 'react';
import {Layout, Menu} from "antd";

import SidebarScrollbar from '../scrollbars/SidebarScrollbar'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;
// const { ipcRenderer } = window.require('electron');

class Sidebar extends React.Component {
    
    state = {
        isActive: false,
      }

    // toggleActive() {
    //     this.setState({
    //       isActive: !this.state.isActive
    //     });
    // }
  
    // componentDidMount() {
    //     ipcRenderer.on('focused', (e) => {
    //         this.toggleActive();
    //     });

    //     ipcRenderer.on('blurred', () => {
    //         this.toggleActive();
    //     })
    // }
  
    // componentWillUnmount() {
    //     ipcRenderer.removeAllListeners('focused');
    //     ipcRenderer.removeAllListeners('blurred')
    // }

    render() {
        return (
            <Sider  className="outer-sidebar" collapsed={true} 
                style={ this.state.isActive ? {'background-color': this.props.bg[1]} : {'background-color': this.props.bg[0]}}>
                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                
                    <Menu className="outer-menu" defaultSelectedKeys={['1']} mode="inline"
                        style={ this.state.isActive ? {'background-color': this.props.bg[1]} : {'background-color': this.props.bg[0]}}>
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Option 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />} />
                        <Menu.Item key="10" icon={<FileOutlined />} />
                        <Menu.Item key="11" icon={<FileOutlined />} />
                        <Menu.Item key="12" icon={<FileOutlined />} />
                        <Menu.Item key="13" icon={<FileOutlined />} />
                        <Menu.Item key="14" icon={<FileOutlined />} />
                        <Menu.Item key="15" icon={<FileOutlined />} />
                        <Menu.Item key="16" icon={<FileOutlined />} />

                    </Menu>
                </SidebarScrollbar>
            </Sider>
        )
    }
}

export default Sidebar;