const NavBarLink = React.createClass({
  render() {
    const { active, link, key, text } = this.props;
    return (
      <li
        className={(active ? 'active' : '')}
        key={key}
      >
        <a href={link}>
          {text}
        </a>
      </li>
    );
  }
});
