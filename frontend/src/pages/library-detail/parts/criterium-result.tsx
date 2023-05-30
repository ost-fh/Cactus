import { useEffect, useState } from "react";
import { Criterium, CriteriumScore } from "../../../shared/resources/types";
import CountBubble from "../../../shared/components/count-bubble";
import ResultBubble from "../../../shared/components/result-bubble";
import { getCriterium } from "../../../shared/services/api";
import { SHOW_AGREEMENT_SCORE } from "../library-detail";
import "./criterium-result.scss";
import Alert from "../../../shared/components/alert";
import { BsInfoLg } from "react-icons/bs";

type CriteriumResultProps = {
  item: CriteriumScore;
};

/** This Component is used with ComponentResultDetails */
const CriteriumResult = ({ item }: CriteriumResultProps) => {
  const [criterium, setCriterium] = useState<Criterium>();
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    getCriterium(item.criterium_id).then((result) => {
      setCriterium(result);
    });
  }, [item.criterium_id]);

  return (
    <>
      <div className='criterium-detail'>
        <ResultBubble
          label='criterium results: '
          positive={item.positive}
          negative={item.negative}
          not_decided={item.notDecided}
        />
        <div className='criterium-text'>
          {criterium ? criterium.title : "ERROR: criterium not found"}
        </div>
        {SHOW_AGREEMENT_SCORE && (
          <CountBubble label='Agreement Score' count={item.agreementScore} />
        )}
        <button
          className={`icon-button ${
            showMoreInfo ? "criterium-detail-button-active" : ""
          }`}
          onClick={() => setShowMoreInfo(!showMoreInfo)}
          aria-expanded={showMoreInfo}
          aria-label={`${
            showMoreInfo ? "hide" : "show"
          } details to criterion "${criterium?.title}".`}
        >
          <BsInfoLg title='show details to criterion' />
        </button>
      </div>
      {showMoreInfo && (
        <div className='criterium-more-info'>
          <Alert type='help'>
            <p>
              <strong>How to test & evaluate:</strong> {criterium?.help}
            </p>
            <p>
              <strong>Sources:</strong> Every criterium is based on a{" "}
              <a
                href='https://www.w3.org/WAI/WCAG21/quickref/'
                target='_blank'
                rel='noreferrer'
              >
                WCAG
              </a>{" "}
              criterion or an{" "}
              <a
                href='https://www.w3.org/WAI/ARIA/apg/patterns/'
                target='_blank'
                rel='noreferrer'
              >
                APG pattern
              </a>
              . This criterion is based on the following:
            </p>
            <ul>
              {criterium?.sources?.map((item) => (
                <li key={item}>
                  <a href={item} target='_blank' rel='noreferrer'>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Alert>
        </div>
      )}
    </>
  );
};

export default CriteriumResult;
