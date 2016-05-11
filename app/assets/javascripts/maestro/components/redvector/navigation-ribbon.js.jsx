var NavigationRibbon = React.createClass({
  render: function(){
    var links = this.props.links.map(function(link, index){
      return (
        <NavigationRibbonItem link={link} key={index} />
      );
    });
    return (
      <div>
        {links}
      </div>
    );
  }
});

var NavigationRibbonItem = React.createClass({
  iconCssClass: function(){
    return "fa fa-lg " + this.props.link.icon;
  },
  render: function(){
    var link = this.props.link;
    var key = this.props.key;
    return (
      <div key={this.props.key}>
        <a href={link.link} className={link.active ? "active" : ""}>
        <i className={this.iconCssClass()}></i>
        {link.text}
        </a>
      </div>
    );
  }
});
