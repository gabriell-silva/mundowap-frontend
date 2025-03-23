import { VisitGroup } from "../../../../@types/Visit";
import { useVisits } from "../../../../contexts/VisitContext";
import { FlexColumn, FlexRow } from "../../../../style/default";
import Progressbar from "../../../ProgressBar/component";
import Title from "../../../Title/component";

export default function Header({ group, style }: { group: VisitGroup; style: React.CSSProperties }) {
  const {
    handleCalculateDuration,
  } = useVisits();

  const totalDuration = handleCalculateDuration(group);

    const completedVisits = group.visits.filter(visit => visit.completed === "1");
    const totalCompletedDuration = completedVisits.reduce((acc, visit) => acc + (visit.completed === "1" ? Number(visit.duration) : 0), 0);
    const completionPercentage = Math.min((totalCompletedDuration / totalDuration) * 100, 100);

    return (
      <FlexRow style={{ justifyContent: 'space-between', alignItems: 'center', ...style }}>
        <Title>
          {group.date}
        </Title>

        <FlexColumn>
          <span style={{ fontSize: 12, color: '#666' }}>
            {`Duração: ${totalDuration}min / 480min (${Math.min((totalDuration / 480) * 100, 100).toFixed(2)}%)`}
          </span>

          <Progressbar value={completionPercentage} />
        </FlexColumn>
      </FlexRow>
    );
}