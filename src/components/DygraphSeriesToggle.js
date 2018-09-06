import React from 'react'
import uuidv4 from 'uuid/v4'

export default class DygraphSeriesToggle extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  render() {
    return <div className="dygraph-series-toggle-block bottom">
      { this.props.labels.map((label, index) => {
        const checkboxId = uuidv4()
        return (
          <div className='md-checkbox md-checkbox-inline' key={label.name}>
            <input type='checkbox'
                   className='dygraph-series-toggle-checkbox md-check'
                   id={checkboxId}
                   checked={label.checked}
                   onChange={this.onChange.bind(this, label.name)}/>
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

  onChange(labelName, event) {
    this.props.onLabelStateChange(labelName, event.target.checked)
  }
}
