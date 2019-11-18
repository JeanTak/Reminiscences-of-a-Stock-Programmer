
//REFERENCE: https://www.valentinog.com/blog/drf/

import React, { Component } from "react";
import PropTypes from "prop-types";
class DataProvider extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };
  state = {
      data: [],
      loaded: false,
      placeholder: "Loading..."
    };
  componentDidMount() {
    fetch(this.props.endpoint)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
			.then(data => {
				this.setState({ data: data, loaded: true });
			},
			error => console.log('failed to fetch data from server'));
  }
  render() {
	const { data, loaded, placeholder } = this.state;
	if (loaded){
		return this.props.render(data);
	}
	else{
		return <p>{placeholder}</p>;
	}
    // return loaded ? this.props.render(data) : <p>{placeholder}</p>;
  }
}
export default DataProvider;

