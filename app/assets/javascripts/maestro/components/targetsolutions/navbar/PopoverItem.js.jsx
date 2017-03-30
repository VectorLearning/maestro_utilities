const PopoverItem = React.createClass({
  renderIcon() {
    if (this.props.icon) {
      return <span className={`icon-24 ${this.props.icon}`} />;
    }
  },

  render() {
    const { exitLink, text } = this.props;

    return (
      <li className="list-group-item">
        <a href={exitLink || '#'}>
          {this.renderIcon()}
          <span
            className="titleAlt"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </a>
      </li>
    );
  }
});
