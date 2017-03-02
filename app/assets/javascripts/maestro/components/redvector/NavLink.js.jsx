const NavLink = React.createClass({
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

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  },

  render() {
    return (
      <li
        className={(this.props.active ? 'active' : '')}
        key={this.props.key}
      >
        <a
          style={this.getLinkStyle()}
          href={this.props.linkTo}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          {this.props.text}
        </a>
      </li>
    );
  }
});
