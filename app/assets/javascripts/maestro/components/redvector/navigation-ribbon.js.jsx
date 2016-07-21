let NavigationRibbon = React.createClass({
  render: function(){
    let links = this.props.links.map(function(link, index){
      let active = isActive(link.active);
      return (
        <NavigationRibbonItem link={link} key={index} active={active} />
      );
    });
    return (
      <div className="container-fluid">
        <div className="rv-ribbon">
          {links}
        </div>
      </div>
    );
  }
});

let NavigationRibbonItem = React.createClass({
  linkMarkup: function(){
    return { __html: this.props.link.text };
  },
  render: function(){
    let link = this.props.link;
    let key = this.props.key;
    return (
      <a href={link.link} className={(this.props.active ? "active" : "")} key={this.props.key} dangerouslySetInnerHTML={this.linkMarkup()} />
    );
  }
});
