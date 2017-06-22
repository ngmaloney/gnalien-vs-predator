import React, { Component, PropTypes } from 'react';
import trailer from 'videos/MacgruberTrailer.mp4';

const baseClass = 'video';

class Video extends Component {
  static contextTypes = {
    videoPlayer: PropTypes.shape({
      setVideoRef: PropTypes.func,
      togglePlaying: PropTypes.func,
    }),
  }

  static propTypes = {
    size: PropTypes.string,
  };

  static defaultProps = {
    size: 'inset',
  };

  render () {
    const { setVideoRef, togglePlaying } = this.context.videoPlayer;
    const { size } = this.props;
    const videoClass = size === 'large' ? `${baseClass}__wrapper--large` : `${baseClass}__wrapper`;

    return (
      <video
        className={videoClass}
        src={trailer}
        ref={setVideoRef}
        onClick={togglePlaying}
      >
        <track />
      </video>
    );
  }
}

export default Video;
