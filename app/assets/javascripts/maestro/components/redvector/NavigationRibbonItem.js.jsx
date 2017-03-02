const NavigationRibbonItem = React.createClass({
  linkMarkup() {
    return { __html: this.props.link.text };
  },

  render() {
    const { active, link, key } = this.props;

    return (
      <a
        href={link.link}
        className={(active ? 'active' : '')} 
        key={key}
        dangerouslySetInnerHTML={this.linkMarkup()}
      />
    );
  }
});
