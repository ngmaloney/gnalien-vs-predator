import React, { Component } from 'react';

import VideoPlayer from 'components/VideoPlayer';
import Timeline from 'components/Timeline';
import Video from 'components/Video';

const baseClass = 'app';

class App extends Component {
  state = {
    showMiniPlayer: false,
    startAt: 0,
    left: 0,
  }

  hideMiniPlayer = () => {
    this.setState({ showMiniPlayer: false });
  }

  showMiniPlayer = (startAt, left) => {
    this.setState({ showMiniPlayer: true, startAt, left });
  }

  renderHoverPlayer = () => {
    const { left, showMiniPlayer, startAt } = this.state;

    if (!showMiniPlayer) return false;

    return (
      <VideoPlayer
        autoplay
        startAt={startAt}
        style={{ position: 'absolute', bottom: 20, left }}
      >
        <Video />
      </VideoPlayer>
    );
  }

  render () {
    const { hideMiniPlayer, renderHoverPlayer, showMiniPlayer } = this;

    return (
      <div className={baseClass}>
        <h1 className={`${baseClass}__header`}>GnarTube</h1>
        <VideoPlayer style={{ position: 'relative' }}>
          <Video size="large" />
          {renderHoverPlayer()}
          <Timeline onMouseMove={showMiniPlayer} onMouseExit={hideMiniPlayer} />
        </VideoPlayer>
      </div>
    );
  }
}

export default App;
