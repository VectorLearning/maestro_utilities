let HeaderPrivateLabel = React.createClass({
  renderLinks() {
    if (this.props.is_aicc === false) {
      const { logout_url, profile_url, full_name } = this.props;
      
      return (
        <div className="col-xs-12 text-right">
          <AccountLinks
            logout_url={logout_url}
            profile_url={profile_url}
            full_name={full_name}
          />
        </div>
      );
    }
  },

  render() {
    return (
      <section className="container-fluid pl-header">
        <div className="row top-links">
          {this.renderLinks()}
          <div className="col-xs-12">
            <img src={this.props.image_url} alt="" />
          </div>
        </div>
      </section>
    );
  }
});
