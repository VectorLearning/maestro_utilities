//= require ../base/sidenav

var SideNav = React.createClass({
  render: function() {
    var links = this.props.lms_navigation.subnav.links.map(function(link, index){
      return (
        <NavItem text={ link.text } icon={ link.icon } active={link.active} key={index} />
      );
    });

    return (
      <ul className="nav nav-pills nav-stacked" id="sidenav">
        { links }
      </ul>
    );
  }
});

var NavItem = React.createClass({
  render: function() {
    return (
      <li className={(this.props.active ? "active" : "")}><a href=""><i className={"fa fa-" + this.props.icon + " fa-2x"}></i><span>{ this.props.text }</span></a></li>
    );
  }
});
