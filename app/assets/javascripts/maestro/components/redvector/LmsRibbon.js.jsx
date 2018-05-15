//= require ./LmsRibbonItem

const LmsRibbon = React.createClass({
  renderLinks() {
    return this.props.links.map((link, index) => {
      const active = isActive(link.active);
      return (
        <LmsRibbonItem link={link} key={index} active={active} />
      );
    });
  },

  render() {
    return (
      <div className="rv-ribbon">
        {this.renderLinks()}
      </div>
    );
  }
});
