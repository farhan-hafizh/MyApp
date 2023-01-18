import React from "react";

import { Dialog, Slide } from "@mui/material";
import CustomDialogTitle from "./Components/DialogTitle";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import style from "./style.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function CustomDialog({
	isOpen,
	isUpload,
	isDelete,
	handleClose,
	fullScreen,
	children,
}) {
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
		<Dialog
			fullScreen={fullScreen}
			variant='outlined'
			open={isOpen}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
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
