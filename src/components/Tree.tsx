import Bulb from "./Bulb.tsx";

type TreeProps = {
  preStageLit: boolean;
  stageLit: boolean;
};

function Tree({
  preStageLit,
  stageLit,
}: TreeProps) {
  return (
    <div className="tree">
      <div className="row">
        <Bulb
          color="white"
          size="small"
          lit={preStageLit}
        />
        <Bulb
          color="white"
          size="small"
          lit={preStageLit}
        />
      </div>

      <div className="row">
        <Bulb
          color="white"
          size="small"
          lit={stageLit}
        />
        <Bulb
          color="white"
          size="small"
          lit={stageLit}
        />
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