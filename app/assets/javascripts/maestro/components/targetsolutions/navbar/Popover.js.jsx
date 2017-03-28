const Popover = React.createClass({
  render() {
    const visibleClass = this.props.visible ? 'in' : '';

    return (
      <div
        className={`popover fade bottom ${visibleClass}`}
        role="tooltip"
        style={{ display: 'block' }}
      >
        <div className="arrow" style={{ left: '50%' }} />
        <div className="popover-content">
          {this.props.children}
        </div>
      </div>
    );
  }
});
