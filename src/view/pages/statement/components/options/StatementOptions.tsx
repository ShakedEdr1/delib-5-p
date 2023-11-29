import { FC, useEffect, useState } from "react";

// Third party imports
import { Statement } from "delib-npm";
import { useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../../components/modal/Modal";

// Custom Components
import StatementOptionsNav from "./components/StatementOptionsNav";
import StatementOptionCard from "./components/StatementOptionCard";
import { setStatementOrder } from "../../../../../model/statements/statementsSlice";
import NewSetStatementSimple from "../set/NewStatementSimple";

// Utils & Constants

// Redux Store
import { useAppDispatch } from "../../../../../functions/hooks/reduxHooks";
import { sortSubStatements } from "./statementOptionsCont";
import ScreenFadeInOut from "../../../../components/animation/ScreenFadeInOut";
import { isOptionFn } from "../../../../../functions/general/helpers";

interface Props {
    statement: Statement;
    subStatements: Statement[];
    handleShowTalker: Function;
    showNav?: boolean;
}

const StatementOptions: FC<Props> = ({
    statement,
    subStatements,
    handleShowTalker,
}) => {
    try {
        const dispatch = useAppDispatch();
        const { sort } = useParams();

        const [showModal, setShowModal] = useState(false);

        const __substatements = subStatements.filter(
            (subStatement: Statement) => isOptionFn(subStatement)
        );

        const _subStatements = sortSubStatements(__substatements, sort);

        function dispatchCB(statement: Statement, order: number) {
            dispatch(
                setStatementOrder({
                    statementId: statement.statementId,
                    order: order,
                })
            );
        }

        useEffect(() => {
            _subStatements.forEach((statement: Statement, i: number) => {
                dispatchCB(statement, i);
            });
        }, [sort]);

        let topSum = 50;
        let tops: number[] = [topSum];

        return (
            <ScreenFadeInOut className="page__main">
                <div className="wrapper">
                    {_subStatements?.map(
                        (statementSub: Statement, i: number) => {
                            //get the top of the element
                            if (statementSub.elementHight) {
                                topSum += statementSub.elementHight + 10;
                                tops.push(topSum);
                            }

                            return (
                                <StatementOptionCard
                                    key={statementSub.statementId}
                                    statement={statementSub}
                                    showImage={handleShowTalker}
                                    top={tops[i]}
                                />
                            );
                        }
                    )}
                </div>
                <div
                    className="page__main__bottom"
                    style={{ marginBottom: "5vh" }}
                >
                    <StatementOptionsNav statement={statement} />
                </div>
                {/* <Fav onclick={handleAddStatment} /> */}
                {showModal && (
                    <Modal>
                        <NewSetStatementSimple
                            parentStatement={statement}
                            isOption={true}
                            setShowModal={setShowModal}
                        />
                    </Modal>
                )}
                <div
                    className="fav fav--fixed"
                    onClick={() => setShowModal(true)}
                >
                    <div>
                        <AddIcon
                            style={{
                                transform: `translate(0px,-40%) scale(1.45)`,
                            }}
                        />
                    </div>
                </div>
            </ScreenFadeInOut>
        );
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default StatementOptions;
