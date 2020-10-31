function Box(props) {
    return (
        <div
            className={"box " + (props.type || props.disabled ? "has-value": "no-value")}
            onClick={props.type === null && !props.disabled ? props.onClick: null}
        >
        {props.type === "cross" && 
            <p>X</p>
        }
        {props.type === "naught" && 
            <p>O</p>
        }
      </div>
    );
  }
  
  export default Box;