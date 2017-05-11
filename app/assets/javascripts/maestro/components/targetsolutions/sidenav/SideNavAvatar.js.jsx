const SideNavAvatar = ({avatar = ''}) => {
  return (
    <li>
      <div id='sidenav__avatar'>
        <a href='index.cfm?fuseaction=c_pro.showLogoEditor'>
          <i className='fa fa-gear fa-fw fa-lg'></i>
        </a>
        <img src={avatar} />
      </div>
    </li>
  )
}
