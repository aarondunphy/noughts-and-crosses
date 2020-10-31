function Box(props) {
    return (
      <div className={"box " + (props.type ? "has-value": "no-value")} onClick={props.type === null ? props.onClick: null}>
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