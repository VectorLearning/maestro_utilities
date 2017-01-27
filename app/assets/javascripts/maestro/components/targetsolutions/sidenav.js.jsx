let SideNav = React.createClass({
  render: function() {
    let themeClass = 'default';

    if (this.props.lms_navigation.theme) {
      themeClass = this.props.lms_navigation.theme;
    }

    let links = this.props.lms_navigation.subnav.links.map(function(item, index){
      return (
        <NavItem key={index} item={item} />
      );
    });

    return (
      <div className={`nav-container ${themeClass}`} id="sidenav">
        <nav role="navigation">
          <ul>
            { links }
          </ul>
        </nav>
    </div>
    );
  }
})

let NavItem = React.createClass({
  getInitialState: function(){
    return {expanded: this.hasChildren() && this.isActive()}
  },
  hasChildren: function(){
    return this.props.item.hasOwnProperty('sublinks')
  },
  isActive: function(){
    return this.props.item.active == 'true'
  },
  toggleCollapse: function(){
    this.setState({expanded: !this.state.expanded});
  },
  render: function() {
    let chevron
    let subItems
    let item = this.props.item

    let activeClass = (this.isActive() ? "active" : "")
    let collapseClass = (this.state.expanded ? "in" : "")
    let collapsibleClass = (this.hasChildren() ? "collapsible" : "")

    if (this.hasChildren()) {
      subItems = <NavSubItemList links={item.sublinks} collapseClass={collapseClass} />
      chevron = <i className="fa fa-chevron-down fa-fw hidden-text"></i>
    }
    return (
      <li className={`${activeClass} ${collapsibleClass}`}>
        <a href="#" onClick={this.toggleCollapse}>
          <i className={`fa ${item.icon} fa-2x`}></i>
          <span className="text hidden-text">{item.text}</span>
          {chevron}
        </a>
        {subItems}
      </li>
    )
  }
})

let NavSubItemList = React.createClass({
  render: function(){
    let links = this.props.links.map(function(link, index){
      return (
        <NavSubItem key={index} link={link} />
      )
    })
    return (
      <ul className={`collapse ${this.props.collapseClass}`}>
        {links}
      </ul>
    )
  }
})

let NavSubItem = React.createClass({
  render: function() {
    return (
      <li className={`${(this.props.link.active == 'true') ? "active" : ""}`}>
        <a href={this.props.link.link}>
          <span className="text  text">{this.props.link.text}</span>
        </a>
      </li>
    )
  }
})
