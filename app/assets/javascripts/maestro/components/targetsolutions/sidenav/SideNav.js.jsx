const SideNav = React.createClass({
  renderAvatar(avatar, controller) {
    if (controller === 'home') {
      return <SideNavAvatar avatar={avatar} />;
    }
  },

  renderLinks(links, controller = 'home') {
    const items = links;

    return items.map((item, index) => {
      if (item.hasOwnProperty('sublinks')) {
        return (
          <SideNavMenu
            icon={item.icon}
            text={item.text}
            links={item.sublinks}
            isActive={item.active === 'true'}
            key={index}
          />
        );
      }

      return (
        <SideNavLink
          icon={item.icon}
          text={item.text}
          link={item.link}
          isActive={item.active === 'true'}
          key={index}
        />
      );
    });
  },

  render() {
    const { lms_navigation, controller } = this.props;
    const { avatar, subnav } = lms_navigation;
    const theme = lms_navigation.theme || 'default';
    const links = subnav.links || [];

    return (
      <div className={`nav-container ${theme} ${controller}`} id='sidenav'>
        <nav>
          <ul>
            {this.renderAvatar(avatar, controller)}
            {this.renderLinks(links, controller)}
          </ul>
        </nav>
      </div>
    );
  }
});
