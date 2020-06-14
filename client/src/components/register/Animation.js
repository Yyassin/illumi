import React from 'react';
import CanvasBlob from './CanvasBlob'

//credits: https://codepen.io/ZevanRosser/pen/bde8e879b344202cf06379e44f9e80b2
const HALF_PI = Math.PI / 2;
const bumpRadius = 100;
const halfBumpRadius = bumpRadius / 2;

class Animation extends React.Component {

  wobbleIncrement = 10;
  // use this to change the size of the blob
  radius = 1000;
  // think of this as detail level
  // number of conections in the `bezierSkin`
  segments = 20;
  step = HALF_PI / this.segments;
  anchors = [];
  radii = [];
  thetaOff = [];
  theta = 0;
  thetaRamp = 0;
  thetaRampDest = 30;
  rampDamp = 100;

  constructor(props) {
    super(props);
    this.state = { 
      anchors: this.anchors };

    for (let i = 0; i < this.segments + 2; i++) {
      this.anchors.push(0, 0);
      this.radii.push(Math.random() * bumpRadius - halfBumpRadius);
      this.thetaOff.push(Math.random() * 2 * Math.PI);
    }

    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.thetaRamp += (this.thetaRampDest - this.thetaRamp) / this.rampDamp;
    this.theta += 0.03;

    this.anchors = [0, this.radius];
    for (let i = 0; i <= this.segments + 2; i++) {
      const sine = Math.sin(this.thetaOff[i] + this.theta + this.thetaRamp);
      const rad = this.radius + this.radii[i] * sine;
      const x = rad * Math.sin(this.step * i);
      const y = rad * Math.cos(this.step * i);
      this.anchors.push(x, y);
    }

    this.setState(({ anchors: this.anchors}));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    //end animation
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return <CanvasBlob anchors={this.state.anchors} />;
  }
}

export default Animation;

  
  
  
  
  
  
  
  
  