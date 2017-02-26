const SideNav = ({theme = 'default', links = [], controller = 'home'}) => (
  <div className={`nav-container ${theme}`} id='sidenav'>
    <nav role='navigation'>
      <ul>
        {links[controller].map((item, index) => {
          return item.hasOwnProperty('sublinks')
            ? <SideNavMenu icon={item.icon} text={item.text} links={item.sublinks} isActive={item.active === 'true'} key={index} />
            : <SideNavLink icon={item.icon} text={item.text} link={item.link} isActive={item.active === 'true'} key={index} />
        })}
      </ul>
    </nav>
  </div>
)
