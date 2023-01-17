import React from "react";

import { Dialog } from "@mui/material";
import CustomDialogTitle from "./Components/DialogTitle";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import style from "./style.module.scss";

function CustomDialog({ isOpen, isUpload, isDelete, handleClose, children }) {
	const getTitleDialogChildren = () => {
		if (isUpload)
			return (
				<DriveFolderUploadOutlinedIcon
					sx={{
						margin: 0,
					}}
					className={style.headerIconBlue}
				/>
			);
		if (isDelete)
			return (
				<DeleteIcon
					sx={{
						margin: 0,
					}}
					className={style.headerIconRed}
				/>
			);
	};

	return (
		<Dialog variant='outlined' onClose={handleClose} open={isOpen}>
			<div className={style.container}>
				<CustomDialogTitle handleClose={handleClose}>
					{getTitleDialogChildren()}
				</CustomDialogTitle>
				{children}
			</div>
		</Dialog>
	);
}

export default CustomDialog;
