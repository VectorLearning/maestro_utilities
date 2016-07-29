//= require ../base/sidenav

var SideNav = React.createClass({
  render: function() {
    var links = [
      {name: "Home", icon: "home", active: true},
      {name: "Home", icon: "home"},
      {name: "Home", icon: "home"}
    ];
    var navItems = links.map(function(link){
      return <NavItem name={ link.name } icon={ link.icon } active={link.active} />
    });
    return (
      <ul className="nav nav-pills nav-stacked" id="sidenav">
        { navItems }
      </ul>
    );
  }
});

var NavItem = React.createClass({
  render: function() {
    return (
      <li className={(this.props.active ? "active" : "")}><a href=""><i className={"fa fa-" + this.props.icon + " fa-2x"}></i><span>{ this.props.name }</span></a></li>
    );
  }
});