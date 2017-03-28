const SideNavMenu = React.createClass({
  getInitialState() {
    return { isOpen: this.props.isActive };
  },

  renderLinks() {
    return this.props.links.map((link, index) => {
      return (
        <SideNavLink
          icon={link.icon}
          text={link.text}
          link={link.link}
          isActive={link.active === 'true'}
          key={index}
        />
      );
    });
  },

  toggleCollapse() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  render() {
    const { icon, text, isActive } = this.props;

    return (
      <li className={`collapsible ${isActive ? 'active' : ''}`}>
        <a href='#' onClick={this.toggleCollapse}>
          <i className={`fa ${icon} fa-2x`} />
          <span className='text hidden-text'>{text}</span>
          <i className='fa fa-chevron-down fa-fw hidden-text' />
        </a>
        <ul className={`collapse ${this.state.isOpen ? 'in' : ''}`}>
          {this.renderLinks()}
        </ul>
      </li>
    );
  }
});
