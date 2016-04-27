//= require ../base/navbar

// create classes
var NavBar = React.createClass({
  render: function(){
    var full_name = this.props.first_name + ' ' + this.props.last_name;
    if(this.props.lms_navigation.organization_logo_url) {
      var organization_colors = this.props.lms_navigation.organization_colors;
      var navStyle = { backgroundColor: this.props.lms_navigation.organization_colors.background };
      image_url = this.props.lms_navigation.organization_logo_url;
      header = <HeaderPrivateLabel full_name={full_name} image_url={image_url} />;
      styles = <Styles colors={organization_colors} />
    } else {
      header = <HeaderRetail full_name={full_name} />;
      styles = "";
    }
    return (
      <div>
        {header}
        {styles}
        <nav className={this.props.lms_navigation.organization_logo_url ? "navbar pl-navbar" : "navbar navbar-inverse"}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <i className="fa fa-bars"></i>
                <span className="text">Menu</span>
              </button>
              <NavBrand linkTo="#" text="RedVector" />
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <NavMenu links={this.props.lms_navigation.navbar.links} />
            </div>
          </div>
        </nav>
      </div>
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
    var links = this.props.links.map(function(link){
      if(link.hasOwnProperty('sublinks')) {
        return (
          <NavLinkDropdown links={link.sublinks} text={link.text} active={link.active} />
        );
      }
      else {
        return (
          <NavLink linkTo={link.link} text={link.text} active={link.active} />
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
  render: function(){
    var active = false;
    var links = this.props.links.map(function(link){
      if(link.active){
        active = true;
      }
      return (
        <NavLink linkTo={link.link} text={link.text} active={link.active} />
      );
    });
    return (
      <li className={"dropdown " + (active ? "active" : "")}>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
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
