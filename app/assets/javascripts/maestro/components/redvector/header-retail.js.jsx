var HeaderRetail = React.createClass({
  render: function(){
    return(
      <section className="container-fluid rv-header">
        <div className="row top-links">
          <div className="col-xs-12 col-sm-6">
            <img src="https://s3.amazonaws.com/knowledge-assessment-static-assets/redvector_logo.png" />
          </div>
          <div className="col-xs-12 col-sm-6 text-right">
            <ul className="account-links clearfix">
              <li>
                <a href=""><i className="fa fa-sign-out margin-right-5"></i>Sign Out</a>
              </li>
              <li>
                <a href="#" className="color-red"><i className="fa fa-user margin-right-5"></i>{this.props.full_name}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
});
