const AccountLinks = React.createClass({
  render() {
    const { logout_url, profile_url, full_name } = this.props;

    return (
      <ul className="account-links clearfix">
        <li>
          <a href={logout_url}>
            <i className="fa fa-sign-out margin-right-5" />
            Sign Out
          </a>
        </li>
        <li>
          <a href={profile_url} className="color-red">
            <i className="fa fa-user margin-right-5" />
            {full_name}
          </a>
        </li>
      </ul>
    );
  }
});
