const SideNavLink = ({
  icon = '',
  text = 'Link',
  link = '#',
  isActive = false
}) => (
  <li className={isActive ? 'active' : ''}>
    <a href={link}>
      <i className={`fa ${icon} fa-2x`}></i>
      <span className='text hidden-text' dangerouslySetInnerHTML={{__html: text}} />
    </a>
  </li>
)