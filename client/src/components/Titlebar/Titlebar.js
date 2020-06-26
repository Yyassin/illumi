import React from 'react'
import TitlebarLeg from './TitlebarLeg'
import TitlebarWin from './TitlebarWin'

class Titlebar extends React.Component {
    state = {
        os: undefined,
    }

    componentDidMount = () => {
        if (navigator.appVersion.indexOf("Win")!=-1) this.setState({os: "Windows"});
        if (navigator.appVersion.indexOf("Mac")!=-1) this.setState({os: "MacOS"});
        if (navigator.appVersion.indexOf("X11")!=-1) this.setState({os: "UNIX"});
        if (navigator.appVersion.indexOf("Linux")!=-1) this.setState({os: "Linux"});
    }

    render() {
        if (this.state.os !== 'MacOS') {
          return <TitlebarWin bg={this.props.bg} title={this.props.title}/>
        } else {
          return <TitlebarLeg bg={this.props.bg} title={this.props.title}/>
        }
    }
}

export default Titlebar;