const Link = React.createClass({
  getInitialState() {
    return {
      hovered: false
    };
  },

  activeStyle() {
    return {
      backgroundColor: this.props.colors.linkBackgroundActive
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

  hoverStyle() {
    const { colors } = this.props;

    return {
      backgroundColor: colors.linkBackgroundHover,
      color: colors.linkHover ? colors.linkHover : colors.link
    };
  },

  isActive() {
    return (this.props.item.active || this.props.active);
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
      return <span className="text">{item.text}</span>;
    }
  },

  render() {
    const { colors, href, item, style: styleProp } = this.props;
    const { alt, link } = item;
    const textStyle = { color: colors.link };

    const linkValue = href ? href : link;
    const hoverStyle = this.state.hovered ? this.hoverStyle() : {};
    const activeStyle = this.isActive() ? this.activeStyle() : {};

    return (
      <a
        className={this.props.className}
        href={linkValue}
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ ...textStyle, ...hoverStyle, ...activeStyle, ...styleProp }}
        title={alt}
      >
        {this.props.children}
        {this.renderIcon()}
        {this.renderMiddleSpace()}
        {this.renderText()}
      </a>
    );
  },

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
  }
});
