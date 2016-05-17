var NavigationRibbon = React.createClass({
  render: function(){
    var links = this.props.links.map(function(link, index){
      var active = isActive(link.active);
      return (
        <NavigationRibbonItem link={link} key={index} active={active} />
      );
    });
    return (
      <div className="container-fluid">
        <div className="pl-ribbon">
          {links}
        </div>
      </div>
    );
  }
});

var NavigationRibbonItem = React.createClass({
  linkMarkup: function(){
    return { __html: this.props.link.text };
  },
  render: function(){
    var link = this.props.link;
    var key = this.props.key;
    return (
      <a href={link.link} className={(this.props.active ? "active" : "")} key={this.props.key} dangerouslySetInnerHTML={this.linkMarkup()} />
    );
  }
});
