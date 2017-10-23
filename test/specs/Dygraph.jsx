import Dygraph from '../../src'
import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Dygraph', function () {
  it('should be a function', function () {
    expect(Dygraph).to.be.a('function')
  })
  it('should be a React component', function () {
    expect(new Dygraph()).to.be.an.instanceof(React.Component)
  })
  it('should render a div', function () {
    const wrapper = mount(<Dygraph data={[]} />)
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.instance().root).to.not.be.undefined
    expect(wrapper.contains(<div />)).to.equal(true)
  })
})
