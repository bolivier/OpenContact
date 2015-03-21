/**
 * @jsx React.DOM
 */

var PersonProfile = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		isEditing: React.PropTypes.bool.isRequired
	},

	renderViewer: function () {
		var user = this.props.item;
		return (
			<div className="ui segment">
				<div className="ui header">
					{ user.name }
				</div>
				<a className="ui top right attached green label">
					<i className="edit icon"></i>
					Edit
				</a>
				<div className="ui content">
					{ user.name + user.name }
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
							<input
								placeholder="Name of contact..."
								defaultValue={user.name} />
						</b>
					</div>
				</div>
				<a className="ui top right attached orange label">
					<i className="save icon"></i>
					Save
				</a>
				<div className="ui content">
					Some random stuff here including address.
				</div>
			</div>
		);
	},

	render: function () {
		return this.props.isEditing ? this.renderEditor() : this.renderViewer();
	}
});

module.exports = PersonProfile;
