var NavBrand = React.createClass({
  render: function(){
    return (
      <a className="navbar-brand navbar-right" href={this.props.linkTo}>{this.props.text}</a>
    );
  }
});

