import React, { Component, PropTypes } from 'react';
import ProgressBar from 'components/ProgressBar';

class Timeline extends Component {
  static contextTypes = {
    videoPlayer: PropTypes.shape({
      currentTime: PropTypes.func,
      duration: PropTypes.number,
    }),
  }

  static propTypes = {
    onMouseMove: PropTypes.func.isRequired,
    onMouseExit: PropTypes.func.isRequired,
  };

  state = {
    percentComplete: 0,
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      const percentComplete = this.percentComplete();

      this.setState({ percentComplete });
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  onMouseMove = (evt) => {
    const mouseWidth = evt.pageX;
    const elementWidth = evt.target.clientWidth;
    const percentWidth = mouseWidth / elementWidth;
    const startAt = Math.floor(this.context.videoPlayer.duration * percentWidth);

    return this.props.onMouseMove(startAt, mouseWidth - 100);
  }

  percentComplete = () => {
    const { currentTime, duration } = this.context.videoPlayer;

    return Math.floor((currentTime() / duration) * 100);
  }

  render () {
    const { onMouseExit } = this.props;
    const { onMouseMove } = this;
    const { percentComplete } = this.state;

    return (
      <div onMouseMove={onMouseMove} onMouseLeave={onMouseExit}>
        <ProgressBar percentComplete={percentComplete} />
      </div>
    );
  }
}

export default Timeline;
