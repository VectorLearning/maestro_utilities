//= require ../common/Link

const WelcomeSection = React.createClass({
  render() {
    const { additional_data, first_name, lms_navigation } = this.props;
    const { userLinks: colors } = lms_navigation.colors.sideNav;
    const { logout_url, messages_url, profile_url } = additional_data;
    const { avatar } = lms_navigation;

    const containerStyle = {
      color: colors.link
    };

    return (
      <div style={containerStyle} className="row">
        <div className="col-xs-12">
          <div className="col-xs-4">
            <a href={profile_url}>
              <img className="avatar" src={avatar} />
            </a>
          </div>
          <div className="col-xs-8 user-links">
            <div className="welcome-text">
              Welcome
              <strong>{` ${first_name}`}</strong>
              !
            </div>
            <Link colors={colors} href={messages_url}>
              <i className="fa fa-envelope-o pulse" />
              Messages
            </Link>
            <Link colors={colors} href={logout_url}>
              <i className="fa fa-power-off text-red-1" />
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
});
