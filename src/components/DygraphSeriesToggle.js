import React from 'react'
import uuidv4 from 'uuid/v4'

export default class DygraphSeriesToggle extends React.Component {
  render() {
    return <div className="dygraph-series-toggle-block">
      { this.props.labels.map((label, index) => {
        const checkboxId = uuidv4()
        return (
          <div className='md-checkbox md-checkbox-inline' key={checkboxId}>
            <input type='checkbox' className='dygraph-series-toggle-checkbox md-check' id={checkboxId} checked/>
            <label className='dygraph-series-toggle-label' htmlFor={checkboxId} style={{ color: label.color }} >
              <span className='inc'></span>
              <span className='check' style={{border: `2px solid ${label.color}`, borderTop: 'none', borderLeft: 'none'}}></span>
              <span className='box' style={{ border: `2px solid ${label.color}` }}></span>
              <div className='dygraph-series-toggle-series-name'>{ label.name }</div>
            </label>
          </div>
        )
      })}
    </div>
  }
}
