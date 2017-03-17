//= require ../base/not-found

const NotFound = React.createClass({
  renderCustomItem() {
    if (this.props.hasOwnProperty('custom_error_data')) {
      return <CustomItem error_data={this.props.custom_error_data} />;
    }
  },

  render() {
    return (
      <div className="error">
        <h2>404</h2>
        <p>Whoops, the page you were looking for could not be found!</p>

        <div className="same-height-grid error-page">
          <div className="flex-item">
            <div className="item-contents">
              <div className="fancy-background" />
              <i className="fa fa-question-circle" />
              <h4>Possible cause of problem</h4>
              <p>This is usually caused when a link has been changed or deleted.</p>
            </div>
          </div>

          {this.renderCustomItem()}

          <div className="flex-item">
            <div className="item-contents">
              <div className="fancy-background" />
              <i className="fa fa-comments" />
              <h4>Contact us</h4>
              <p>If you still have a problem, our support team will be happy to help.</p>
              <a className="btn-u btn-brd btn-u-light" href="https://www.redvector.com/contact-us">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const CustomItem = React.createClass({
  getButtons(error_data) {
    if (error_data.hasOwnProperty('buttons')) {
      return error_data.buttons.map((button, index) => {
        return (
          <a className="btn-u btn-brd btn-u-light" href={button.link} key={index}>{button.text}</a>
        );
      });
    }
  },

  getIcon(error_data) {
    if (error_data.hasOwnProperty('icon')) {
      return <i className={`fa fa-${error_data.icon}`} />;
    }
    return <i className="fa fa-life-saver" />;
  },

  render() {
    const { error_data } = this.props;

    return (
      <div className="flex-item">
        <div className="item-contents">
          <div className="fancy-background" />
          {this.getIcon(error_data)}
          <h4>{error_data.title}</h4>
          <p>{error_data.description}</p>
          {this.getButtons(error_data)}
        </div>
      </div>
    );
  }
});
