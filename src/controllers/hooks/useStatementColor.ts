import { StatementType } from "delib-npm";
import { useEffect, useState } from "react";

export interface StyleProps {
	backgroundColor: string;
	color: string;
}


export default function useStatementColor(statementType?: StatementType): StyleProps {
	const initStyle = {
		backgroundColor: "transparent",
		color: "transparent",
	};
	const [style, setstyle] = useState(initStyle);

	try {



	

		useEffect(() => {
			switch (statementType) {
				case StatementType.question:
					setstyle({
						backgroundColor: "var(--question-header)",
						color: "var(--white)",
					});
					break;
				case StatementType.option:
					setstyle({
						backgroundColor: "var(--option)",
						color: "var(--header)",
					});
					break;
				case StatementType.result:
					setstyle({
						backgroundColor: "var(--agree)",
						color: "var(--white)",
					});
					break;
				default:
					setstyle(initStyle);
					break;
			}
		}, [statementType]);

		return style;
	} catch (error) {
		console.error(error);
		return style;
	}
}
