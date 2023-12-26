import { Statement, StatementType } from "delib-npm";
import { FC, useState } from "react";
import MassQuestionCard from "./components/massQuestion/MassQuestionCard";
import styles from "./MassQuestions.module.scss";

interface Props {
    statement: Statement;
    subStatements: Statement[];
}

const MassQuestions: FC<Props> = ({ statement, subStatements }) => {
  

    const [showThankYou, setShowThankYou] = useState<boolean>(false);
    const [answerd, setAnswerd] = useState<boolean[]>([]);
 
   const questions = subStatements.filter(
    (sub) => sub.statementType === StatementType.question
);
   

    return (
        <div className="page__main">
            <div className="wrapper">
                {!showThankYou ? (
                    <>
                        <h2>Questions</h2>

                        {questions.map((question, index:number) => (
                            <MassQuestionCard
                                key={question.statementId}
                                statement={question}
                                index={index}
                                setAnswerd={setAnswerd}
                            />
                        ))}
                        <div className="btns">
                            {answerd.filter(a=>a).length === questions.length && <div
                                className="btn"
                                onClick={() => setShowThankYou(true)}
                            >
                                <span>שליחה</span>
                            </div>}
                        </div>
                    </>
                ) : (
                    <div className={styles.thankyou}>
                        <h2>תודה על התשובות</h2>
                        <div
                            className="btn"
                            onClick={() => setShowThankYou(false)}
                        >
                            <span>עריכה חדשה</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MassQuestions;