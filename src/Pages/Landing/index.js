import React, { useState } from "react";

import Button from "@mui/material/Button";

import styles from "./style.module.scss";
import CustomDialog from "../../Components/CustomDialog";
import DragDropUpload from "../../Components/DragDropUpload";

import style from "./style.module.scss";
import FilePreview from "../../Components/FilePreview";
import { Stack } from "@mui/material";
import arrayHelper from "../../Utils/arrayHelper";

function Landing() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [fileIndex, setFileIndex] = useState(null);
	const [files, setFiles] = useState([]);

	const closeDelete = () => {
		setIsDeleting(false);
		// setIsDialogOpen(true);
	};

	const onClickDeleteFile = (index) => {
		setIsDeleting(true);
		// setIsDialogOpen(false);
		setFileIndex(index);
	};

	const onDeleteFile = () => {
		closeDelete();
		setFiles([...arrayHelper.removeItemByIndex(files, fileIndex)]);
	};

	return (
		<div className={styles.container}>
			<Button variant='contained' onClick={() => setIsDialogOpen(true)}>
				Upload File
			</Button>
			<CustomDialog
				isOpen={isDeleting}
				handleClose={closeDelete}
				isDelete={true}
			>
				<div>
					<div>
						<b>Permanently delete file.</b>
						<FilePreview
							file={files[fileIndex]}
							extension={files[fileIndex]?.name.split(".").pop()}
							onlyPreview={true}
						/>
						<div className={style.question}>
							Are you sure you want to permanently delete this file?
						</div>
						<div className={style.warning}>
							<b>This action cannot be undone.</b>
						</div>
						<Stack
							spacing={2}
							direction='row'
							className={style.buttonContainer}
						>
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
			<CustomDialog
				isOpen={isDialogOpen}
				handleClose={() => setIsDialogOpen(false)}
				isUpload={true}
			>
				<div className={style.uploadFormContainer}>
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
					{files.length > 0 &&
						files.map((file, index) => {
							console.log(file);
							const ext = file.name.split(".").pop();
							return (
								<FilePreview
									file={file}
									index={index}
									key={index}
									extension={ext}
									onClickDelete={onClickDeleteFile}
								/>
							);
						})}

					<Stack spacing={2} direction='row' className={style.buttonContainer}>
						<Button
							onClick={() => setIsDialogOpen(false)}
							variant='outlined'
							style={{ textTransform: "none" }}
						>
							Cancel
						</Button>
						<Button variant='contained' style={{ textTransform: "none" }}>
							Upload File
						</Button>
					</Stack>
				</div>
			</CustomDialog>
		</div>
	);
}

export default Landing;
