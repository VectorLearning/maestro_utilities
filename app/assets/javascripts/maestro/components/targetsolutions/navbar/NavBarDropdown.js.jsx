class NavBarDropdown extends React.Component {
  constructor (props) {
    super(props)
    
    // props
    this.classes = props.classes
    this.text = props.text
    this.links = props.links
    this.isActive = !!props.active

    // methods
    this.toggleDropdown = this.toggleDropdown.bind(this)

    // state
    this.state = {
      isOpen: false
    }
  }

  toggleDropdown () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <ul className={`nav navbar-nav ${this.classes}`}>
        <li className={`dropdown ${this.isActive ? 'active' : ''} ${this.state.isOpen ? 'open' : ''}`}>
          <a href='#' className='dropdown-toggle' onClick={this.toggleDropdown}>
            {this.text}
            <span className='caret'></span>
          </a>
          <ul className="dropdown-menu">
            {this.links.map((link, index) => (
              <NavBarLink text={link.text} link={link.link} active={link.active} key={index} />))}
          </ul>
        </li>
      </ul>
    )
  }
}

NavBarDropdown.propTypes = {
  classes: React.PropTypes.string,
  text: React.PropTypes.string,
  links: React.PropTypes.array,
  isActive: React.PropTypes.bool
}

NavBarDropdown.defaultProps = {
  classes: '',
  text: 'Dropdown',
  links: [],
  isActive: false
}