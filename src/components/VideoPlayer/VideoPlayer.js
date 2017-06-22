import React, { Component, PropTypes } from 'react';

class VideoPlayer extends Component {
  static childContextTypes = {
    videoPlayer: PropTypes.shape({
      setVideoRef: PropTypes.func,
      togglePlaying: PropTypes.func,
      currentTime: PropTypes.func,
      duration: PropTypes.number,
    }),
  }

  static propTypes = {
    autoplay: PropTypes.bool,
    children: PropTypes.any,
    startAt: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    autoplay: false,
    startAt: 0,
    style: {},
  };

  state = {
    isPlaying: false,
  }

  getChildContext () {
    const { isPlaying } = this.state;
    const { setVideoRef, togglePlaying, video } = this;

    return {
      videoPlayer: {
        setVideoRef,
        togglePlaying,
        isPlaying,
        currentTime: () => { video ? video.currentTime : 0; },
        duration: video ? video.duration : 1,
      },
    };
  }

  componentWillReceiveProps = ({ startAt }) => {
    if (startAt !== this.props.startAt) {
      this.video.currentTime = startAt;
    }

    return false;
  }

  setVideoRef = (video) => {
    const { autoplay, startAt } = this.props;

    if (autoplay && video) {
      video.currentTime = startAt;
      video.muted = true;
      video.play()
        .catch(() => false);
    }

    this.video = video;
  }

  togglePlaying = () => {
    const { video } = this;
    const { isPlaying } = this.state;

    if (!video) return false;

    if (isPlaying) {
      this.setState({ isPlaying: false }, () => video.pause());

      return false;
    }

    this.setState({ isPlaying: true }, () => video.play());

    return false;
  }

  render () {
    const { children, style } = this.props;

    return (
      <div style={style}>
        {children}
      </div>
    );
  }
}

export default VideoPlayer;
