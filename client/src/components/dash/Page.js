import React from 'react';
import Chat from './Chat';
import ServerHome from './ServerHome';

const { shell } = window.require('electron')

class Page extends React.Component {

    openResource = () => {
        shell.openExternal(`${this.props.page.video}`)
    }

    renderChat = () => {
        if(this.props.page.rooms.length === 0) return <div/>
            return(
                <div className="chat">
                    <Chat
                    page={this.props.page}
                    server={this.props.server}
                    uid={this.props.uid}
                    member={this.props.member}
                    token={this.props.token}
                    signout={this.props.signout}
                    editMember={this.props.editMember}
                    deleteMessage={this.props.deleteMessage}
                    />
                </div>
            )
    }
    
    render() {

        return (
        //     <ServerHome
        //         page={this.props.page}
        //         server={this.props.server}
        //         uid={this.props.uid}
        //         member={this.props.member}
        //         token={this.props.token}
        //         signout={this.props.signout}
        //         editMember={this.props.editMember}
        //         addEvent={this.props.addEvent}
        //         deleteMessage={this.props.deleteMessage}
        //         />
        // )
            <div className="page">
                <div className="page-meta">
                    <p className="page-banner"
                    style={{
                    'padding': this.props.page.image ? '70px' : '0',
                    'background': `url("${this.props.page.image || null}")`,
                    'background-size': 'cover',
                    'background-position': 'center'}}>
                    </p>
                    <p className="main-content">
                        {this.props.page.content || null}
                    </p>
                    <p className="video-link"
                        onClick={this.openResource}>
                        {this.props.page.video ? 'Link to lecture resources.' : null}
                    </p>
                </div>
                { this.renderChat()}
            </div>
        )
    }
}

export default Page;