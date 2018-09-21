//= require ../common/Link

const SideNavLink = React.createClass({
  isActive() {
    return this.props.link.active == 'true';
  },

  renderIcon() {
    const { link } = this.props;

    if (link.icon) {
      return <i className={link.icon} />;
    }
  },

  renderTriangle() {
    const { activeHighlight } = this.props.colors;

    const arrowStyle = {
      borderRight: `11px solid ${activeHighlight}`
    };

    if (this.isActive()) {
      return <div style={arrowStyle} className="triangle" />;
    }
  },

  render() {
    const { colors } = this.props;
    const { link, text } = this.props.link;

    const activeStyle = {
      borderLeftColor: colors.activeHighlight,
    };

    const style = this.isActive() ? activeStyle : {};

    return (
      <Link
        href={link}
        active={this.isActive()}
        className="side-nav-link"
        colors={colors}
        style={style}
      >
        {this.renderIcon()}
        <span className="text">{text}</span>
        {this.renderTriangle()}
      </Link>
    );
  },

  getDefaultProps() {
    return {
      colors: {
        activeHighlight: '#fff'
      },
      link: {
        active: 'false'
      }
    };
  }
});
