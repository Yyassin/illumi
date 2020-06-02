import React from 'react';
import {Layout, Menu, Tooltip} from "antd";

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

    selectServer = async (e) => {
        this.props.selectServer(e.currentTarget.dataset.id);
    }

    render() {
        return (
            <Sider  className="outer-sidebar" collapsed={true} 
                style={ this.state.isActive ? {'background-color': this.props.bg[1]} : {'background-color': this.props.bg[0]}}>
                <SidebarScrollbar style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                
                    <Menu className="outer-menu" defaultSelectedKeys={['0']} mode="inline"
                        style={ this.state.isActive ? {'background-color': this.props.bg[1]} : {'background-color': this.props.bg[0]}}>

                            <ul className="servers">
                                {
                                
                                    this.props.members.map((member, index) => {
                                        console.log(this.props.members)
                                        return (
                                            <Tooltip placement="rightTop" title={member.server.name}>
                                                <li data-id={index} 
                                                    onClick={this.selectServer.bind(this)}>
                                                    <a href="#" className="server-thumbnail"
                                                    style={{background: `url('${member.server.thumbnail}')`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'}}></a>
                                                </li>
                                            </Tooltip>
                                        // <Menu.Item key={index} onClick={this.selectServer} icon={<PieChartOutlined />}>
                                        //     {member.server.name}
                                        // </Menu.Item>
                                        )
                                    })

                                }
                            </ul>

                    </Menu>
                </SidebarScrollbar>
            </Sider>
        )
    }
}

export default Sidebar;