const Link = React.createClass({
  getDefaultProps() {
    return {
      colors: {
        link: '#444',
        linkBackgroundHover: 'transparent'
      },
      item: {
        link: '#',
        alt: ''
      }
    };
  },

  getInitialState() {
    return {
      hovered: false
    };
  },

  handleMouseEnter() {
    this.setState({ hovered: true });
  },

  handleMouseLeave() {
    this.setState({ hovered: false });
  },

  hasIcon() {
    return this.props.item.hasOwnProperty('icon');
  },

  hasText() {
    return this.props.item.hasOwnProperty('text');
  },

  renderIcon() {
    const { item } = this.props;

    if (this.hasIcon()) {
      return <i className={item.icon} />;
    }
  },

  renderMiddleSpace() {
    if (this.hasIcon() && this.hasText()) {
      return <span className="spacer" />;
    }
  },

  renderText() {
    const { item } = this.props;

    if (this.hasText()) {
      return item.text;
    }
  },

  render() {
    const { alt, link } = this.props.item;
    const textStyle = { color: this.props.colors.link };

    const hoverStyle= {
      backgroundColor: this.props.colors.linkBackgroundHover
    };

    const style = this.state.hovered ? hoverStyle : {};

    return (
      <a
        href={link}
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ ...textStyle, ...style }}
        title={alt}
      >
        {this.props.children}
        {this.renderIcon()}
        {this.renderMiddleSpace()}
        {this.renderText()}
      </a>
    );
  }
});
