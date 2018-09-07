//= require ../common/Link

const UserDropdown = React.createClass({
  getDefaultProps() {
    return {
      lms_navigation: {
        avatar: 'https://vectorsolutionsuniversity.vectorsolutions.com/ets/images/ui/default/toolbar/noprofile.png',
        colors: {
          topNav: {
            userLinks: {
              background: '#fff',
              link: '#444',
              linkBackgroundHover: '#ddd'
            }
          }
        }
      }
    };
  },

  getInitialState() {
    return {
      expanded: false
    };
  },

  renderLinks() {
    const { userLinks } = this.props.lms_navigation.colors.topNav;
    const expandedClass = this.state.expanded ? '' : 'hidden';
    const { logout_url, profile_url } = this.props.additional_data
    const { background } = userLinks;

    return (
      <div className={`dropdown-actions-container ${expandedClass}`}>
        <div className="arrow-up" style={{ borderBottom: `5px solid ${background}` }} />
        <ul className="dropdown-actions" style={{ backgroundColor: background }}>
          <li>
            <Link
              item={{ text: 'My Profile', link: profile_url }}
              colors={userLinks}
            />
          </li>
          <li>
            <Link
              item={{ text: 'Logout', link: logout_url, icon: 'icon-logout-1' }}
              colors={userLinks}
            />
          </li>
        </ul>
      </div>
    );
  },

  toggleDropdown() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  },

  render() {
    const { first_name, last_name, lms_navigation } = this.props;
    const { avatar, colors } = lms_navigation;
    const { topNav } = colors;

    return (
      <div className="user-dropdown">
        <Link
          colors={topNav}
          href="#"
          onClick={this.toggleDropdown}
        >
          <img src={avatar} />
          <span className="name">
            <span className="first">
              {first_name}
            </span>
            &nbsp;
            <span className="last">
              {last_name}
            </span>
            <i className="fa fa-caret-down" />
          </span>
        </Link>

        {this.renderLinks()}
      </div>
    );
  }
});
