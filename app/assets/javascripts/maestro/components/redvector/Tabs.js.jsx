//= require ./TabItem 
const Tabs = React.createClass({
  renderTabs() {
    return this.props.items.map((item) => {
      return <TabItem data={item} key={item.text} />;
    });
  },

  render() {
    const { items } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <ul className="nav nav-pills nav-justified lg-tabs with-triangles">
              {this.renderTabs()}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="top-bar" />
          </div>
        </div>      
      </div>
    );
  }
});

