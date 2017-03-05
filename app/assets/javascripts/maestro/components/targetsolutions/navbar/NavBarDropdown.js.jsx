class NavBarDropdown extends React.Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.text = props.text
    this.links = props.links
    this.isActive = props.isActive
  }

  componentDidMount () {
    $(this.refs.dropdown).dropdown()
  }

  render () {
    return (
      <ul className={`nav navbar-nav ${this.classes}`}>
        <li className={`dropdown ${this.isActive ? 'active' : ''}`}>
          <a href='#' className='dropdown-toggle' ref='dropdown' data-toggle='dropdown'>
            {this.text}
            <span className='caret'></span>
          </a>
          <ul className="dropdown-menu">
            {this.links.map((link, index) => (
              <NavBarLink
                text={link.text}
                link={link.link}
                isActive={link.active === 'true'}
                key={index} />))}
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