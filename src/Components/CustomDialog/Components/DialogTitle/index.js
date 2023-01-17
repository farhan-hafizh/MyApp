import React from "react";

import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DialogTitle } from "@mui/material";

import style from "./style.module.scss";

function CustomDialogTitle({ handleClose, children }) {
	return (
		<DialogTitle className={style.dialogTitle}>
			{children}
			<IconButton
				sx={{
					position: "absolute",
					right: 25,
					top: 25,
					color: (theme) => theme.palette.grey[500],
				}}
				onClick={handleClose}
			>
				<HighlightOffIcon />
			</IconButton>
		</DialogTitle>
	);
}

export default CustomDialogTitle;
