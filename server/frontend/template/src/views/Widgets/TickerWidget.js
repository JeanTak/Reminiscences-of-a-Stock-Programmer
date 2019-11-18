import React from 'react';
import WidgetData from '../Data/WidgetData';

export default class TickerWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
	s.async = true;
	s.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
	s.innerHTML = WidgetData.TickerWidgetData;
    this.instance.appendChild(s);
  }

  render() {
    return <div className="ticker-widget" ref={el => (this.instance = el)} />;
  }
}