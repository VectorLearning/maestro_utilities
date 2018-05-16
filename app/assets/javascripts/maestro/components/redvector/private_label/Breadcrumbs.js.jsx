//= require ./BreadcrumbItem

const Breadcrumbs = React.createClass({
  renderItems() {
    return this.props.items.map((item) => {
      return <BreadcrumbItem data={item} key={item.text} />;
    });
  },

  render() {
    const { items } = this.props;

    return (
      <div className="breadcrumbs">
        {this.renderItems()}
      </div>
    );
  }
});

