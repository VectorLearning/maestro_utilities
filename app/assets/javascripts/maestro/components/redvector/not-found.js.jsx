//= require ../base/not-found

let NotFound = React.createClass({
  render: function(){
    let custom_item;

    if(this.props.hasOwnProperty('custom_error_data')){
      custom_item = <CustomItem error_data={this.props.custom_error_data} />
    }
    return (
      <div className="error">
        <h2>404</h2>
        <p>Whoops, the page you were looking for could not be found!</p>

        <div className="same-height-grid error-page">
          <div className="flex-item">
            <div className="item-contents">
              <div className="fancy-background"></div>
              <i className="fa fa-question-circle"></i>
              <h4>Possible cause of problem</h4>
              <p>This is usually caused when a link has been changed or deleted.</p>
            </div>
          </div>

          {custom_item}

          <div className="flex-item">
            <div className="item-contents">
              <div className="fancy-background"></div>
              <i className="fa fa-comments"></i>
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

let CustomItem = React.createClass({
  render: function(){
    let buttons,
        icon;
    let error_data = this.props.error_data;

    if(error_data.hasOwnProperty('icon')){
      let icon_class = `fa fa-${error_data.icon}`;
      icon = <i className={icon_class}></i>
    } else {
      icon = <i className="fa fa-life-saver"></i>
    }

    if(error_data.hasOwnProperty('buttons')){
      buttons = error_data.buttons.map(function(button, index){
        return(
          <a className="btn-u btn-brd btn-u-light" href={button.link} key={index}>{button.text}</a>
        );
      });
    }

    return (
      <div className="flex-item">
        <div className="item-contents">
          <div className="fancy-background"></div>
          {icon}
          <h4>{error_data.title}</h4>
          <p>{error_data.description}</p>
          {buttons}
        </div>
      </div>
    );
  }
});
