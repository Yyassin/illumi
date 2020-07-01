import React from 'react';
import io from 'socket.io-client';


let data;

class Whiteboard extends React.Component {
    canvas = React.createRef();
    socket;
    c;
    ctx;
    painting = false;

    componentDidMount = () => {   
        this.socket = io.connect("http://localhost:4000");      
        this.initCanvas();
    }

    componentWillUnmount = () => {
        this.socket.emit('forceDisconnect')
        this.socket.close();
    }

    initCanvas = () => {
        if (this.canvas.current) {
            this.c = this.canvas.current
            this.ctx = this.c.getContext('2d')
            this.c.height = window.innerHeight - 110;
            this.c.width = window.innerWidth;

             //events Listen (mouse action)
            this.c.addEventListener('mousedown', this.startPosition);
            this.c.addEventListener('mouseup', this.finishedPosition);
            this.socket.on('friendMouseup', () => this.ctx.beginPath());
            this.c.addEventListener('mousemove', this.drawClient)
            
            this.socket.on('mouse2', (data) => {
                if (this.props.server.id === data.serverID) {
                    this.draw(data.x-322, data.y-110)
                }
            })
        }
    }

    startPosition = (e) => {
        this.painting = true;
        this.draw(e.clientX-322, e.clientY-110);
    }

    finishedPosition = () => {
        this.painting = false;
        this.ctx.beginPath();
        this.socket.emit('friendMouseup')
    }

    drawClient = (e) => {
        if (!this.painting) return //not holding down mouse
    
        data = {
          x: e.clientX,
          y: e.clientY,
          serverID: this.props.server.id
        }
    
        this.socket.emit('mouse', data)
    
        this.draw(data.x-322, data.y-110)
    }

    draw = (x, y) => {
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "#fff";
        // ctx.lineCap = 'round'
    
        
        this.ctx.lineTo(x, y)
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x, y)
    }

    render() {
        return (
            <div>
                <canvas className="whiteboard" ref={this.canvas}></canvas>
            </div>
        )
    }
}

export default Whiteboard;