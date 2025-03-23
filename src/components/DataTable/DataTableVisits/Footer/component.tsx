import { VisitGroup } from "../../../../@types/Visit";
import { useVisits } from "../../../../contexts/VisitContext";
import { FlexRow } from "../../../../style/default";
import ButtonAction from "../../../Button/Action/component";

export default function Footer({group}: {group: VisitGroup}) {
  const {
    handleCalculateDuration,
    handleUpdateGroupStatus
  } = useVisits();

  const rowCount = group.visits.length

  return (
    <FlexRow
      style={{
        backgroundColor: '#10101010',
        borderRadius: '0px 0px 8px 8px',
        borderTop: '1px solid #10101020',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: '10px 8px',
      }}
    >
      <span>Total de visitas: {rowCount}</span>
      <ButtonAction
        style={{ padding: 12, fontSize: 14 }}
        disabled={group.visits.every(visit => visit.completed === "1") && handleCalculateDuration(group) == 480}
        onClick={() => handleUpdateGroupStatus(group.date, "1")}
      >
        Fechar visitas do dia
      </ButtonAction>
    </FlexRow>
  );
}