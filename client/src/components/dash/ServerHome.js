import React from 'react';
import EventCalendar from './EventCalendar';
import SidebarScrollbars from '../scrollbars/SidebarScrollbar'
import './Dash.css'


const { shell } = window.require('electron')

class ServerHome extends React.Component {

    openOutline = () => {
        shell.openExternal(`${this.props.server.outline}`)
    }

    render() {
        return (
            <div className="main">
                <SidebarScrollbars 
                    isChat={true}
                    ref={this.scrollbar} 
                    style={{ width: '100%', height: '100%', overflow: 'hidden' }} 
                    bg={'#444444'} 
                    tc={'transparent'}>

                    
                    <div className="home-content">
                        <h1 className="server-title">{`Welcome to `}<br />{this.props.server.name}</h1>
                        <p className="greeting">
                            This is the beginning of this server. Here's some information to help you get started.
                        </p>
                        <div className="description">{this.props.server.description}</div>
                        <div className="outline">
                            <p onClick={this.openOutline} className="link">Course Outline</p>
                        </div>
                        
                        <div className="event-container">
                            <h2 className="event">Important Events</h2>
                            <p onClick={this.openOutline} className="add-event">+</p>
                        </div>
                        {/* <EventCalendar /> */}
                    </div>
                </SidebarScrollbars>
            </div>
        )
    }
}

export default ServerHome;