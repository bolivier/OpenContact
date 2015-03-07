/**
 * @jsx React.DOM
 */

var PersonProfile = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
	},
	render: function () {
		var user = this.props.item;
		return (
			<div className="ui segment">
				<div className="ui header">
					{ user.name }
				</div>
				<div className="ui content">
					{ user.name + user.name }
				</div>
			</div>
		);
	}
});

module.exports = PersonProfile;
