import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

class Sticky extends React.PureComponent {
  fixed = false
  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
    if (!!this.supportSticky()) {
      this.el.classList.add(styles.child);
      return;
    }
    this.child = this.el.firstChild;
    this.el.style.height = `${this.child.clientHeight}px`;
    this.child.classList.add(styles.child);
    this.scrollNode = this.getScrollParent(this.el);
    if (this.scrollNode) {
      this.scrollNode.addEventListener('scroll', this.handleScroll);
    }
  }
  componentWillUnmount() {
    if (!this.supportSticky() && this.scrollNode) {
      this.scrollNode.removeEventListener('scroll', this.handleScroll);
    }
  }
  cssSupport(property, value, noPrefixes) {
    const prop = `${property}:`;
    const el = document.createElement('test');
    const mStyle = el.style;
    if(!noPrefixes) {
      mStyle.cssText = `${prop}${['-webkit-', '-moz-', '-ms-', '-o-', ''].join(`${value};${prop}`)}${value};`;
    } else {
      mStyle.cssText = prop + value;
    }
    return mStyle[property];
  }
  supportSticky = () => !!this.cssSupport('position', 'sticky')
  handleScroll = () => {
    const top = this.el.getBoundingClientRect().top;
    if (top < 0 && !this.fixed) {
      this.child.classList.add(styles.sticky);
      this.fixed = true;
    } else if (top > 0 && this.fixed) {
      this.child.classList.remove(styles.sticky);
      this.fixed = false;
    }
  }
  getScrollParent = node => {
    if (node === null) return null;
    if (node.scrollHeight > node.clientHeight) return node;
    return this.getScrollParent(node.parentNode);
  }
  render() {
    const {children} = this.props;
    return !!this.supportSticky() ? children : (
      <div style={{zIndex: 10, position: 'relative'}}>
        {children}
      </div>
    );
  }
}

Sticky.defaultProps = {};

Sticky.propTypes = {};

export default Sticky;
