type BulbProps = {
    color: "white" | "amber" | "green" | "red";
    size?: "small" | "large";
    lit?: boolean;
  };
  
  function Bulb({
    color,
    size = "large",
    lit = false,
  }: BulbProps) {
    return (
      <div
        className={`
          bulb
          ${color}
          ${size}
          ${lit ? "lit" : ""}
        `}
      />
    );
  }
  
  export default Bulb;