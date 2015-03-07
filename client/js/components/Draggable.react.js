/**
 * @jsx React.DOM
 */

var React = require('react');

var Draggable = React.createClass({
  propTypes: {
    droppable: React.PropTypes.array,
    onDrop: React.PropTypes.func
  },

  componentDidMount: function() {
    var root = this.getDOMNode();
    jQuery(root).pep();
    /*{
      droppable: this.props.droppable,
      drag: function(ev, obj){
        //onDrop
        console.log(
        [ "There is ",
          this.activeDropRegions.length,
          " active drop region(s)." ].join('')
        )
      }
    });*/
  },

  componentDidUnmount: function() {
    jQuery(root).unbind();
    console.log('Unmount!');
  },

  render: function() {
    return (
      <div className="pep">
      	{this.props.children}
      </div>
    );
  }
});

module.exports = Draggable;
