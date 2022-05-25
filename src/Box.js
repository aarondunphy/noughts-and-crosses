const Box = ({
  type,
  disabled,
  handleClick,
}) => {
    return (
        <div
            className={"box " + (type || disabled ? "has-value": "no-value")}
            onClick={type === null && !disabled ? handleClick : null}
        >
        {type === "cross" && 
            <p>X</p>
        }
        {type === "naught" && 
            <p>O</p>
        }
      </div>
    );
  }
  
  export default Box;