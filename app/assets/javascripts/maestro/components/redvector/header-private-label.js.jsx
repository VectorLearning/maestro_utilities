var HeaderPrivateLabel = React.createClass({
  render: function(){
    return(
      <section className="container-fluid pl-header">
        <div className="row top-links">
          <div className="col-xs-12 text-right">
            <ul className="account-links clearfix">
              <li>
                <a href={this.props.logout_url}><i className="fa fa-sign-out margin-right-5"></i>Sign Out</a>
              </li>
              <li>
                <a href={this.props.profile_url}><i className="fa fa-user margin-right-5"></i>{this.props.full_name}</a>
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
