import React from 'react';

class PureCanvas extends React.Component {
    shouldComponentUpdate() {
      return true;
    }

    render() {
      return (
        <canvas
          width={this.props.width}
          height={this.props.height}
          className = "canvas-blob"
          ref={node =>
            node ? this.props.contextRef(node.getContext('2d')) : null
          }
        />
      );
    }
  }

  export default PureCanvas;
  