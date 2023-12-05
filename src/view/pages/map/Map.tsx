import React from "react";

// Third party libraries
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { logOut } from "../../../functions/db/auth";
import { t } from "i18next";

// Custom components
import ScreenSlide from "../../components/animation/ScreenSlide";

// Hooks
import useSortStatements from "../../../functions/hooks/useSortStatements";

export default function Map() {
    const navigate = useNavigate();
    const { statementId } = useParams();

    const results = useSortStatements();

    return statementId ? (
        <Outlet />
    ) : (
        <ScreenSlide className="page" toSubStatement={true}>
            <div className="page__header">
                <div className="page__header__title">
                    <h1>{t("Delib 5")}</h1>
                    <b>-</b>
                    <h2>{t("Creating Agreements")}</h2>
                </div>
                <div className="btns">
                    <button onClick={() => logOut()}>{t("Disconnect")}</button>
                    <button onClick={() => navigate("/home")}>
                        {t("Home")}
                    </button>
                </div>
            </div>
            <div className="page__main">
                <div className="wrapper">
                    {results.map((result, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                navigate(`/map/${result.top.statementId}`, {
                                    state: result,
                                })
                            }
                        >
                            {result.top.statement}
                        </button>
                    ))}
                </div>
            </div>
        </ScreenSlide>
    );
}
