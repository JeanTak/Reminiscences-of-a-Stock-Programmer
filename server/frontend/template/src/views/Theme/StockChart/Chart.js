import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';

const Chart = ({ config }) =>
  !config.length ? (<p>Loading...</p>) : (Object.entries(config).map(config => 
		<ResizableBox key={key(config)} className="stock-chart" width={450} height={300}>
				<TradingViewWidget
					symbol={config[1].symbol ? config[1].symbol : "SPX"}
					theme={config[1].theme ? config[1].theme : "Dark"} 
					locale={config[1].symbol ? config[1].symbol : "en"} 
					autosize
				/>
		</ResizableBox>));

Chart.propTypes = {
  config: PropTypes.array.isRequired
};
export default Chart;