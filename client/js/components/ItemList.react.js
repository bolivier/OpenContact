/**
 * @jsx React.DOM
 */

var Store = require('../stores/Store');

var classNames = require('classnames');

var ItemList = React.createClass({
	propTypes: {
		items: React.PropTypes.array.isRequired,
		typeName: React.PropTypes.string.isRequired
	},
	getInitialState: function () {
		return {
			currentElement: 0,
			filter: ''
		};
	},
	setCurrentSelection: function (itemIndex) {
		if (this.props.typeName === 'people') {
			Store.setCurrentPerson(itemIndex); // Use Index as ID for now
		} else if (this.props.typeName === 'organizations') {
			Store.setCurrentOrganization(itemIndex);
		}
		this.setState({ currentElement: itemIndex });
	},
	updateFilter: function (event) {
		this.setState({ filter: event.target.value });
	},
	getFilteredList: function () {
		var filter = this.state.filter.toLowerCase();
		return this.props.items.filter(function(entity) {
			return entity.name.toLowerCase().indexOf(filter) != -1;
		});
	},
	render: function () {
		return (
			<div >
				<div className="fluid ui input">
					<input placeholder={
						'Search for ' + this.props.typeName + '...'}
						value={this.state.filter}
						onChange={this.updateFilter}></input>
				</div>
				<div className="ui segments clickables item-list">
					{
						_.map(this.getFilteredList(), function(item, index) {
							var cn = classNames.apply(null, [
								'ui',
								{'blue inverted':
									index === this.state.currentElement},
								'segment'
							]);
							return (
								<div className={cn}
									onClick={this.setCurrentSelection.bind(
										this, index)}
									key={item._id}>
									{ item.name }
								</div>
							);
						}, this)
					}
				</div>
			</div>
		);
	}
});

module.exports = ItemList;
