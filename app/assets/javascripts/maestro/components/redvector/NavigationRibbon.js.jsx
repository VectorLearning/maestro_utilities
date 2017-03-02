//= require ./NavigationRibbonItem

const NavigationRibbon = React.createClass({
  renderLinks() {
    return this.props.links.map((link, index) => {
      const active = isActive(link.active);
      return (
        <NavigationRibbonItem link={link} key={index} active={active} />
      );
    });
  },

  render() {
    return (
      <div className="container-fluid">
        <div className="rv-ribbon">
          {this.renderLinks()}
        </div>
      </div>
    );
  }
});
