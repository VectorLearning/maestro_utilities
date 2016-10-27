//= require ../base/navbar

var NavBar = React.createClass({
  getInitialState: function(){
    return { menuShown: false }
  },
  toggleMenu: function() {
    this.setState({ menuShown: !this.state.menuShown });
  },
  render: function(){
    return(
      <div id="navbar" className="nav-container">
        <nav className="navbar navbar-inverse" id="navbar--top">
          <div className="container-fluid">
            <div className="navbar-header">
              <NavBrand linkTo="#" text={this.props.organization_name} />
              <button type="button" className="navbar-toggle collapsed" onClick={this.toggleMenu}>
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <ul className="nav navbar-nav navbar-right hidden-xs">
              <NavProfile first_name={this.props.first_name} last_name={this.props.last_name} profile_url={this.props.additional_data.profile_url} />
            </ul>
            <div className={`collapse navbar-collapse ${this.state.menuShown ? 'in': ''}`}>
              <NavMenu classes="visible-xs-block" links={this.props.lms_navigation.navbar.links} first_name={this.props.first_name} last_name={this.props.last_name} profile_url={this.props.additional_data.profile_url} />
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-default hidden-xs" id="navbar--bottom">
          <div className="container-fluid">
            <NavMenu classes="" links={this.props.lms_navigation.navbar.links} first_name={this.props.first_name} last_name={this.props.last_name} profile_url={this.props.additional_data.profile_url} />
          </div>
        </nav>
      </div>
    );
  }
});

var NavBrand = React.createClass({
  render: function(){
    return (
      <a className="navbar-brand" href={this.props.linkTo}>{this.props.text}</a>
    );
  }
});

var NavProfile = React.createClass({
  getInitialState: function(){
    return { ddVisible: false }
  },
  toggleDropdown: function() {
    this.setState({ ddVisible: !this.state.ddVisible });
  },
  render: function() {
    return (
      <li className={`dropdown ${this.state.ddVisible ? 'open' : ''}`}>
        <a href="#" className="dropdown-toggle" role="button" aria-haspopup="true" onClick={this.toggleDropdown}>
          {this.props.first_name} {this.props.last_name}
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
          <li><a href={this.props.profile_url}>My Profile</a></li>
          <li><a href="#">Sign Out</a></li>
        </ul>
      </li>
    )
  }
});

var NavMenu = React.createClass({
  render: function(){
    var that = this;
    var links = this.props.links.map(function(link, index){
      if(link.hasOwnProperty('sublinks')) {
        return (
          <NavLinkDropdown links={link.sublinks} text={link.text} active={link.active} key={index} />
        );
      }
      else {
        return (
          <NavLink linkTo={link.link} text={link.text} active={link.active} key={index} />
        );
      }
    });
    var profile = function(classes) {
      if(classes == "visible-xs-block") {
        return (
          <NavProfile first_name={that.props.first_name} last_name={that.props.last_name} profile_url={that.props.profile_url} />
        )
      }
      else {
        return;
      }
    };
    return (
      <ul className={"nav navbar-nav " + this.props.classes}>
        {links}
        {profile(this.props.classes)}
      </ul>
    );
  }
});

var NavLinkDropdown = React.createClass({
  getInitialState: function(){
    return { ddVisible: false }
  },
  toggleDropdown: function() {
    this.setState({ ddVisible: !this.state.ddVisible });
  },
  render: function(){
    var links = this.props.links.map(function(link, index){
      return (
        <NavLink linkTo={link.link} text={link.text} active={link.active} key={index} />
      );
    });
    return (
      <li className={`dropdown ${this.props.active ? 'active' : ''} ${this.state.ddVisible ? 'open' : ''}`}>
        <a href="#" className="dropdown-toggle" role="button" aria-haspopup="true" onClick={this.toggleDropdown}>
          {this.props.text}
          <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
          {links}
        </ul>
      </li>
    );
  }
});

var NavLink = React.createClass({
  render: function(){
    return(
      <li className={(this.props.active ? "active" : "")}><a href={this.props.linkTo}>{this.props.text}</a></li>
    );
  }
});
