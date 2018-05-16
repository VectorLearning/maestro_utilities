//= require ./NavLinks
//= require ./UserLinks

const RetailNavbar = React.createClass({
  brandingSection() {
    return (
      <div className="rvh clearfix">
        <div className="rvh_container">
          <div className="rvh_left">
            <a className="rvh_logo" href="#">
              <img src="https://redvector.com/assets/brands/redvector/img/RedVector-online-education.svg" alt="RedVector Logo" />
            </a>
          </div>
        </div>
      </div>
    );
  },

  render() {
    return (
      <div className="rvh_wrap">
        <UserLinks {...this.props} />
        {this.brandingSection()}
        <NavLinks {...this.props} />
      </div>
    );
  }
});
