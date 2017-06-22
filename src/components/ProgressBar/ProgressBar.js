import React, { Component, PropTypes } from 'react';

const baseClass = 'progress-bar';

class ProgressBar extends Component {
  static propTypes = {
    percentComplete: PropTypes.number,
  }

  static defaultProps = {
    percentComplete: 0,
  };

  render () {
    const { percentComplete } = this.props;

    return (
      <div className={`${baseClass}__wrapper`}>
        <div className={`${baseClass}__meter`} style={{ width: `${percentComplete}%` }} />
      </div>
    );
  }
}

export default ProgressBar;
