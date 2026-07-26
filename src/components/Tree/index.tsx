import Bulb from "../Bulb/index.tsx";

type TreeProps = {
  preStageLit: boolean;
  stageLit: boolean;
};

function Tree({ preStageLit, stageLit }: TreeProps) {
  return (
    <div className="tree-assembly">
      <div className="tree-header">
        <span>LEFT</span>
        <span>RIGHT</span>
      </div>

      <div className="tree">
        <div className="center-pole" />

        <div className="tree-section staging-section">
          <div className="tree-label">PRE-STAGE</div>

          <div className="row staging-row">
            <div className="bulb-housing small-housing">
              <Bulb color="white" size="small" lit={preStageLit} />
            </div>

            <div className="bulb-housing small-housing">
              <Bulb color="white" size="small" lit={preStageLit} />
            </div>
          </div>

          <div className="tree-label">STAGE</div>

          <div className="row staging-row">
            <div className="bulb-housing small-housing">
              <Bulb color="white" size="small" lit={stageLit} />
            </div>

            <div className="bulb-housing small-housing">
              <Bulb color="white" size="small" lit={stageLit} />
            </div>
          </div>
        </div>

        <div className="tree-section countdown-section">
          <div className="row">
            <div className="bulb-housing">
              <Bulb color="amber" />
            </div>

            <div className="bulb-housing">
              <Bulb color="amber" />
            </div>
          </div>

          <div className="row">
            <div className="bulb-housing">
              <Bulb color="amber" />
            </div>

            <div className="bulb-housing">
              <Bulb color="amber" />
            </div>
          </div>

          <div className="row">
            <div className="bulb-housing">
              <Bulb color="amber" />
            </div>

            <div className="bulb-housing">
              <Bulb color="amber" />
            </div>
          </div>

          <div className="row">
            <div className="bulb-housing">
              <Bulb color="green" />
            </div>

            <div className="bulb-housing">
              <Bulb color="green" />
            </div>
          </div>

          <div className="row">
            <div className="bulb-housing">
              <Bulb color="red" />
            </div>

            <div className="bulb-housing">
              <Bulb color="red" />
            </div>
          </div>
        </div>
      </div>

      <div className="tree-base">
        <div className="base-post" />
        <div className="base-foot" />
      </div>
    </div>
  );
}

export default Tree;