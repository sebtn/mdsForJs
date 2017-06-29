import React, {component} from 'react'

let isAdmin = false
let adminComponent = (Component) => {
  return class Admin extends Component {
    render() {
      if(isAdmin) {
        return (
          <div>
            testing component text
            <Component {...props}/> 
          </div>
        )
      } else {
        return null
      }
    }
  }
}

class ComponentTwo extends Component {
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
