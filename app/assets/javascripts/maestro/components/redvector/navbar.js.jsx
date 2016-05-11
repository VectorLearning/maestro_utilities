//= require ../base/navbar

// create classes
var NavBar = React.createClass({
  render: function(){
    var header,
        navRibbon;
    var logout_url = this.props.additional_data.logout_url;
    var profile_url = this.props.additional_data.profile_url;
    var full_name = this.props.first_name + ' ' + this.props.last_name;
    if(this.props.lms_navigation.organization_logo_url) {
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
      header = <HeaderPrivateLabel full_name={full_name} image_url={image_url} logout_url={logout_url} profile_url={profile_url} />;
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

var HamburgerButton = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  toggleHover: function() {
    this.setState({hover: !this.state.hover});
  },
  render: function(){
    var styles = this.props.styles;
    var linkStyle;
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

var NavMenu = React.createClass({
  render: function(){
    var styles = this.props.styles;
    var links = this.props.links.map(function(link, index){
      if(link.hasOwnProperty('sublinks')) {
        return (
          <NavLinkDropdown links={link.sublinks} text={link.text} active={link.active} styles={styles} key={index} />
        );
      }
      else {
        return (
          <NavLink linkTo={link.link} text={link.text} active={link.active} styles={styles} key={index} />
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

var NavLinkDropdown = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  toggleHover: function() {
    this.setState({hover: !this.state.hover});
  },
  render: function(){
    var styles = this.props.styles;
    var linkStyle;
    if (this.state.hover) {
      linkStyle = styles.linkHover;
    } else {
      linkStyle = styles.linkNormal;
    }
    var active = false;
    var links = this.props.links.map(function(link, index){
      if(link.active){
        active = true;
      }
      return (
        <NavLink linkTo={link.link} text={link.text} active={link.active} styles={styles} key={index} />
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

var NavLink = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  toggleHover: function() {
    this.setState({hover: !this.state.hover});
  },
  render: function(){
    var styles = this.props.styles;
    var linkStyle;
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
