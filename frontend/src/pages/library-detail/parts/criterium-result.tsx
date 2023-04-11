import { useEffect, useState } from "react";
import { Criterium, CriteriumScore } from "../../../shared/resources/types";
import CountBubble from "../../../shared/components/count-bubble";
import ResultBubble from "../../../shared/components/result-bubble";
import { getCriterium } from "../../../shared/services/api";
import { SHOW_AGREEMENT_SCORE } from "../library-detail";
import "./criterium-result.scss";

type CriteriumResultProps = {
  item: CriteriumScore;
};

/** This Component is used with ComponentResultDetails */
const CriteriumResult = ({ item }: CriteriumResultProps) => {
  const [criterium, setCriterium] = useState<Criterium>();

  useEffect(() => {
    getCriterium(item.criterium_id).then((result) => {
      setCriterium(result);
    });
  }, [item.criterium_id]);

  return (
    <div className='criterium-detail'>
      <ResultBubble
        positive={item.positive}
        negative={item.negative}
        not_decided={item.notDecided}
      />
      <div className='criterium-text'>
        {criterium ? criterium.title : "criterium not found"}
      </div>
      {SHOW_AGREEMENT_SCORE && (
        <CountBubble label='Agreement Score' count={item.agreementScore} />
      )}
    </div>
  );
};

export default CriteriumResult;
