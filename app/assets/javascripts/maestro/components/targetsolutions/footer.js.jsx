//= require ../base/footer

var Footer = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse" id="footer">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><a href="">Copyright &copy; 2016</a></li>
            <li><a href="">Help</a></li>
            <li><a href="">Suggestions</a></li>
            <li><a href="">Blog</a></li>
            <li><a href="">Terms</a></li>
            <li><a href="">Privacy</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href=""><img src="http://app.targetsolutions.com/tsapp/dashboard/pl_fb/library/images/pro/targetsolutions.png" alt="TargetSolutions Logo"/></a></li>
          </ul>
        </div>
      </nav>
    );
  }
});