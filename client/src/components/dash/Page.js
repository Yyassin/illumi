import React from 'react';
import Chat from './Chat';
import ServerHome from './ServerHome';

class Page extends React.Component {
    
    render() {
        return(
            <ServerHome
                page={this.props.page}
                server={this.props.server}
                uid={this.props.uid}
                member={this.props.member}
                token={this.props.token}
                signout={this.props.signout}
                editMember={this.props.editMember}
                deleteMessage={this.props.deleteMessage}
                />
        )
        if(this.props.page.rooms.length === 0) return <div/>
        return(
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
        )
    }
}

export default Page;