/**
 * @jsx React.DOM
 */

var Constants = require('../Constants');
var ServerActions = require('../actions/ServerActions');
var Store = require('../stores/Store');

var DetailsSegment = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onDelete: React.PropTypes.func.isRequired
	},

	getInitialState: function () {
		return {
			isEditing: !this.props.item._id,
			itemState: $.extend(true, {}, this.props.item) // Deep copy
		};
	},

	startEditing: function() {
		this.setState({isEditing: true});
	},

	stopEditing: function() {
		this.save();
		this.setState({isEditing: false});
	},

	delete: function () {
		this.setState({isEditing: false});
		this.props.onDelete(this.state.itemState);
	},

	save: function() {
		if (!this.state.itemState.name.length) { return; }
		this.props.onSave(this.state.itemState);
	},

	componentWillUnmount: function() {
		if (this.state.isEditing) {
			this.save();
		}
	},

	updateItem: function(field, event) {
		var obj = {};
		obj[field] = event.target.value;
		this.setState({itemState: $.extend(true, this.state.itemState, obj)});
	},

	renderViewer: function () {
		var user = this.props.item;
		return (
			<div className="ui segment">
				<div className="ui header">
					{ user.name }
				</div>
				<a className="ui top right attached green label"
					onClick={this.startEditing}>
					<i className="edit icon"></i>
					Edit
				</a>
				<div className="ui content">
					{ this.props.children }
				</div>
			</div>
		);;
	},

	renderEditor: function () {
		var user = this.props.item;
		return (
			<div className="ui segment">
				<div className="ui header">
					<div className="ui input">
						<b>
							<input placeholder="Name of contact..."
								defaultValue={user.name}
								onChange={this.updateItem.bind(this, 'name')} />
						</b>
					</div>
				</div>
				<a className="ui top right attached orange label"
					onClick={this.stopEditing}>
					<i className="save icon"></i>
					Save
				</a>
				<a className="ui bottom right attached red label"
					onClick={this.delete}>
					<i className="remove icon"></i>
					Delete
				</a>
				<div className="ui content">
					{ this.props.children }
				</div>
			</div>
		);
	},

	render: function () {
		return this.state.isEditing ? this.renderEditor() : this.renderViewer();
	}
});

module.exports = DetailsSegment;
