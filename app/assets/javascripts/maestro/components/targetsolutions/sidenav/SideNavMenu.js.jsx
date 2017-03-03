class SideNavMenu extends React.Component {
  constructor (props) {
    super(props)
    
    // props
    this.icon = props.icon
    this.text = props.text
    this.links = props.links
    this.isActive = props.isActive
    
    // methods
    this.toggleCollapse = this.toggleCollapse.bind(this)
    
    // state
    this.state = {
      isOpen: props.isActive
    }
  }

  toggleCollapse () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <li className={`collapsible ${this.isActive ? 'active' : ''}`}>
        <a href='#' onClick={this.toggleCollapse}>
          <i className={`fa ${this.icon} fa-2x`}></i>
          <span className='text hidden-text'>{this.text}</span>
          <i className='fa fa-chevron-down fa-fw hidden-text'></i>
        </a>
        <ul className={`collapse ${this.state.isOpen ? 'in' : ''}`}>
          {this.links.map((link, index) => (
            <SideNavLink icon={link.icon} text={link.text} link={link.link} isActive={link.active === 'true'} key={index} />
          ))}
        </ul>
      </li>
    )
  }
}