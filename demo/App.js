import React from 'react';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId';
import Sticky from '../src/index';

const styles = {
  item: {
    height: 40,
    lineHeight: '40px',
  },
  stickyItem: {
    height: 40,
    lineHeight: '40px',
    backgroundColor: 'red',
  },
};

class App extends React.PureComponent {
  render() {
    return (
      <div>
        {times(20).map(() => (
          <div key={uniqueId()} style={styles.item}>I am item</div>
        ))}
        <Sticky>
          <div key={uniqueId()} style={styles.stickyItem}>
            I am sticky item
          </div>
        </Sticky>
        {times(100).map(() => (
          <div key={uniqueId()} style={styles.item}>I am item</div>
        ))}
      </div>
    );
  }
}

App.defaultProps = {};

App.propTypes = {};

export default App;
