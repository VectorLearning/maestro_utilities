const UserDropdown = React.createClass({
  getInitialState() {
    return { expanded: false };
  },
  
  componentDidMount() {
    let x = document.getElementsByClassName('user-dropdown-disabledLink');
    for (i = 0; i < x.length; i++) {
      x[i].onclick = function() {return false;};
    }
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
          <a href='#' className='dropdown-toggle user-dropdown-disabledLink' onClick={this.toggleDropdown}>
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
