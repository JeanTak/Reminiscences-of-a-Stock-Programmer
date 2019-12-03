/* REFERENCE:
1. REST API: https://www.django-rest-framework.org/api-guide/generic-views/#createapiview
			https://dev.to/enether/managing-restful-urls-in-django-rest-framework
			https://docs.djangoproject.com/en/2.2/ref/request-response/

2. Django tutorial:
	https://docs.djangoproject.com/en/dev/ref/models/instances/?from=olddocs#how-django-knows-to-update-vs-insert
	https://wsvincent.com/django-rest-framework-react-tutorial/
	https://www.valentinog.com/blog/drf/
	https://www.tutorialspoint.com/django/django_creating_views.htm
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Button, Col, Row, Input, InputGroupText } from 'reactstrap';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import key from "weak-key";
import TradingViewWidget from 'react-tradingview-widget';
import { Resizable, ResizableBox } from 'react-resizable';

// import Draggable from 'react-draggable';
// import {Button, Card, CardBody, CardHeader,
// 	Col, Row, Input,InputGroup,
// 	InputGroupAddon, InputGroupText } from 'reactstrap';


class ThemeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
	  bgColor: 'rgb(255, 255, 255)'
    }
  }

  componentDidMount () {
    const elem = ReactDOM.findDOMNode(this).parentNode.firstChild;
	const color = window.getComputedStyle(elem).getPropertyValue('background-color');
	this.setState({
		bgColor: color || this.state.bgColor
	});
  }

  render() {
    return (
      <table className="w-100">
        <tbody>
        <tr>
          <td className="text-muted">HEX:</td>
          <td className="font-weight-bold">{ rgbToHex(this.state.bgColor) }</td>
        </tr>
        <tr>
          <td className="text-muted">RGB:</td>
          <td className="font-weight-bold">{ this.state.bgColor }</td>
        </tr>
        </tbody>
      </table>
    )
  }
}

class ThemeColor extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    // const { className, children, ...attributes } = this.props
    const { className, children } = this.props

    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    return (
      <Col xl="2" md="4" sm="6" xs="12" className="mb-4">
        <div className={classes} style={{paddingTop: '75%'}}></div>
        {children}
        <ThemeView/>
      </Col>
    )
  }
}

class StockChart extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			config: [],
			loaded: false
		}
	}
	
	componentDidMount() {
		if(!window.stockChartConfig){
			fetch("http://127.0.0.1:8000/api/stockchart/")
				.then(response => {
				if (response.status == 200) {
					return response.json();
				} else {
					console.log(response);
				}})
				.then(data => {
					this.setState({ config: data, loaded: true });
					window.stockChartConfig = data;
					}, error => console.log('failed to fetch data from server'));
		} else {
			this.setState({ config: window.stockChartConfig, loaded: true });
		}
	}

	addNewChart(e) {
		let newDataList = this.state.config;
		if (newDataList.length >= 10) {
			console.log("You cannot add more than 10 charts.");
			return;
		}
		let newId = newDataList[newDataList.length-1].id;
		newDataList.push({
			id: newId + 1,
			symbol: "SPX",
			theme: "Dark",
			locale: "en"
		});
		this.setState({ config: newDataList });
	}

	changeChartIndex(e){
		console.log(e.currentTarget.dataset.id);
		
	this.state.config.filter(config =>
		config.id == e.currentTarget.dataset.id)[0].symbol = e.target.value;
	}

	deleteChart(e){
		this.setState({config: this.state.config.filter((chart) =>
						chart.id != e.currentTarget.dataset.id)});
	}

	saveChartConfig(e){
		
		let data = [];
		this.state.config.forEach(config => {
			data.push({
				symbol: config.symbol,
				theme: config.theme,
				locale: config.locale
			});
		});

		fetch('http://127.0.0.1:8000/api/stockchart/update', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => {
			if(response.status == 201){
				alert("success");
			}

		});
	}

	render() {
		return (
			<div className="animated fadeIn" id="stock-chart-page">
				
				<Row className="stock-row">
					{!this.state.loaded ? (<p>Loading...</p>) : (
						Object.entries(this.state.config).map(config =>
							<ResizableBox key={key(config)} className="stock-chart" width={450} height={300}>
								<Row>
									<Col sm="2" md="2">
										<InputGroupText className="chart-field"
										style={{fontFamily:'Lucida Sans'}}>Default:</InputGroupText>
									</Col>
									<Col md="6">
										<Input type="text"
										className="chart-field"
										data-id={config[1].id}
										placeholder={config[1].symbol ? config[1].symbol : "SPX"}
										onChange={this.changeChartIndex.bind(this)} />
									</Col>
									<Col>
										<Button aria-pressed="true" color="danger" data-id={config[1].id} size="sm" className="chart-delete btn-pill" onClick={this.deleteChart.bind(this)}>delete</Button>
									</Col>
								</Row>
								<TradingViewWidget
									symbol={config[1].symbol ? config[1].symbol : "SPX"}
									theme={config[1].theme ? config[1].theme : "Dark"} 
									locale={config[1].symbol ? config[1].symbol : "en"} 
									autosize
									/>
									
							</ResizableBox>
						))
					}
				</Row>
				<Row className="stock-row">
					<Col xs lg="2">
						<Button block color="secondary" onClick={(e) => this.addNewChart(e)}>Add</Button>
					</Col>
					<Col xs lg="2">
						<Button block color="primary" onClick={(e) => this.saveChartConfig(e)}>Save</Button>
					</Col>
				</Row>
			</div>
    );
  }
}

export default StockChart;
