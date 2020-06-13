import React from 'react';

class CanvasBlob extends React.Component {
    blob = React.createRef();


    renderBlob = () => {
        const TWO_PI = Math.PI * 2;
        const HALF_PI = Math.PI / 2;
        let wobbleIncrement = 0;
        let radius = 500;
        let segments = 12;
        let step = HALF_PI / this.segments
        let anchors = [];
        let radii = [];
        let thetaOff = [];

        const bumpRadius = 100;
        

        if (this.blob.current) {
            const c = this.blob.current.getContext("2d")
        }


    }

    render() {
        return (
            <canvas className="canvas-blob" ref={this.blob}></canvas>
        )
    }
}

export default CanvasBlob;