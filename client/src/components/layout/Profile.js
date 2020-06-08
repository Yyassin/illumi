import React from 'react';
import NavMenu from './NavMenu'

class Profile extends React.Component {  

    state = {
        user : {}
    }

    componentDidMount = () => {
        this.synchronize();
    }

    synchronize = async () => {
        if (this.props.user !== this.state.user) {
            this.setState({user: this.props.user})
        }
    }

    renderMenu = () => {
        return(
            <NavMenu
                user = {this.props.user} //need to sync this  
                logout = {this.props.signout}  
                fetchData = {this.props.fetchData}
                editProfile={this.props.editProfile}                    
            />
        )
    }

    render() {
        this.synchronize();
        return(
            <div className="profile-section">
                <ul className="profile-items">
                    <li className="avatar" ><a href="#" className="avatar-btn"
                        style={{background: `url('${this.state.user.thumbnail}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'}}></a></li>
                    
                    <li className="profile-info">
                        <ul>
                            <li className="info-name">{this.state.user.name}</li>
                            <li className="info-email">{this.state.user.email}</li>
                        </ul>
                    </li>

                    
                    {/* <li className="settings"><a onClick={this.props.toggleTheme} className="settings-btn" href="#">{<SettingFilled />}</a></li> */}
                    
                    {this.renderMenu()}
                
                </ul>
            </div>
        )
    }
}

export default Profile;