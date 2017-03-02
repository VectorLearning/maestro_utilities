//= require ./AccountLinks

const HeaderRetail = React.createClass({
  render() {
    const { logout_url, profile_url, full_name } = this.props;
    
    return (
      <section className="container-fluid rv-header">
        <div className="row top-links">
          <div className="col-xs-12 col-sm-6">
            <img src="https://s3.amazonaws.com/knowledge-assessment-static-assets/redvector_logo.png" alt="" />
          </div>
          <div className="col-xs-12 col-sm-6 text-right">
            <AccountLinks
              logout_url={logout_url}
              profile_url={profile_url}
              full_name={full_name}
            />
          </div>
        </div>
      </section>
    );
  }
});
