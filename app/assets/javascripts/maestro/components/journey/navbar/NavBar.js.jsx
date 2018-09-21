//= require ./UserDropdown
//= require ./Breadcrumbs
//= require ../common/Link

const NavBar = React.createClass({
  renderLinks() {
    const { lms_navigation } = this.props;
    const { topNav } = lms_navigation.colors;

    return lms_navigation.navbar.links.map((item, index) => {
      return (
        <Link
          colors={topNav}
          key={index}
          item={item}
        />
      );
    });
  },

  render() {
    const { lms_navigation } = this.props;
    const { background } = lms_navigation.colors.topNav;
    const { breadcrumbs: breadcrumbColors } = lms_navigation.colors;
    const { items: breadcrumbs } = lms_navigation.breadcrumbs;

    return (
      <div
        className="journey-header"
        style={{ backgroundColor: background }}
      >
        <UserDropdown {...this.props} />

        <ul className="top-links">
          {this.renderLinks()}
        </ul>

        <Breadcrumbs
          colors={breadcrumbColors}
          breadcrumbs={breadcrumbs}
        />
      </div>
    );
  },

  getDefaultProps() {
    return {
      lms_navigation: {
        colors: {
          breadcrumbs: {},
          logoArea: {},
          sideNav: {},
          topNav: {
            background: 'transparent'
          }
        },
        navbar: {
          links: []
        }
      },
    };
  }
});
