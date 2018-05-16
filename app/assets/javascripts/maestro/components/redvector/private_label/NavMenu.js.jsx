//= require ./NavLink
//= require ./NavLinkDropdown

const NavMenu = React.createClass({
  renderLinks() {
    const { styles, links } = this.props;

    return links.map((link, index) => {
      const active = isActive(link.active);

      if (link.hasOwnProperty('sublinks')) {
        return (
          <NavLinkDropdown
            links={link.sublinks}
            text={link.text}
            active={active}
            styles={styles}
            key={index}
          />
        );
      }

      return (
        <NavLink
          linkTo={link.link}
          text={link.text}
          active={active}
          styles={styles}
          key={index}
        />
      );
    });
  },

  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        {this.renderLinks()}
      </ul>
    );
  }
});
