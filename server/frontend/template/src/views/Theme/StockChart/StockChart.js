import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import key from "weak-key";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';

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

	render() {
		return (
			<div className="animated fadeIn" id="stock-chart-page">
				<Row className="stock-row">
					{!this.state.loaded ? (<p>Loading...</p>) : (
						Object.entries(this.state.config).map(config => 
						<ResizableBox key={key(config)} className="stock-chart" width={450} height={300}>
							<TradingViewWidget
								symbol={config[1].symbol ? config[1].symbol : "SPX"}
								theme={config[1].theme ? config[1].theme : "Dark"} 
								locale={config[1].symbol ? config[1].symbol : "en"} 
								autosize
							/>
						</ResizableBox>))
					}
				</Row>
				<Row className="stock-row">
					<Col xs lg="2">
						<Button block color="secondary">Edit</Button>
					</Col>
					<Col xs lg="2">
						<Button block color="primary">Save</Button>
					</Col>
				</Row>
			</div>
    );
  }
}

export default StockChart;
