import React from 'react';
import Chat from './Chat';

class Page extends React.Component {
    
    render() {
        if(this.props.page.rooms.length === 0) return <div/>
        console.log(this.props.page.title)
        return(
            <Chat
                page={this.props.page}
                server={this.props.server}
                uid={this.props.uid}
                token={this.props.token}
                signout={this.props.signout}/>
        )
    }
}

export default Page;