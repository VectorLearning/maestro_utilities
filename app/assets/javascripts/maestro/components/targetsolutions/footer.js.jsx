var Footer = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse" id="footer">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><a href="http://www.targetsolutions.com/">Copyright &copy; 2016</a></li>
            <li><a href="http://help.targetsolutions.com/">Help</a></li>
            <li><a href="http://app.targetsafety.com/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_communications.showSuggestions">Suggestions</a></li>
            <li><a href="http://www.targetsolutions.com/blogs/company-blog">Blog</a></li>
            <li><a href="http://app.targetsafety.com/media/documents/termsofuse.pdf">Terms</a></li>
            <li><a href="http://www.targetsolutions.com/privacy-policy">Privacy</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="http://www.targetsolutions.com/" target="_blank"><img src="https://s3.amazonaws.com/assets.targetsolutions.com/targetsolutions.png" alt="TargetSolutions Logo"/></a></li>
          </ul>
        </div>
      </nav>
    );
  }
});
