const NavBarNotifications = React.createClass({
  getInitialState() {
    return {
      userNotificationsHighlighted: true,
      userNotificationData: [{ text: 'Loading...' }],
      userNotificationsCount: 0,
      userPopoverVisible: false,
      adminNotificationsHighlighted: true,
      adminNotificationData: [{ text: 'Loading...' }],
      adminNotificationsCount: 0,
      adminPopoverVisible: false,
    };
  },

  componentWillMount() {
    this.getNotificationData();
  },

  getNotificationData() {
    const thisContext = this;

    if (typeof $ !== 'undefined') {
      $.ajax('http://api.dev/user_notifications', {
        contentType: 'application/json',
        headers: { 'Authorization':`Token token=\"${thisContext.props.token}\", user_id=\"${thisContext.props.user_id}\"`},
        success(data) {
          thisContext.setState({
            userNotificationsCount: data.length,
            userNotificationData: data
          });
        },
        error() {
          console.log('error');
        }
      });

      if (this.props.role === 'admin') {
        $.ajax('http://api.dev/admin_notifications', {
          contentType: 'application/json',
          headers: { 'Authorization':`Token token=\"${thisContext.props.token}\", user_id=\"${thisContext.props.user_id}\"`},
          success(data) {
            thisContext.setState({
              adminNotificationsCount: data.length,
              adminNotificationData: data
            });
          },
          error() {
            console.log('error');
          }
        });
      } 
    }
  },

  handleUserNotificationsClick() {
    this.setState({
      userNotificationsHighlighted: false,
      userPopoverVisible: !this.state.userPopoverVisible,
      adminPopoverVisible: false
    });
  },

  handleAdminNotificationsClick() {
    this.setState({
      adminNotificationsHighlighted: false,
      adminPopoverVisible: !this.state.adminPopoverVisible,
      userPopoverVisible: false
    });
  },

  renderAdminMarkup(urlPrefix, user_id, token) {
    const adminHighlightClass = this.state.adminNotificationsHighlighted ? 'highlight' : '';
    const adminUrl = `${urlPrefix}/index.cfm?fuseaction=c_pro.showNotifications#admin/${user_id}/${token}`;

    if (this.props.role === 'admin') {
      return (
        <li className="pos-rel">
          <a
            id='navbar-notifications-admin'
            href='#' className={`navbar-notifications ${adminHighlightClass}`}
            ref='notificationsAdmin'
            onClick={this.handleAdminNotificationsClick}
          >
            <i className='fa fa-users fa-fw fa-lg' />
            <span className='badge'>
              {this.state.adminNotificationsCount}
            </span>
          </a>
          <Popover
            visible={this.state.adminPopoverVisible} data={this.state.adminNotificationData}
            notificationsUrl={adminUrl}
          />
        </li>
      ); 
    }
  },

  render() {
    const { classes, token, user_id } = this.props;

    const urlPrefix = 'https://app.targetsolutions.com/tsapp/dashboard/pl_fb';
    const userUrl = `${urlPrefix}/index.cfm?fuseaction=c_pro.showNotifications#/${user_id}/${token}`;
    const userHighlightClass = this.state.userNotificationsHighlighted ? 'highlight' : '';

    return (
      <ul className={`nav navbar-nav ${classes}`} id='navbar-notifications-menu'>
        <li className="pos-rel">
          <a
            id='navbar-notifications-user'
            href='#'
            className={`navbar-notifications ${userHighlightClass}`}
            ref='notificationsUser'
            onClick={this.handleUserNotificationsClick}
          >
            <i className='fa fa-user fa-fw fa-lg' />
            <span className='badge'>
              {this.state.userNotificationsCount}
            </span>
          </a>
          <Popover
            visible={this.state.userPopoverVisible}
            data={this.state.userNotificationData}
            notificationsUrl={userUrl}
          />
        </li>
        {this.renderAdminMarkup(urlPrefix, user_id, token)}
      </ul>
    );
  }
});
