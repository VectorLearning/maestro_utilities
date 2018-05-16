//= require ./private_label/PLNavbar
//= require ./retail/RetailNavbar

const NavBar = React.createClass({
  isPrivateLabel() {
    return this.props.lms_navigation.hasOwnProperty('organization_logo_url');
  },

  render(){
    if (this.isPrivateLabel()) {
      return <PLNavbar {...this.props} />
    }
    return <RetailNavbar {...this.props} />
  }
});
