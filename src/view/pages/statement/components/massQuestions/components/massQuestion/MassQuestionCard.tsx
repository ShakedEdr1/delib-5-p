import { Statement } from "delib-npm";
import { FC, useEffect, useState } from "react";
import styles from "./MassQuestion.module.scss";
import { handleSetQuestionFromMassCard } from "./MassQuestionCardCont";
import { listenToUserAnswer } from "../../../../../../../functions/db/statements/getStatement";

interface Props {
    statement: Statement;
    setAnswerd: Function;
    index: number;
}

const MassQuestionCard: FC<Props> = ({ statement, setAnswerd, index }) => {
    const [answer, setAnswer] = useState<Statement | null>(null);
    useEffect(() => {
        setAnswerd((answerd: boolean[]) => {
            const _answerd = [...answerd];
            _answerd[index] = answer ? true : false;
            return _answerd;
        });
    }, [answer]);

    useEffect(() => {
        let usub: Function = () => {};
        listenToUserAnswer(statement.statementId, setAnswer).then(
            (uns: Function) => {
                usub = uns;
            }
        );
        return () => {
            usub();
        };
    }, []);

    return (
        <div className={styles.card}>
            <p>{statement.statement}</p>
            <textarea
                onBlur={(ev: any) => {
                    handleSetQuestionFromMassCard({
                        question: statement,
                        answer,
                        text: ev.target.value,
                    });
                }}
                onKeyUp={(ev: any) => {
                    if (ev.key === "Enter" && !ev.shiftKey) {
                        handleSetQuestionFromMassCard({
                            question: statement,
                            answer,
                            text: ev.target.value,
                        });
                    }
                }}
                className={styles.answer}
                placeholder="תשובה"
                defaultValue={answer?.statement}
                name="answer"
                id="answer"
            />
        </div>
    );
};

export default MassQuestionCard;