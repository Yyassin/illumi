import React from 'react';
import PureCanvas from './PureCanvas'
import Particles from 'react-particles-js'

class CanvasBlob extends React.Component {

    constructor(props) {
        super(props);
        this.saveContext = this.saveContext.bind(this);
      }
    
      saveContext(c) {
        this.c = c;
        this.width = this.c.canvas.width;
        this.height = this.c.canvas.height;
      }
    
      componentDidUpdate() {
        const { anchors } = this.props;

        this.c.clearRect(0, 0, this.width, this.height);
        this.c.save();
        this.c.translate(-10, -10);
        this.c.scale(0.5, 0.5);
        this.c.fillStyle = "rgba(16,18,19, .95)";
        this.c.beginPath();
        this.c.moveTo(0, 0);
        this.bezierSkin(anchors, false);
        
        this.c.lineTo(0, 0);
        this.c.fill();
        this.c.restore();
      }

      bezierSkin = (bez, closed = true) => {
        const avg = this.calcAvgs(bez);
        const leng = bez.length;
      
        if (closed) {
          this.c.moveTo(avg[0], avg[1]);
          for (let i = 2; i < leng; i += 2) {
            let n = i + 1;
            this.c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
          }
          this.c.quadraticCurveTo(bez[0], bez[1], avg[0], avg[1]);
        } else {
            this.c.moveTo(bez[0], bez[1]);
            this.c.lineTo(avg[0], avg[1]);
          for (let i = 2; i < leng - 2; i += 2) {
            let n = i + 1;
            this.c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
          }
          this.c.lineTo(bez[leng - 2], bez[leng - 1]);
        }
      }

        calcAvgs = (p) => {
            const avg = [];
            const leng = p.length;
            let prev;
        
            for (let i = 2; i < leng; i++) {
            prev = i - 2;
            avg.push((p[prev] + p[i]) / 2);
            }
            // close
            avg.push((p[0] + p[leng - 2]) / 2, (p[1] + p[leng - 1]) / 2);
            return avg;
      }
    
      render() {
        return (
          <div>
            <div className="cover"></div>
            <Particles
              params={{
                "particles": {
                    "number": {
                        "value": 100,
                        "density": {
                            "enable": false
                        }
                    },
                    "color": {
                      "value": ["#ffffff","#000000","#7289da","#99aab5","#2c2f33", "#9370DB"]
                    },
                    "size": {
                        "value": 5,
                        "random": true,
                        "anim": {
                            "speed": 7,
                            "size_min": 0.5
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "random": true,
                        "speed": 0.5,
                        "direction": "top",
                        "out_mode": "out"
                    }
                },
                interactivity: {
                  detect_on: "window",
                  events: {
                    onHover: {
                      mode: 'remove',
                      enable: true,
                      parallax: {
                        enable: true,
                        smooth: 1000
                      }
                    },
                    resize: false
                  }
                }
              }
	          } />
            <PureCanvas 
            height={500}
            width={500}
            contextRef={this.saveContext} />
          </div>
        )
      }
    }

export default CanvasBlob;