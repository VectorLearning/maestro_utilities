//= require ../base/navbar

// create classes
var NavBar = React.createClass({
  render: function(){
    return(
      <div>
        <NavTopLinks />
        <nav className="navbar navbar-inverse">
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

var NavTopLinks = React.createClass({
  render: function(){
    return(
      <section className="container-fluid rv-header">
        <div className="row top-links">
          <div className="col-xs-12 col-sm-6">
            <img src="/assets/maestro/redvector_logo.png" />
          </div>
          <div className="col-xs-12 col-sm-6 text-right">
            <ul className="account-links clearfix">
              <li>
                <a href=""><i className="fa fa-sign-out margin-right-5"></i>Sign Out</a>
              </li>
              <li>
                <a href="#"><i className="fa fa-user margin-right-5"></i>User Name</a>
              </li>
            </ul>
            <ul className="contact-links clearfix">
              <li>
                <a href="tel:1-866-546-1212">
                    <i className="fa fa-phone fa-lg margin-right-5"></i>1-866-546-1212
                </a>
              </li>
              <li>
                <a href="#"><i className="fa fa-comments fa-lg margin-right-5"></i>Start Live Chat</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
});
