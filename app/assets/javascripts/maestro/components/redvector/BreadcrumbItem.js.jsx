const BreadcrumbItem = React.createClass({
  render() {
    const { active, current, icon, text, link } = this.props.data;
    const activeClass = (active == 'true' ? 'active' : '');
    const currentClass = (current == 'true' ? 'current' : '');
    const target = text === 'Preview Course' ? '_blank' : '_self';

    return (
      <a href={link}
        className={`breadcrumb-item ${activeClass} ${currentClass}`}
        target={target}>
        <i className={`${icon} fa fa-lg mrxs`} />
        <span className="hidden-xs">
          {text}
        </span>
      </a>
    );
  }
});

