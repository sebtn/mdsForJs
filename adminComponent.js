import React, {component} from 'react'

let isAdmin = false
let adminComponent = (Component) => {
  return class Admin extends React.Component {
    render() {
      if(isAdmin) {
        return (
          <div>
            <p>Private admin info</p>
            <Component {...props}/> 
          </div>
        )
      } else {
        return null
      }
    }
  }
}
/*Using component extension, can alter component's life cycle
and render methods */
let isAdmin = true
let adminComponent = (Component) => {
  return class Admin extends Component {
    componentDidUpdate =() => {
      console.log('Admin did update')
      if (super.componentDidUpdate) {
        super.componentDidUpdate
      }
    })
    render() {
      if(isAdmin) {
        return (
          <div>
            <p>Private admin info</p>
            {super.render()} 
          </div>
        )
      } else {
        return null
      }
    }
  }
}

class ComponentTwo extends Component {
  componentDidUpdate =() => {
    console.log('ComponentTwo did update')
  })
  constructor(props) {
    super(props)
    this.state = {
      count: props.count
    }
  }
  render() {
    return (
      <div>
        <p>Component 2 using react</p>
        <button 
        onClick={ ()=> {
          this.setState({count : this.state.count + 1})
        } }>
        </button>
      </div>
    )
  }
}

ComponentTwo.defaultProps = { count: 50 } 
ComponentTwo.PropTypes = { count: React.ProTypes.number } 

export default adminComponent(ComponentTwo)
