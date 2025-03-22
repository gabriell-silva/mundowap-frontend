import { ProgressbarWrapper, ProgressbarFill, ProgressText, ProgressbarBackground } from "./style";

export default function Progressbar({ value }: { value: number}) {

  const handleDefinePercentual = (value: number) => {

    if (value < 60) {
      return '#EF4B6E';
    } else if (value > 90) {
      return '#4BEF6E';
    } else {
      return '#4B6EFF';
    }
  }

  return (
    <ProgressbarWrapper>
      <ProgressbarBackground />
      <ProgressbarFill 
        style={{
          width: value < 100 ? `${value}%` : "100%",
          backgroundColor: handleDefinePercentual(value),
          animation: value < 100 ? "loading 2s infinite" : "none"
        }}
      >
        <ProgressText>{value.toFixed(2)}%</ProgressText>
      </ProgressbarFill>
    </ProgressbarWrapper>
  );
}
