//= require ../base/navbar
//= require ./HamburgerButton
//= require ./HeaderPrivateLabel
//= require ./HeaderRetail
//= require ./NavigationRibbon
//= require ./NavMenu

let colors = {
  background: '',
  text: '',
  hover_background: '',
  hover_text: ''
};

let styles = {
  defaultBackground: {},
  linkNormal: {},
  linkHover: {}
};

const NavBar = React.createClass({
  getInitialState() {
    return { menuVisible: false };
  },

  getStyles() {
    colors = this.props.lms_navigation.organization_colors;

    return {
      defaultBackground: {
        backgroundColor: colors.background
      },
      linkNormal: {
        backgroundColor: colors.background,
        color: colors.text
      },
      linkHover: {
        backgroundColor: colors.hover_background,
        color: colors.hover_text
      }
    };
  },

  isAicc() {
    if (this.props.additional_data.hasOwnProperty('aicc')) {
      return JSON.parse(this.props.additional_data.aicc);
    }
    return false;
  },

  toggleMenu() {
    this.setState({ menuVisible: !this.state.menuVisible });
  },

  renderHeader() {
    const { lms_navigation } = this.props;
    const { logout_url, profile_url } = this.props.additional_data;
    const full_name = `${this.props.first_name} ${this.props.last_name}`;

    if (lms_navigation.organization_logo_url) {
      return (
        <HeaderPrivateLabel
          full_name={full_name}
          image_url={lms_navigation.organization_logo_url}
          logout_url={logout_url}
          profile_url={profile_url}
          is_aicc={this.isAicc()}
        />
      );
    }
    return (
      <HeaderRetail
        full_name={full_name}
        logout_url={logout_url}
        profile_url={profile_url}
      />
    );
  },

  renderNavRibbon() {
    if (this.props.lms_navigation.hasOwnProperty('subnav')) {
      return <NavigationRibbon links={this.props.lms_navigation.subnav.links} />;
    }
  },

  render() {
    const { lms_navigation } = this.props;
    const is_pl = lms_navigation.organization_logo_url;

    if (lms_navigation.hasOwnProperty('organization_colors')) {
      styles = this.getStyles();
    }

    return (
      <div className={is_pl ? 'nav-container pl-menu' : 'nav-container'}>
        {this.renderHeader()}
        <nav
          className={is_pl ? 'navbar pl-navbar' : 'navbar navbar-inverse'}
          style={styles.defaultBackground}
        >
          <div className="container-fluid">
            <div className="navbar-header">
              <HamburgerButton styles={styles} toggleMenu={this.toggleMenu} />
              <a className="navbar-brand sr-only" href="/">
                RedVector
              </a>
            </div>
            <div className={`collapse navbar-collapse ${this.state.menuVisible ? 'in' : ''}`}>
              <NavMenu links={lms_navigation.navbar.links} styles={styles} />
            </div>
          </div>
        </nav>
        {this.renderNavRibbon()}
      </div>
    );
  }
});
