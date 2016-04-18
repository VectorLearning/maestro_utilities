//= require ../base/navbar

// create classes
var NavBar = React.createClass({
  render: function(){
    return(
      <div>
        <div id="centrelearn-top-navbar">
          <div id="centrelearn-top-navbar-white">
            <img src="https://s3.amazonaws.com/knowledge-assessment-static-assets/centerLearn_logo.jpg" />
          </div>
          <div id="centrelearn-top-navbar-blue">
            Training just got easier.
            <a href="#" className="btn btn-default">Logout</a>
          </div>
        </div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
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
      <a className="navbar-brand navbar-right" href={this.props.linkTo}>{this.props.text}</a>
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
      <ul className="nav navbar-nav">
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
