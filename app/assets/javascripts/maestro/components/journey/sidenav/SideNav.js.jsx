//= require ./LogoHamburger
//= require ./SideNavLink
//= require ./WelcomeSection

const SideNav = React.createClass({
  getInitialState() {
    return {
      collapsed: false
    };
  },

  handleHamburger() {
    this.toggleCollapsed();
  },

  renderLinks() {
    const { lms_navigation } = this.props;
    const { links } = lms_navigation.subnav;
    const { sideNav } = lms_navigation.colors;

    return links.map((item, index) => {
      return <SideNavLink colors={sideNav} link={item} key={index} />;
    });
  },

  renderOptionalLogo() {
    const { optional_secondary_logo_url } = this.props.lms_navigation;

    if (optional_secondary_logo_url) {
      return (
        <img
          className="secondary-logo"
          src={optional_secondary_logo_url}
        />
      );
    }
  },

  render() {
    const collapsedClass = this.state.collapsed ? 'collapsed' : '';
    const { lms_navigation } = this.props;

    const containerStyle = {
      backgroundColor: lms_navigation.colors.sideNav.background
    };

    if (lms_navigation.subnav.links) {
      return (
        <div
          className={`journey-sidebar ${collapsedClass}`}
          style={containerStyle}
        >
          <LogoHamburger
            handleHamburger={this.handleHamburger}
            lms_navigation={lms_navigation}
          />
          <div>
            {this.renderOptionalLogo()}

            <WelcomeSection {...this.props} />

            <hr className="hr" />

            <div className="sidenav-links">
              {this.renderLinks()}
            </div>
          </div>
        </div>
      );
    }
  },

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed });
  },

  getDefaultProps() {
    return {
      lms_navigation: {
        colors: {
          logoArea: {},
          sideNav: {
            background: '#fff'
          }
        },
        subnav: {}
      }
    };
  }
});
