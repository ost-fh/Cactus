import { Criterium, CriteriumScore } from "../../../shared/resources/types";
import CountBubble from "../../../shared/components/count-bubble";
import ResultBubble from "../../../shared/components/result-bubble";
import "./criterium-result.css";
import { useEffect, useState } from "react";
import { getCriterium } from "../../../shared/services/api";

type CriteriumResultProps = {
  item: CriteriumScore;
};

/** This Component is to be used with ComponentResultDetails */
const CriteriumResult = ({ item }: CriteriumResultProps) => {
  const [criterium, setCriterium] = useState<Criterium>();

  useEffect(() => {
    getCriterium(item.criterium_id).then((item) => setCriterium(item));
  }, [item.criterium_id]);

  return (
    <div className='criterium-detail'>
      <div className='criterium-text'>{criterium?.text}</div>
      <ResultBubble
        positive={item.positive}
        negative={item.negative}
        not_decided={item.notDecided}
      />
      <CountBubble label='Agreement Score' count={item.agreementScore} />
    </div>
  );
};

export default CriteriumResult;
