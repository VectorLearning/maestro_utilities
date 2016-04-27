var Styles = React.createClass({
  render: function(){
    let styleCode = ".navbar .nav li.dropdown .dropdown-menu, nav.navbar { background-color: " + this.props.colors.background +"\; color: " + this.props.colors.text +"\; }";
    styleCode += ".navbar .nav a { text-transform: uppercase\ !important; }";
    styleCode += ".navbar .nav a:hover, .navbar .nav a:focus, .navbar .nav li.dropdown .dropdown-menu li.active a { background-color: " + this.props.colors.hover_background +"\!important; color: " + this.props.colors.hover_text +"\!important; }";
    styleCode += ".navbar .nav li { border: 0 !important\; }";
    styleCode += ".navbar .navbar-toggle:hover, .navbar .navbar-toggle:focus { background-color: " + this.props.colors.hover_background + "!important\; }";
    styleCode += ".navbar .navbar-toggle .text, .navbar .navbar-toggle i.fa { color: " + this.props.colors.text + "\; }";
    styleCode += ".navbar .navbar-toggle:hover .text, .navbar .navbar-toggle:focus .text, .navbar .navbar-toggle:hover i.fa, .navbar .navbar-toggle:focus i.fa { color: " + this.props.colors.hover_text + "\; }";
    return(
      <style>{styleCode}</style>
    );
  }
});
