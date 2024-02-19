import { useState } from "react";

// Custom components

// Third party imports
import { Statement, ResultsBy } from "delib-npm";
import RadioCheckedIcon from "../../../../../components/icons/RadioCheckedIcon";
import RedioUncheckedIcon from "../../../../../components/icons/RedioUncheckedIcon";
import { useLanguage } from "../../../../../../functions/hooks/useLanguages";

export default function DisplayResultsBy({
    statement,
}: {
    statement: Statement | undefined;
}) {
    const { languageData } = useLanguage();

    const resultsBy = () => {
        if (!statement) return ResultsBy.topOptions;

        return statement.resultsSettings?.resultsBy || ResultsBy.topOptions;
    };

    const [resultsByVoting, setResultsByVoting] = useState(
        resultsBy() === ResultsBy.topVote,
    );

    return (
        <section className="settings__resultsBy">
            <h3 className="settings__resultsBy__title">
                {languageData["Results By"]}
            </h3>
            <div
                className="settings__resultsBy__radioBox"
                onClick={() => setResultsByVoting(false)}
            >
                {!resultsByVoting ? (
                    <RadioCheckedIcon />
                ) : (
                    <RedioUncheckedIcon />
                )}
                <input
                    type="radio"
                    name="resultsBy"
                    id="favoriteOption"
                    checked={!resultsByVoting}
                    value={ResultsBy.topOptions}
                    onChange={(e) => console.log(e)}
                />
                <label htmlFor="favoriteOption">
                    {languageData["Favorite Option"]}
                </label>
            </div>
            <div
                className="settings__resultsBy__radioBox"
                onClick={() => setResultsByVoting(true)}
            >
                {resultsByVoting ? (
                    <RadioCheckedIcon />
                ) : (
                    <RedioUncheckedIcon />
                )}
                <input
                    type="radio"
                    name="resultsBy"
                    id="votingResults"
                    checked={resultsByVoting}
                    value={ResultsBy.topVote}
                    onChange={(e) => console.log(e)}
                />
                <label htmlFor="votingResults">
                    {languageData["Voting Results"]}
                </label>
            </div>
        </section>
    );
}
