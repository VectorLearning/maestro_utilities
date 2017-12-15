//= require ../../base/navbar

const NavBar = React.createClass({
  getInitialState() {
    return { isMobileMenuOpen: false };
  },
  
  componentDidMount() {
    let x = document.getElementsByClassName('nav-bar-disabledLink');
    for (i = 0; i < x.length; i++) {
      x[i].onclick = function() {return false;};
    }
  },

  renderLinks(links) {
    return links.map((link, index) => {
      if (link.hasOwnProperty('sublinks')) {
        return (
          <NavBarDropdown
            classes=""
            text={link.text}
            links={link.sublinks}
            key={index}
          />
        );
      }

      if (link.text == 'Help') {
        return (
          <NavBarLink
            text={link.text}
            link={link.link}
            active={link.active}
            target={'_blank'}
            key={index}
          />
        );
      }
      else {
        return (
          <NavBarLink
            text={link.text}
            link={link.link}
            active={link.active}
            key={index}
          />
        );
      }
    });
  },

  toggleMobileMenu() {
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    });
  },

  render() {
    const {
      first_name,
      last_name,
      lms_navigation,
      organization_name,
      role,
      user_id,
    } = this.props;

    const { api_token } = this.props.additional_data;
    const theme = lms_navigation.theme || 'default';
    const brand = organization_name;
    const name = `${first_name} ${last_name}`;
    const links = lms_navigation.navbar.links;
    const brand_link = lms_navigation.home_url;
    const profile_links = [
      { link: lms_navigation.profile_url, text: 'My Profile' },
      { link: lms_navigation.logout_url, text: 'Log out' }
    ];
    
    console.log(brand_link);

    return (
      <div id='navbar' className={`nav-container ${theme}`}>
        <nav className='navbar navbar-inverse' id='navbar--top'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' href={brand_link}>{brand}</a>
              <button
                type='button'
                className='navbar-toggle collapsed'
                data-target='#navbar-collapse'
                onClick={this.toggleMobileMenu}
              >
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
              </button>
            </div>
            <UserDropdown
              classes='navbar-right'
              text={name}
              links={profile_links}
            />
          </div>
        </nav>
        <nav className={`navbar navbar-default navbar-collapse collapse ${this.state.isMobileMenuOpen ? 'in' : ''}`} id='navbar--bottom'>
          <div className='container-fluid'>
            <ul className={`nav navbar-nav`}>
              {this.renderLinks(links)}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});
