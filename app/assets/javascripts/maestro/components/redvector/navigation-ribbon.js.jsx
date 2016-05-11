var NavigationRibbon = React.createClass({
  render: function(){
    var links = this.props.links.map(function(link, index){
      return (
        <NavigationRibbonItem link={link} key={index} />
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
      <a href={link.link} className={link.active ? "active" : ""} key={this.props.key} dangerouslySetInnerHTML={this.linkMarkup()} />
    );
  }
});
