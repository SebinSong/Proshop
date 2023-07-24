import React from 'react'
import { useNavigate } from 'react-router-dom'
import { classNames as cn } from '@utilities'
import './Stepper.scss'

const StepUnit = ({ 
  name = '', 
  status = 'none', // enum of ['none', 'active', 'visited']
  linkTo = ''
}) => {
  const navigate = useNavigate()
  const clickHandler = () => {
    if (status !== 'none' && linkTo) {
      navigate(linkTo) 
    }
  }
  return (
    <li className={cn('stepper-unit', `is-${status}`)}
      tabIndex='0'
      onClick={clickHandler}>
      <div className='stepper-unit__circle'>
        {
          status === 'visited'
            ? <i className='icon-check stepper-unit__circle-check'></i>
            : <span className='stepper-unit__circle-btn'></span>
        }
      </div>

      <div className='stepper-unit__name'>{ name }</div>
    </li>
  )
}

function Stepper ({
  list = [], // format: { order: number, name: string }
  current = 1
}) {
  const getStatus = (order) => {
    return order === current ? 'active'
      : order < current ? 'visited'
      : 'none'
  }

  return (
    <div className='stepper-container'>
      <div className='stepper-track'>
        <span className='stepper-track__bar'></span>
      </div>

      <ul className='stepper-list'>
        { 
          list.map(entry => <StepUnit 
            name={entry.name} 
            status={getStatus(entry.order)}
            linkTo={entry.linkTo}
            key={entry.order} />)
        }
      </ul>
    </div>
  )
}

export default React.memo(Stepper)