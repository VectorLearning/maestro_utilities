const NavMenu = React.createClass({
  getDefaultProps() {
    return {
      links: []
    };
  },

  renderLinks() {
    return this.props.links.map((link, index) => {
      if(link.hasOwnProperty('sublinks')) {
        return (
          <NavLinkDropdown
            links={link.sublinks}
            text={link.text}
            active={link.active}
            key={index}
          />
        );
      }

      return (
        <NavLink
          linkTo={link.link}
          text={link.text}
          active={link.active}
          key={index}
        />
      );
    });
  },

  render() {
    return (
      <ul className="nav navbar-nav">
        {this.renderLinks()}
      </ul>
    );
  }
});
