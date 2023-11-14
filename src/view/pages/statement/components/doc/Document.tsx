import { useState, FC, useEffect } from "react"

// Third party imports
import { Results, ResultsBy, Statement } from "delib-npm"

// Styles
import styles from "./Document.module.scss"

import { updateResultsSettings } from "../../../../../functions/db/results/setResults"

// Helpers

// db functions

// Custom Components
import Slider from "@mui/material/Slider"
import ResultsComp from "./results/Results"
import ScreenSlide from "../ScreenSlide"
import { getResults } from "./helpers/getResults"

interface Props {
    statement: Statement
    subStatements: Statement[]
}

const Document: FC<Props> = ({ statement, subStatements }) => {
    const [resultsBy, setResultsBy] = useState<ResultsBy>(
        statement.results?.resultsBy || ResultsBy.topOptions
    )
    const [numberOfResults, setNumberOfResults] = useState<number>(
        statement.results?.numberOfResults || 2
    )
    const [results, setResults] = useState<Results>({ top: statement })

    useEffect(() => {
        if (!subStatements) return
        ;(async () => {
            const _results = await getResults(
                statement,
                subStatements,
                resultsBy,
                numberOfResults
            )

            setResults(_results)
        })()
    }, [subStatements])

    async function handleGetResults(ev: any) {
        try {
            //get form data with formData
            ev.preventDefault()

            const data = new FormData(ev.target)
            const _resultsBy = data.get("results") as ResultsBy
            console.log(_resultsBy)
            const numberOfResults = Number(data.get("numberOfResults"))

            setResultsBy(_resultsBy)

            updateResultsSettings(
                statement.statementId,
                _resultsBy,
                numberOfResults
            )

            const _results = await getResults(
                statement,
                subStatements,
                _resultsBy,
                numberOfResults
            )
            // setResults(top);

            setResults(_results)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ScreenSlide>
            <div className="wrapper">
                <section className={styles.resultsWrapper}>
                    <h2>תוצאות הדיון</h2>
                    <form onSubmit={handleGetResults}>
                        <div className={styles.inputWrapper}>
                            <div>
                                <label htmlFor="resultsId">
                                    הצגת תוצאות לפי
                                </label>
                                <select
                                    name="results"
                                    defaultValue={resultsBy}
                                    id="resultsId"
                                    onChange={(ev: any) =>
                                        setResultsBy(ev.target.value)
                                    }
                                >
                                    <option value={ResultsBy.topOptions}>
                                        אופציות מקסימליות
                                    </option>
                                    <option value={ResultsBy.topVote}>
                                        הצבעות
                                    </option>
                                </select>
                            </div>
                            {resultsBy === ResultsBy.topOptions && (
                                <div>
                                    <label htmlFor="numberOfResults">
                                        כמות פתרונות בכל רמה: {numberOfResults}
                                    </label>
                                    <Slider
                                        defaultValue={numberOfResults || 2}
                                        min={1}
                                        max={10}
                                        aria-label="Default"
                                        valueLabelDisplay="on"
                                        name="numberOfResults"
                                        id="numberOfResults"
                                        onChange={(ev: any) =>
                                            setNumberOfResults(
                                                Number(ev.target.value)
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <div className="btns">
                            <button type="submit">הצגת תוצאות</button>
                        </div>
                    </form>
                    {results.sub ? (
                        <ResultsComp results={results} />
                    ) : (
                        <h2>לא נבחרו עדיין אפשרויות</h2>
                    )}
                </section>
            </div>
        </ScreenSlide>
    )
}

export default Document
