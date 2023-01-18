import React, { useState } from "react";

import { Button } from "@mui/material";
import { Stack } from "@mui/system";

import CustomDialog from "../../../../Components/CustomDialog";
import DragDropUpload from "../../../../Components/DragDropUpload";
import FilePreview from "../../../../Components/FilePreview";
import arrayHelper from "../../../../Utils/arrayHelper";
import DialogDeleteFile from "../DialogDeleteFile";

import styles from "./style.module.scss";

function DialogUploadFiles({ isDialogOpen, setIsDialogOpen, onSubmit }) {
	const [files, setFiles] = useState([]);
	const [isDeleting, setIsDeleting] = useState(false);
	const [fileIndex, setFileIndex] = useState(null);
	const closeDelete = () => {
		setIsDeleting(false);
	};

	const onClickDeleteFile = (index) => {
		setIsDeleting(true);
		setFileIndex(index);
	};

	const onDeleteFile = () => {
		closeDelete();
		setFiles([...arrayHelper.removeItemByIndex(files, fileIndex)]);
	};

	const onClickSubmit = () => {
		onSubmit(files);
		setFiles([]);
		setIsDialogOpen(false);
	};
	return (
		<>
			{isDeleting && files.length > 0 && (
				<DialogDeleteFile
					isDeleting={isDeleting}
					closeDelete={closeDelete}
					onDeleteFile={onDeleteFile}
					files={files}
					fileIndex={fileIndex}
				/>
			)}
			<CustomDialog
				isOpen={isDialogOpen}
				handleClose={() => setIsDialogOpen(false)}
				isUpload={true}
			>
				<div className={styles.uploadFormContainer}>
					<div>
						<b>Upload a file</b>
					</div>
					<div>
						<p>Attach the file below</p>
						<DragDropUpload
							handleFiles={(items) => {
								setFiles([...files, ...items]);
							}}
						/>
					</div>
					{files.length > 0
						? files.map((file, index) => {
								const ext = file.name.split(".").pop();
								return (
									<FilePreview
										filename={file.name}
										index={index}
										key={index}
										extension={ext}
										deleteOption={true}
										onClickDelete={onClickDeleteFile}
									/>
								);
						  })
						: ""}

					<Stack spacing={2} direction='row' className={styles.buttonContainer}>
						<Button
							onClick={() => setIsDialogOpen(false)}
							variant='outlined'
							style={{ textTransform: "none" }}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							style={{ textTransform: "none" }}
							onClick={onClickSubmit}
						>
							Upload File
						</Button>
					</Stack>
				</div>
			</CustomDialog>
		</>
	);
}

export default DialogUploadFiles;
