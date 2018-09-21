//= require ../common/Link

const Breadcrumbs = React.createClass({
  getDefaultProps() {
    return {
      color: '#444',
      backgroundColor: '#fff'
    };
  },

  linkOrText(item) {
    if (item.active) {
      return item.text;
    }

    return (
      <a href={item.link}>
        {item.text}
      </a>
    );
  },

  renderItems() {
    return this.props.breadcrumbs.map((item, index) => {
      return (
        <li key={index}>
          {this.linkOrText(item)}
        </li>
      );
    });
  },

  render() {
    const { background, link } = this.props.colors;

    const containerStyle = {
      color: link,
      backgroundColor: background
    };

    return (
      <div className="breadcrumbs" style={containerStyle}>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
});
