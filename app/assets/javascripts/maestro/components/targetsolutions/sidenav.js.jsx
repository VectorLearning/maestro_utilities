//= require ../base/sidenav

let SideNav = React.createClass({
  render: function() {
    var links = this.props.lms_navigation.subnav.links.map(function(link, index){
      return (
        <NavItem text={ link.text } icon={ link.icon } active={link.active} key={index} />
      );
    });

    return (
      <div className="nav-container" id="sidenav">
        {/* <img src="http://lorempixel.com/400/400/abstract/" />
        <ul className="nav nav-pills nav-stacked" id="sidenav">
          { links }
        </ul> */}
        <nav role="navigation">
        	<ul>
        		<li>
        			<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_assignments.showDashboard">
        				<i className="fa fa-bar-chart fa-2x"></i>
        				<span className="text hidden-text">Dashboard</span>
        			</a>
        		</li>
        		<li className="active">
        			<a href="/tsapps/reports">
        				<i className="fa fa-database fa-2x"></i>
        				<span className="text hidden-text">Generate Reports</span>
        			</a>
        		</li>
        		<li>
        			<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_users.showHome">
        				<i className="fa fa-users fa-2x"></i>
        				<span className="text hidden-text">Manage Users</span>
        			</a>
        		</li>
        		<li>
        			<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_courses.showHome">
        				<i className="fa fa-book fa-2x"></i>
        				<span className="text hidden-text">Course Library</span>
        			</a>
        		</li>
        		<li className="collapsible active">
        			<a href="">
        				<i className="fa fa-pencil-square-o fa-2x"></i>
        				<span className="text hidden-text">Assignments</span>
        				<i className="fa fa-chevron-down fa-fw text hidden-text"></i>
        			</a>
        			<ul className="collapse">
        				<li className="active">
        					<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_assignments.showNewAssignmentSelectActivity">
        					<span className="text hidden-text">Create New Assignments</span>
        				</a>
        			</li>
        				<li>
        					<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_assignments.showManageAssignmentsSelectUsers">
        					<span className="text hidden-text">Manage Assignments</span>
        				</a>
        			</li>
        				<li>
        					<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_assign_ca.showSAASelectActivity">
        						<span className="text hidden-text">Save and Assign</span>
        					</a>
        				</li>
        			</ul>
        		</li>
        		<li className="collapsible">
        			<a href="">
        				<i className="fa fa-check-square-o fa-2x"></i>
        				<span className="text hidden-text">Completions</span>
        				<i className="fa fa-chevron-down fa-fw text hidden-text"></i>
        			</a>
        			<ul className="collapse">
        				<li>
        					<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_assignments.showRcaSelectActivity">
        						<span className="text hidden-text">Record Completions</span>
        					</a>
        			</li>
        				<li>
        					<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_assignments.showVCA">
        						<span className="text hidden-text">Validate Completions</span>
        					</a>
        			</li>
        				<li>
        					<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_assignments.showDeleteCompletions">
        						<span className="text hidden-text">Delete Completions</span>
        					</a>
        				</li>
        			</ul>
        		</li>
        		<li>
        			<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_credentials.showHome">
        				<i className="fa fa-certificate fa-2x"></i>
        				<span className="text hidden-text">Manage Credentials</span>
        			</a>
        		</li>
        		<li>
        			<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_custom_activities.listCustomActivities">
        				<i className="fa fa-file-o fa-2x"></i>
        				<span className="text hidden-text">Activities Builder</span>
        			</a>
        		</li>
        		<li>
        			<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_tests.showHome">
        				<i className="fa fa-wrench fa-2x"></i>
        				<span className="text hidden-text">Test Builder</span>
        			</a>
        		</li>
        		<li>
        			<a href="/tsapp/dashboard/pl_fb/index.cfm?fuseaction=c_pro_documents.documents">
        				<i className="fa fa-folder-open-o fa-2x"></i>
        				<span className="text hidden-text">File Center</span>
        			</a>
        		</li>
        	</ul>
        </nav>
    </div>
    );
  }
});

let NavItem = React.createClass({
  render: function() {
    return (
      <li className={(this.props.active ? "active" : "")}><a href=""><i className={"fa fa-" + this.props.icon + " fa-2x"}></i><span>{ this.props.text }</span></a></li>
    );
  }
});
