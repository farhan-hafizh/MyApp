import React from "react";

import { Button, Stack } from "@mui/material";
import FilePreview from "../../../../Components/FilePreview";
import CustomDialog from "../../../../Components/CustomDialog";

import style from "./style.module.scss";

function DialogDeleteFile({ isDeleting, closeDelete, onDeleteFile, file }) {
	return (
		<CustomDialog isOpen={isDeleting} handleClose={closeDelete} isDelete={true}>
			<div>
				<div>
					<b>Permanently delete file.</b>
					<FilePreview
						filename={file.name}
						extension={file?.name.split(".").pop()}
						onlyPreview={true}
						isDeleting={true}
					/>
					<div className={style.question}>
						Are you sure you want to permanently delete this file?
					</div>
					<div className={style.warning}>This action cannot be undone.</div>
					<Stack spacing={2} direction='row' className={style.buttonContainer}>
						<Button
							onClick={() => closeDelete()}
							variant='outlined'
							style={{ textTransform: "none" }}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							color='error'
							style={{ textTransform: "none" }}
							onClick={() => onDeleteFile()}
						>
							Delete file
						</Button>
					</Stack>
				</div>
			</div>
		</CustomDialog>
	);
}

export default DialogDeleteFile;
