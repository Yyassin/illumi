import React from 'react';
import Chat from './Chat';

class Page extends React.Component {
    
    render() {
        if(this.props.page.rooms.length === 0) return <div/>
        return(
            <Chat
                page={this.props.page}
                server={this.props.server}
                uid={this.props.uid}
                member={this.props.member}
                token={this.props.token}
                signout={this.props.signout}
                deleteMessage={this.props.deleteMessage}
                fetchData = {this.props.fetchData}/>
        )
    }
}

export default Page;