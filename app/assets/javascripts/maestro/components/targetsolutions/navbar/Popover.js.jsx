const Popover = React.createClass({
  renderItems() {
    const { data } = this.props;

    if (!$.trim(data)) {
      return <PopoverItem text="You Have No Notifications" />;
    }

    return data.map((item, index) => {
      return (
        <PopoverItem
          exitLink={item.exit_link}
          icon={item.icon}
          key={index}
          text={item.text}
        />
      );
    });
  },

  render() {
    const { notificationsUrl } = this.props;
    const visibleClass = this.props.visible ? 'in' : '';

    return (
      <div
        className={`popover fade bottom ${visibleClass}`}
        role="tooltip"
        style={{ display: 'block' }}
      >
        <div className="arrow" style={{ left: '50%' }} />
        <h3 className="popover-title">My Notifications</h3>
        <div className="popover-content">
          <ul className="list-group">
            {this.renderItems()}
            <li>
              <a
                href={notificationsUrl}
                title="See All My Notifications"
              >
                <strong>See My Notifications</strong>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
