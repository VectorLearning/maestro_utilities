const UserLinks = React.createClass({
  render () {
    const listItems = 'yoyoyo';
    const { first_name, last_name } = this.props;
    const fullName = `${first_name} ${last_name}`;
    const { logout_url, profile_url } = this.props.additional_data;

    return (
      <div className="rvh_pre">
        <div className="rvh_container">
          <ul className="rvh_pre_list">
            <li className="rvh_list_item">
              <a href="https://www.redvector.com/lms/lms20/dashboard/myaccount.aspx">
                <span className="rvh_u_small">Hi, {fullName}</span>
              </a>
            </li>
            <li className="rvh_list_item">
              <a href={profile_url}>
                <span className="rvh_u_small">Your Account</span>
              </a>
            </li>
            <li className="rvh_list_item">
              <a href="https://help.redvector.com/hc/en-us">
                <span className="rvh_u_small">Support</span>
              </a>
            </li>
            <li className="rvh_list_item">
              <a href={logout_url}>
                <span className="rvh_u_small">Sign Out</span>
              </a>
            </li>
            <li className="rvh_list_item">
              <a href="https://www.redvector.com/lpe/shoppingcart/index" className="rvh_icon rvh_icon_cart">
                <span className="rvh_u_color_tertiary margin-left-5"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
