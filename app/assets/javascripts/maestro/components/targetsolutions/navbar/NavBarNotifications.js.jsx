class NavBarNotifications extends React.Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
  }

  componentDidMount () {
    $(this.refs.notificationsUser).popover({
      container: 'body',
      content: function () {
        return '<ul className="list-group"><li class="list-group-item"><a href="#"><span class="titleSingle">You Have No Notifications</span></a></li><li class="list-group-item"><a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro.showNotifications#/1372401/A2A90096CB2D32C08B841029BFA3DA83" title="See All My Notifications"><strong>See My Notifications</strong></a></li></ul>'
      },
      html: true,
      placement: 'bottom',
      title: 'My Notifications',
      trigger: 'focus'
    })
  }

  render () {
    return (
      <ul className={`nav navbar-nav ${this.classes}`} id='navbar-notifications-menu'>
        <li>
          <a id='navbar-notifications-user' href='#' className='navbar-notifications' ref='notificationsUser'>
            <i className='fa fa-user fa-fw fa-lg' />
            <span className='badge'>0</span>
          </a>
        </li>
        <li>
          <a id='navbar-notifications-admin' href='#' className='navbar-notifications '>
            <i className='fa fa-users fa-fw fa-lg' />
            <span className='badge'>0</span>
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
