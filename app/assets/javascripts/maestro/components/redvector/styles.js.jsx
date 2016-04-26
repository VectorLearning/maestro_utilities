var Styles = React.createClass({
  render: function(){
    let styleCode = ".navbar .nav li.dropdown .dropdown-menu, .navbar-inverse .nav li.dropdown .dropdown-menu, nav.navbar, nav.navbar-inverse { background-color: " + this.props.colors.background +"\; color: " + this.props.colors.text +"\; }";
    styleCode += ".navbar .nav a, .navbar-inverse .nav a { text-transform: uppercase\ !important; }";
    styleCode += ".navbar .nav a:hover, .navbar .nav a:focus, .navbar-inverse .nav a:hover, .navbar-inverse .nav a:focus, .navbar .nav li.dropdown .dropdown-menu li.active a, .navbar-inverse .nav li.dropdown .dropdown-menu li.active a { background-color: " + this.props.colors.hover_background +"\!important; color: " + this.props.colors.hover_text +"\!important; }";
    styleCode += ".navbar .nav li, .navbar-inverse .nav li { border: 0 !important\; }";
    styleCode += ".navbar .navbar-toggle:hover, .navbar .navbar-toggle:focus, .navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus { background-color: " + this.props.colors.hover_background + "!important\; }";
    styleCode += ".navbar .navbar-toggle:hover .text, .navbar .navbar-toggle:focus .text, .navbar-inverse .navbar-toggle:hover .text, .navbar-inverse .navbar-toggle:focus .text { color: " + this.props.colors.hover_text + "\; }";
    return(
      <style>{styleCode}</style>
    );
  }
});
