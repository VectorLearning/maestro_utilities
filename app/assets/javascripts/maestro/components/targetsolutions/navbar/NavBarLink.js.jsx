const NavBarLink = React.createClass({
  render() {
    const { active, link, key, target, text } = this.props;
    if (target != null) {
      button = <a href={link} target={target}>{text}</a>;
    } else {
      button = <a href={link}>{text}</a>;
    }
    return (
      <li
        className={(active ? 'active' : '')}
        key={key}
      >
        {button}
      </li>
    );
  }
});
