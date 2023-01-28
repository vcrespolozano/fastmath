import './Operation.scss';

const Operation = ({op1, op2, operator, result}) => {

  return (
    <div className="operation">
      <span>{`${op1} ${operator} ${op2} = ${result}`}</span>
    </div>
  )
}

export default Operation;