const NavBarNotifications = React.createClass({
  getInitialState() {
    return {
      userNotificationsHighlighted: true,
      userPopoverVisible: false,
      adminNotificationsHighlighted: true,
      adminPopoverVisible: false,
    };
  },

  componentDidMount() {
    // Maybe not depend on jQuery so fucking much?
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', 'myservice/username?id=some-unique-id');
    // xhr.onload = function() {
    //     if (xhr.status === 200) {
    //         alert('User\'s name is ' + xhr.responseText);
    //     }
    //     else {
    //         alert('Request failed.  Returned status of ' + xhr.status);
    //     }
    // };
    // xhr.send();

    that = this
    // TODO: Update this with notifications endpoint
    if (typeof $ !== 'undefined') {
      $.ajax('/home', {
        success () {
          $(that.refs.notificationsUser).popover({
            container: 'body',
            content: () => '<ul className="list-group"><li class="list-group-item"><a href="#"><span class="titleSingle">You Have No Notifications</span></a></li><li class="list-group-item"><a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro.showNotifications#/1372401/A2A90096CB2D32C08B841029BFA3DA83" title="See All My Notifications"><strong>See My Notifications</strong></a></li></ul>',
            html: true,
            placement: 'bottom',
            title: 'My Notifications',
            trigger: 'focus'
          });
        },
        error () {
          console.log('error');
        }
      });

      // TODO: Update this with notifications endpoint
      $.ajax('/home', {
        success() {
          $(that.refs.notificationsAdmin).popover({
            container: 'body',
            content: () => '<ul className="list-group"><li class="list-group-item"><a href="#"><span class="titleSingle">You Have No Notifications</span></a></li><li class="list-group-item"><a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro.showNotifications#/1372401/A2A90096CB2D32C08B841029BFA3DA83" title="See All My Notifications"><strong>See My Notifications</strong></a></li></ul>',
            html: true,
            placement: 'bottom',
            title: 'My Notifications',
            trigger: 'focus'
          });
        },
        error() {
          console.log('error');
        }
      });
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

  renderAdminNotifications() {
    // do ajax stuffs, and then:
    return (
      'yo'
    );
  },

  renderUserNotifications() {
    // do ajax stuffs, and then:
    return (
      'yo'
    );
  },

  render() {
    const { classes } = this.props;
    const adminHighlightClass = this.state.adminNotificationsHighlighted ? 'highlight' : '';
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
            <span className='badge'>0</span>
          </a>
          <Popover visible={this.state.userPopoverVisible}>
            {this.renderUserNotifications()}
          </Popover>
        </li>
        <li className="pos-rel">
          <a
            id='navbar-notifications-admin'
            href='#' className={`navbar-notifications ${adminHighlightClass}`}
            ref='notificationsAdmin'
            onClick={this.handleAdminNotificationsClick}
          >
            <i className='fa fa-users fa-fw fa-lg' />
            <span className='badge'>0</span>
          </a>
          <Popover visible={this.state.adminPopoverVisible}>
            {this.renderAdminNotifications()}
          </Popover>
        </li>
      </ul>
    );
  }
});
