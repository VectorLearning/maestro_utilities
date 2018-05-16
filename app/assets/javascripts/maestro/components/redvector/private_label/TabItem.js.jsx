const TabItem = React.createClass({
  render() {
    const { active, icon, text, link } = this.props.data;
    const activeClass = (active == 'true' ? 'active' : '');
    
    return (
      <li className={activeClass}>
        <a href={link}>
          <i className={`${icon} fa fa-lg mrxs`} />
          {text}
        </a>
      </li>
    );
  }
});

