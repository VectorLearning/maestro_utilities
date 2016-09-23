//= require ../shared/jquery.min
//= require ../shared/bootstrap/collapse
//= require ../shared/bootstrap/dropdown
//= require ../base/navbar

// create classes
let NavBar = React.createClass({
  render: function(){
    let header,
        navRibbon;
    let is_aicc = false;
    let logout_url = this.props.additional_data.logout_url;
    let profile_url = this.props.additional_data.profile_url;
    let full_name = this.props.first_name + ' ' + this.props.last_name;

    if(this.props.additional_data.hasOwnProperty('aicc')) {
      is_aicc = JSON.parse(this.props.additional_data.aicc)
    }
    if(this.props.lms_navigation.organization_logo_url) {
      let is_pl = true;
      colors = this.props.lms_navigation.organization_colors;
      styles = {
        defaultBackground: {
          backgroundColor: colors.background
        },
        linkNormal: {
          backgroundColor: colors.background,
          color: colors.text
        },
        linkHover: {
          backgroundColor: colors.hover_background,
          color: colors.hover_text
        }
      };
      image_url = this.props.lms_navigation.organization_logo_url;
      header = <HeaderPrivateLabel full_name={full_name} image_url={image_url} logout_url={logout_url} profile_url={profile_url} is_aicc={is_aicc} />;
    } else {
      header = <HeaderRetail full_name={full_name} logout_url={logout_url} profile_url={profile_url} />;
    }
    if(this.props.lms_navigation.hasOwnProperty('subnav')) {
      navRibbon = <NavigationRibbon links={this.props.lms_navigation.subnav.links} />;
    };
    return (
      <div className={this.props.lms_navigation.organization_logo_url ? "nav-container pl-menu" : "nav-container"}>
        {header}
        <nav className={this.props.lms_navigation.organization_logo_url ? "navbar pl-navbar" : "navbar navbar-inverse"} style={styles.defaultBackground}>
          <div className="container-fluid">
            <div className="navbar-header">
              <HamburgerButton styles={styles} />
              <NavBrand linkTo="#" text="RedVector" />
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <NavMenu links={this.props.lms_navigation.navbar.links} styles={styles} />
            </div>
          </div>
        </nav>
        {navRibbon}
      </div>
    );
  }
});

let HamburgerButton = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  toggleHover: function() {
    this.setState({hover: !this.state.hover});
  },
  render: function(){
    let styles = this.props.styles;
    let linkStyle;
    if (this.state.hover) {
      linkStyle = styles.linkHover;
    } else {
      linkStyle = styles.linkNormal;
    }
    return (
      <button type="button" style={linkStyle} className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <span className="sr-only">Toggle navigation</span>
        <i className="fa fa-bars"></i>
        <span className="text">Menu</span>
      </button>
    );
  }
});

var NavBrand = React.createClass({
  render: function(){
    return (
      <a className="navbar-brand sr-only" href={this.props.linkTo}>{this.props.text}</a>
    );
  }
});

let NavMenu = React.createClass({
  render: function(){
    let styles = this.props.styles;

    let links = this.props.links.map(function(link, index){
      let active = isActive(link.active);
      if(link.hasOwnProperty('sublinks')) {
        return (
          <NavLinkDropdown links={link.sublinks} text={link.text} active={active} styles={styles} key={index} />
        );
      }
      else {
        return (
          <NavLink linkTo={link.link} text={link.text} active={active} styles={styles} key={index} />
        );
      }
    });
    return (
      <ul className="nav navbar-nav navbar-right">
        {links}
      </ul>
    );
  }
});

let NavLinkDropdown = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  toggleHover: function() {
    this.setState({hover: !this.state.hover});
  },
  render: function(){
    let active = this.props.active;
    let styles = this.props.styles;
    let linkStyle;
    if (this.state.hover) {
      linkStyle = styles.linkHover;
    } else {
      linkStyle = styles.linkNormal;
    }

    let links = this.props.links.map(function(link, index){
      let active = isActive(link.active);
      return (
        <NavLink linkTo={link.link} text={link.text} active={active} styles={styles} key={index} />
      );
    });
    return (
      <li className={"dropdown " + (active ? "active" : "")}>
        <a href="#" style={linkStyle} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
          {this.props.text}
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu" style={styles.defaultBackground}>
          {links}
        </ul>
      </li>
    );
  }
});

let NavLink = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  toggleHover: function() {
    this.setState({hover: !this.state.hover});
  },
  render: function(){
    let styles = this.props.styles;
    let linkStyle;
    if (this.state.hover) {
      linkStyle = styles.linkHover;
    } else {
      linkStyle = styles.linkNormal;
    }
    return(
      <li className={(this.props.active ? "active" : "")} key={this.props.key}>
        <a style={linkStyle} href={this.props.linkTo} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>{this.props.text}</a>
      </li>
    );
  }
});
