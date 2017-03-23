class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.theme = props.theme
    this.brand = props.brand
    this.name = props.name
    this.links = props.links

    // methods
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
    
    // state
    this.state = {
      isMobileMenuOpen: false
    }
  }

  toggleMobileMenu () {
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    })
  }

  render () {
    return (
      <div id='navbar' className={`nav-container ${this.theme}`}>
        <nav className='navbar navbar-inverse' id='navbar--top'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href='#'>{this.brand}</a>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar-collapse' onClick={this.toggleMobileMenu}>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
            </div>
            <NavBarDropdown
              classes='navbar-right hidden-xs'
              text={this.name}
              links={[
                {link: '#', text: 'My Profile'},
                {link: '#', text: 'Log out'}
              ]} />
            <NavBarNotifications
              classes='navbar-right' />
            <div className={`collapse navbar-collapse ${this.state.isMobileMenuOpen ? 'in' : ''}`} id='navbar-collapse'>
              <NavBarDropdown
                classes='visible-xs'
                text={this.name}
                links={this.links} />
            </div>
          </div>
        </nav>
        <nav className='navbar navbar-default hidden-xs' id='navbar--bottom'>
          <div className='container-fluid'>
            <ul className={`nav navbar-nav`}>
              {this.links.map((link, index) => (
                link.hasOwnProperty('sublinks')
                  ? <NavBarDropdown
                      text={link.text}
                      links={link.sublinks}
                      isActive={link.active === 'true'}
                      key={index} />
                  : <NavBarLink
                      text={link.text}
                      link={link.link}
                      isActive={link.active === 'true'}
                      key={index} />
              ))}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

NavBar.propTypes = {
  theme: React.PropTypes.string,
  brand: React.PropTypes.string,
  name: React.PropTypes.string,
  links: React.PropTypes.array
}

NavBar.defaultProps = {
  theme: 'default',
  brand: 'TargetSolutions',
  name: 'Menu',
  links: []
}
