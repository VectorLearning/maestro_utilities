class NavBarNotifications extends React.Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
  }

  render () {
    return (
      <ul className={`nav navbar-nav ${this.classes}`} id='navbar-notifications-menu'>
        <li>
          <a id='navbar-notifications-user' href='#' tabindex='0' className='navbar-notifications'>
            <i className='fa fa-user fa-fw fa-lg' />
            <span className='badge'>0</span>
          </a>
          <div className='hide' id='navbar-notifications-user-popover'>
            <ul className='list-group'>
              <li className='list-group-item'><img src='assets/img/loaders/loading.gif' /></li>
            </ul>
          </div>
        </li>
        <li>
          <a id='navbar-notifications-admin' href='#' tabindex='0' className='navbar-notifications '>
            <i className='fa fa-users fa-fw fa-lg' />
            <span className='badge'>0</span>
          </a>
          <div className='hide' id='navbar-notifications-admin-popover'>
            <ul className='list-group'>
              <li className='list-group-item'><img src='assets/img/loaders/loading.gif' /></li>
            </ul>
          </div>
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
