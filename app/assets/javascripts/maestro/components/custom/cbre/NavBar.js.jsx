//= require ../../base/navbar

const DEFAULT_HEADER_WIDTH = 1300;


// create classes
const NavBar = React.createClass({
  getMaxWidth() {
    if (this.props.maxWidth) {
      return this.props.maxWidth;
    }
    return DEFAULT_HEADER_WIDTH;
  },

  renderNavbar() {
    if (this.props.lms_navigation) {
      return (
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse">
            {this.renderNavMenu()}
          </div>
        </div>
      );
    }
  },

  renderNavMenu() {
    const { lms_navigation } = this.props;

    if (lms_navigation.navbar) {
      return <NavMenu links={lms_navigation.navbar.links} />;
    }

    return <NavMenu />;
  },

  render() {
    const maxWidthStyle = {
      maxWidth: this.getMaxWidth(),
      width: 'auto'
    };

    return(
      <div id="cbre-top-navbar" className="cbre-header nav-container">
        <div className="img-container" style={maxWidthStyle}>
          <img src="https://cbre.redvector.com/Resource/Images/banner.gif" />
        </div>
        <nav className="navbar navbar-inverse">
          {this.renderNavbar()}
        </nav>
      </div>
    );
  }
});
