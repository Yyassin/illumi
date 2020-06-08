import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class SidebarScrollbar extends Component {
    scrollbar = React.createRef()

    isScrolling = true;


    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = { top: 0 };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    handleUpdate(values) {
        const { top } = values;
        this.setState({ top });
    }


    //scroll down on initial render
    componentDidUpdate() { 
        this.scrollDown();
    }

    //scroll down on ping
    newMessage = () => {
        this.isScrolling = true;
        this.scrollDown();
    }

    //scroll down function
    scrollDown = async() => {
        if(this.isScrolling && this.props.isChat){
            await this.scrollbar.current.scrollToBottom()
            this.isScrolling = false;
        }
    }
    
    renderView({ style, ...props }) {
        const viewStyle = {
            'overscroll-behavior': 'contain',
            // backgroundColor: `232323`,
            // color: `white`
        };
        return (
            <div
                className="box"
                style={{ ...style, ...viewStyle }}
                {...props}/>
        );
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: this.props.bg || ''
        };
        return (
            <div
                style={{ ...style, ...thumbStyle, borderRadius: '10px' }}
                {...props}/>
        );
    }

    render() {
        return (
            <Scrollbars
                ref={ this.props.isChat ? this.scrollbar : " "}
                
                autoHide
                // Hide delay in ms
                autoHideTimeout={500}
                // Duration for hide animation in ms.
                autoHideDuration={500}
                
                renderView={this.renderView}
                
                renderTrackVertical={({style, ...props}) =>
                     <div {...props} className="Vertical" style={{...style, backgroundColor: this.props.tc || '', right: '2px', bottom: '2px', top: '2px', borderRadius: '5px', width: '4px'}}/>
                    }

                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onUpdate={this.handleUpdate}
                {...this.props}/>
        );
    }
}