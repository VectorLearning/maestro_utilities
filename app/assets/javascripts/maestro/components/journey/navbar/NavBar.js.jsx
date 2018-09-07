//= require ./UserDropdown
//= require ../common/Link

const NavBar = React.createClass({
  renderLinks() {
    const { lms_navigation } = this.props;
    const { topNav } = lms_navigation.colors;

    return lms_navigation.navbar.links.map((item, index) => {
      return(
        <Link
          colors={topNav}
          key={index}
          item={item}
        />
      );
    });
  },

  render() {
    console.log(this.props);
    const { lms_navigation } = this.props;
    const { background } = lms_navigation.colors.topNav;

    return (
      <div
        className="journey-header"
        style={{ backgroundColor: background }}
      >
        <UserDropdown {...this.props} />
        <ul className="top-links">
          {this.renderLinks()}
        </ul>
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
