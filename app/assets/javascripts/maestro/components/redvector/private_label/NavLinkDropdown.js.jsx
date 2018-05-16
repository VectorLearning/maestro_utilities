//= require ./NavLink

const NavLinkDropdown = React.createClass({
  getInitialState() {
    return {
      expanded: false,
      hover: false
    };
  },

  getLinks() {
    const styles = this.props.styles;

    return this.props.links.map((link, index) => {
      const active = isActive(link.active);
      return (
        <NavLink
          linkTo={link.link}
          text={link.text}
          active={active}
          styles={styles}
          key={index}
          toggleDropdown={this.toggleDropdown}
        />
      );
    });
  },

  getLinkStyle() {
    const { linkHover, linkNormal } = this.props.styles;

    if (this.state.hover) {
      return linkHover;
    }
    return linkNormal;
  },

  toggleDropdown() {
    this.setState({ expanded: !this.state.expanded });
  },

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  },

  render() {
    const { active, styles, text } = this.props;
    const activeClass = active ? ' active' : '';
    const openClass = this.state.expanded ? ' open' : '';

    return (
      <li className={`dropdown${activeClass}${openClass}`}>
        <a
          href="#"
          style={this.getLinkStyle()}
          className="dropdown-toggle"
          role="button"
          aria-haspopup="true"
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          onClick={this.toggleDropdown}
        >
          {text}
          <span className="caret" />
        </a>
        <ul className="dropdown-menu" style={styles.defaultBackground}>
          {this.getLinks()}
        </ul>
      </li>
    );
  }
});
