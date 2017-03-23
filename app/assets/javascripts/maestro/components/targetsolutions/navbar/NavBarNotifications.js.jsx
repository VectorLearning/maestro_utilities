class NavBarNotifications extends React.Component {
  constructor (props) {
    super(props)
    this.classes = props.classes

    this.handleUserNotificationsClick = this.handleUserNotificationsClick.bind(this)
    this.handleAdminNotificationsClick = this.handleAdminNotificationsClick.bind(this)

    this.state = {
      userNotificationsHighlighted: true,
      userNotificationsCount: 0,
      adminNotificationsHighlighted: true,
      adminNotificationsCount: 0
    }
  }

  handleUserNotificationsClick() {
    this.setState({
      userNotificationsHighlighted: false
    })
  }

  handleAdminNotificationsClick() {
    this.setState({
      adminNotificationsHighlighted: false
    })
  }

  componentDidMount () {
    that = this
    $.ajax('http://tsapi.services.dev/user_notifications', {
      contentType: 'application/json',
      headers: { 'Authorization':`Token token=\"${that.props.token}\", user_id=\"${that.props.user_id}\"`},
      success: function (data) {
        //that.setState({adminNotificationsCount: data.length})

        $(that.refs.notificationsUser).popover({
          container: 'body',
          content: () => that.notificationsContent(data),
          html: true,
          placement: 'bottom',
          title: 'My Notifications',
          trigger: 'focus'
        })
      },
      error: function () {
        console.log('error')
      }
    })

    $.ajax('http://tsapi.services.dev/user_notifications', {
      contentType: 'application/json',
      headers: { 'Authorization':`Token token=\"${that.props.token}\", user_id=\"${that.props.user_id}\"`},
      success: function (data) {
        //that.setState({adminNotificationsCount: data.length})

        $(that.refs.notificationsAdmin).popover({
          container: 'body',
          content: () => that.notificationsContent(data),
          html: true,
          placement: 'bottom',
          title: 'My Notifications',
          trigger: 'focus'
        })
      },
      error: function () {
        console.log('error')
      }
    })
  }

  notificationsContent (data) {
    content = '<ul className="list-group">'

    if (!$.trim(data)) {
      content += '<li class="list-group-item"><a href="#"><span class="titleSingle">You Have No Notifications</span></a></li><li class="list-group-item">'
    } else {
      data.map(function(notification) { 
        content += '<li class="list-group-item"><a href="'+ notification.exit_link +'"><span class="titleSingle">'+ notification.text +'</span></a></li><li class="list-group-item">'
      })
    }

    return content += `<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro.showNotifications#/1372401/A2A90096CB2D32C08B841029BFA3DA83" title="See All My Notifications">
                         <strong>See My Notifications</strong>
                       </a></li></ul>`
  }

  render () {
    return (
      <ul className={`nav navbar-nav ${this.classes}`} id='navbar-notifications-menu'>
        <li>
          <a id='navbar-notifications-user' href='#' className={`navbar-notifications ${this.state.userNotificationsHighlighted ? 'highlight' : ''}`} ref='notificationsUser' onClick={this.handleUserNotificationsClick}>
            <i className='fa fa-user fa-fw fa-lg' />
            <span className='badge'>{this.state.userNotificationsCount}</span>
          </a>
        </li>
        <li>
          <a id='navbar-notifications-admin' href='#' className={`navbar-notifications ${this.state.adminNotificationsHighlighted ? 'highlight' : ''}`} ref='notificationsAdmin' onClick={this.handleAdminNotificationsClick}>
            <i className='fa fa-users fa-fw fa-lg' />
            <span className='badge'>{this.state.adminNotificationsCount}</span>
          </a>
        </li>
      </ul>
    )
  }
}

NavBarNotifications.propTypes = {
  classes: React.PropTypes.string
}

NavBarNotifications.defaultProps = {
  classes: ''
}
