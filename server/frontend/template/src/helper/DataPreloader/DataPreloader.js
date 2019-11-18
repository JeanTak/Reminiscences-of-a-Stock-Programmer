
//REFERENCE: https://www.valentinog.com/blog/drf/

// import React, { Component } from "react";
// import PropTypes from "prop-types";

class DataPreloader {

  	loadData(endpoint){
		fetch(endpoint)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(data => {
				return data;
			},
			error => console.log('failed to fetch data from server'));
			}
}
export default DataPreloader;

