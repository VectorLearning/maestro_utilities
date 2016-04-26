var HeaderPrivateLabel = React.createClass({
  render: function(){
    return(
      <section className="container-fluid">
        <div className="row top-links">
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
          <div className="col-xs-12">
            <img src={this.props.image_url} />
          </div>
        </div>
      </section>
    );
  }
});
