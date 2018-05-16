const NavLinks = React.createClass({
  createMarkup(html) {
    return { __html: html };
  },

  nameInitials() {
    const { first_name, last_name } = this.props;

    return `${first_name[0]}${last_name[0]}`;
  },

  subnav() {
    console.log(this.props);
    return this.props.lms_navigation.subnav.links.map((item, index) => {
      return (
        <li className="rvh_list_item" key={index}>
          <a href={item.link}>
            <span dangerouslySetInnerHTML={this.createMarkup(item.text)}></span>
          </a>
        </li>
      );
    });
  },

  render () {
    return (
      <div className="rvh_sub">
        <div className="rvh_container">
          <div className="rvh_page_header rvh_u_hidden_xs">
            <div className="rvh_page_header_avatar">
              <span>{this.nameInitials()}</span>
            </div>
            <a href="https://www.redvector.com/lms.web/dashboard/my-courses.aspx" className="rvh_page_header_title">My Dashboard</a>
          </div>
          <div id="mobile_scroll_list" className="rvh_mobile_scroll_list rvh_mobile_scroll_has_right_arrow">
            <ul className="rvh_sub_list hide-icons">
              {this.subnav()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
