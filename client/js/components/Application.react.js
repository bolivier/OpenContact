/**
 * @jsx React.DOM
 */

var Constants = require('../Constants');
var ItemList = require('./ItemList.react');
var PersonProfile = React.createFactory(require('./PersonProfile.react'));
var ServerActions = require('../actions/ServerActions');
var Store = require('../stores/Store');

var ObjectTypes = {
	people: {
		current: Store.getCurrentPerson,
		list: Store.getSortedPeople,
		detailsView: PersonProfile
	},
	organizations: {
		current: Store.getCurrentOrganization,
		list: Store.getSortedOrganizations,
		detailsView: PersonProfile
	},
};

var Application = React.createClass({
	getInitialState: function () {
		return {
			showList: 'people'
		};
	},
	componentDidMount: function() {
		Store.addListener((function(e) {
			this.forceUpdate();
		}).bind(this), Constants.PEOPLE_CHANGE_EVENT);
		Store.addListener((function(e) {
			this.forceUpdate();
		}).bind(this), Constants.ORGS_CHANGE_EVENT);

		ServerActions.loadPeople();
		ServerActions.loadOrgs();

		Store.addListener((function(e) {
			this.forceUpdate();
		}).bind(this), Constants.CURRENT_PERSON_CHANGE_EVENT);

		Store.addListener((function(e) {
			this.forceUpdate();
		}).bind(this), Constants.CURRENT_ORG_CHANGE_EVENT);
	},
	handleShowTypeChange: function (typeName) {
		this.setState({'showList': typeName});
	},
	isShownType: function (typeName) {
		return this.state.showList === typeName;
	},
	addUser: function () {
		Store.createPerson();
	},
	getItemList: function () {
		return ObjectTypes[this.state.showList].list();
	},
	getDetailsView: function () {
		var currentItem = ObjectTypes[this.state.showList].current();
		return currentItem ? ObjectTypes[this.state.showList].detailsView({
			item: currentItem,
			isEditing: true,
			key: this.state.showList + currentItem._id
		}) : null;
	},
	render: function () {
		var detailsView = this.getDetailsView();
		return (
			<div className="ui stackable grid">
				<div className="row">
					<div className="sixteen wide column">
						<div className="ui segment">
							<h1 className="ui header">
								Open Contact
								<div className="ui positive right floated button">
									<i className="plus icon"></i>
									<i className="university icon"></i>
								</div>
								<div className="ui positive right floated button"
									onClick={ this.addUser } >
									<i className="plus icon"></i>
									<i className="user icon"></i>
								</div>
							</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="three wide column">
						<div className="fluid ui vertical menu">
							<a className={
									(this.isShownType('people') ?
										'active blue ' : '')
									+ 'item'}
								onClick={this.handleShowTypeChange.bind(this, 'people')}>
								<i className="user icon"></i>
								People
							</a>
							<a className={
									(this.isShownType('organizations') ?
										'active blue ' : '')
									+ 'item'}
								onClick={this.handleShowTypeChange.bind(this, 'organizations')}>
								<i className="university icon"></i>
								Organizations
							</a>
						</div>
					</div>
					<div className="five wide column">
						<ItemList items={ this.getItemList() } typeName={ this.state.showList } />
					</div>
					<div className="seven wide column">
						{detailsView}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Application;
