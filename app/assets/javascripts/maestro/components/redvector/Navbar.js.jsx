//= require ../base/navbar
//= require ./Breadcrumbs
//= require ./HamburgerButton
//= require ./HeaderPrivateLabel
//= require ./HeaderRetail
//= require ./LmsRibbon
//= require ./NavMenu
//= require ./Tabs

const DEFAULT_HEADER_WIDTH = 1300;

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

  getNavLinks() {
    if (this.props.lms_navigation.navbar.hasOwnProperty('links')) {
      return this.props.lms_navigation.navbar.links;
    }
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

  getMaxWidth() {
    if (this.props.maxWidth) {
      return this.props.maxWidth;
    }
    return DEFAULT_HEADER_WIDTH;
  },

  toggleMenu() {
    this.setState({ menuVisible: !this.state.menuVisible });
  },

  renderBreadcrumbs() {
    if (this.props.lms_navigation.hasOwnProperty('breadcrumbs')) {
      return <Breadcrumbs items={this.props.lms_navigation.breadcrumbs.items} />
    }
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
      return <LmsRibbon links={this.props.lms_navigation.subnav.links} />;
    }
  },

  renderTabs() {
    if (this.props.lms_navigation.hasOwnProperty('tabs')) {
      return <Tabs items={this.props.lms_navigation.tabs.items} />
    }
  },

  render() {
    const { lms_navigation } = this.props;
    const is_pl = lms_navigation.organization_logo_url;

    const maxWidthStyle = {
      maxWidth: this.getMaxWidth(),
      width: 'auto'
    };

    if (lms_navigation.hasOwnProperty('organization_colors')) {
      styles = this.getStyles();
    }

    return (
      <div className={`nav-container ${is_pl ? 'pl-menu' : ''}`}>
          <div className="centered" style={maxWidthStyle}>
            {this.renderHeader()}
          </div>
          <nav
            className={`navbar ${is_pl ? 'pl-navbar' : 'navbar-inverse'}`}
            style={styles.defaultBackground}
          >
            <div className="navbar-header">
              <HamburgerButton styles={styles} toggleMenu={this.toggleMenu} />
              <a className="navbar-brand sr-only" href="/">
                RedVector
              </a>
            </div>
            <div
              style={maxWidthStyle}
              className={`centered collapse navbar-collapse ${this.state.menuVisible ? 'in' : ''}`}
            >
              <NavMenu links={this.getNavLinks()} styles={styles} />
            </div>
          </nav>
          <div className="centered" style={maxWidthStyle}>
            {this.renderNavRibbon()}
            {this.renderTabs()}
            {this.renderBreadcrumbs()}
          </div>
      </div>
    );
  }
});
