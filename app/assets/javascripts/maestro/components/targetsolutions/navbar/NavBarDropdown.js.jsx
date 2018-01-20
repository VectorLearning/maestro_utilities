const NavBarDropdown = React.createClass({
  getInitialState() {
    return { expanded: false };
  },
  
  componentDidMount() {
    let x = document.getElementsByClassName('nav-bar-dropdown-disabledLink');
    for (i = 0; i < x.length; i++) {
      console.log(x);
      x[i].onclick = function() {return false;};
    }
  },

  toggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  },

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <NavBarLink
          text={link.text}
          link={link.link}
          isActive={link.active === 'true'}
          key={index}
        />
      );
    });
  },

  render() {
    const { classes, text, links } = this.props;
    const openClass = this.state.expanded ? 'open' : '';

    return (
      <li className={`dropdown ${openClass} ${this.props.isActive ? ' active' : ''}`}>
        <a href='#' className='dropdown-toggle nav-bar-dropdown-disabledLink' onClick={this.toggleExpanded}>
          {text}
          <span className='caret' />
        </a>
        <ul className="dropdown-menu">
          {this.renderLinks(links)}
        </ul>
      </li>
    );
  }
});
