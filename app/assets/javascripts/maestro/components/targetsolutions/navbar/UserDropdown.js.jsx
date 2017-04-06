const UserDropdown = React.createClass({
  getInitialState() {
    return { expanded: false };
  },

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <NavBarLink
          text={link.text}
          link={link.link}
          isActive={false}
          key={index}
        />
      );
    });
  },

  toggleDropdown() {
    this.setState({ expanded: !this.state.expanded });
  },

  render() {
    const { classes, text, links } = this.props;
    const openClass = this.state.expanded ? 'open' : '';

    return (
      <ul className={`nav navbar-nav ${classes}`}>
        <li className={`dropdown ${openClass} ${this.props.isActive ? ' active' : ''}`}>
          <a href='#' className='dropdown-toggle' onClick={this.toggleDropdown}>
            {text}
            <span className='caret' />
          </a>
          <ul className="dropdown-menu">
            {this.renderLinks(links)}
          </ul>
        </li>
      </ul>
    );
  }
});
