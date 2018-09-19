//= require ../common/Link

const LogoHamburger = React.createClass({
  render() {
    const { lms_navigation } = this.props;
    const { logoArea: colors } = lms_navigation.colors;
    const containerStyle = {
      backgroundColor: colors.background
    };

    return (
      <div
        className="logo-container"
        style={containerStyle}
      >
        <img
          className="logo"
          src={lms_navigation.organization_logo_url}
        />
        <Link
          className="hamburger-button"
          colors={colors}
          href="#"
          onClick={this.props.handleHamburger}
        >
          <i className="fa fa-bars" />
        </Link>
      </div>
    );
  },

  getDefaultProps() {
    return {
      handleHamburger: () => {},
      lms_navigation: {
        organization_logo_url: '',
        colors: {
          background: '#fff',
          link: '#444'
        }
      }
    };
  }
});
