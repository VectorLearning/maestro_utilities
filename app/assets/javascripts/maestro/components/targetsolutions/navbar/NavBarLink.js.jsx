const NavBarLink = ({text = 'Link', link = '#', isActive = false}) => (
  <li className={(isActive ? 'active' : '')}><a href={link}>{text}</a></li>
)
