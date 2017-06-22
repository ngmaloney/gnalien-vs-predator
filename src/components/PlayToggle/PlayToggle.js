import React, { Component, PropTypes } from 'react';

class PlayToggle extends Component {
  static contextTypes = {
    videoPlayer: PropTypes.shape({
      togglePlaying: PropTypes.func,
      isPlaying: PropTypes.bool,
    }),
  }

  render () {
    return (
      <button onClick={this.context.videoPlayer.togglePlaying}>
        {this.context.videoPlayer.isPlaying ? 'PAUSE' : 'PLAY'}
      </button>
    );
  }
}

export default PlayToggle;
