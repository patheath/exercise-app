import React, { Component } from 'react';

class ExerciseRow extends Component {

  render (props) {
    return(
      <tr style={this.props.style}>
        <td colSpan="7">{this.props.exercise}</td>
      </tr>
    )
  }
}

export default ExerciseRow;