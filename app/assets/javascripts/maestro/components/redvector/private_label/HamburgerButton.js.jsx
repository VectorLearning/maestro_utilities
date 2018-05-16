const HamburgerButton = React.createClass({
  getInitialState() {
    return { hover: false };
  },

  getLinkStyle() {
    const { linkHover, linkNormal } = this.props.styles;

    if (this.state.hover) {
      return linkHover;
    }
    return linkNormal;
  },

  handleClick() {
    this.props.toggleMenu();
  },

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  },

  render() {
    return (
      <button
        type="button"
        style={this.getLinkStyle()}
        className="navbar-toggle"
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.handleClick}
      >
        <span className="sr-only">Toggle navigation</span>
        <i className="fa fa-bars" />
        <span className="text">Menu</span>
      </button>
    );
  }
});
