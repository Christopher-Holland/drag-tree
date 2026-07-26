import Bulb from "./bulb";

function Tree() {
  return (
    <div className="tree">
      <div className="row">
        <Bulb color="white" size="small" />
        <Bulb color="white" size="small" />
      </div>

      <div className="row">
        <Bulb color="white" size="small" />
        <Bulb color="white" size="small" />
      </div>

      <div className="row">
        <Bulb color="amber" />
        <Bulb color="amber" />
      </div>

      <div className="row">
        <Bulb color="amber" />
        <Bulb color="amber" />
      </div>

      <div className="row">
        <Bulb color="amber" />
        <Bulb color="amber" />
      </div>

      <div className="row">
        <Bulb color="green" />
        <Bulb color="green" />
      </div>

      <div className="row">
        <Bulb color="red" />
        <Bulb color="red" />
      </div>
    </div>
  );
}

export default Tree;