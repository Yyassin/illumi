import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class SidebarScrollbar extends Component {

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
    
    renderView({ style, ...props }) {
        const { top } = this.state;
        const viewStyle = {
            padding: 20,
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
        const { top } = this.state;
        const thumbStyle = {
            backgroundColor: `#0a0a0a`
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
                autoHide
                // Hide delay in ms
                autoHideTimeout={500}
                // Duration for hide animation in ms.
                autoHideDuration={500}
                
                renderView={this.renderView}
                
                renderTrackVertical={({style, ...props}) =>
                     <div {...props} className="Vertical" style={{...style, backgroundColor: '#232323', right: '2px', bottom: '2px', top: '2px', borderRadius: '5px', width: '7px'}}/>
                    }

                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onUpdate={this.handleUpdate}
                {...this.props}/>
        );
    }
}