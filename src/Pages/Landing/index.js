import React, { useState } from "react";

import Button from "@mui/material/Button";

import styles from "./style.module.scss";
import CustomDialog from "../../Components/CustomDialog";
import DragDropUpload from "../../Components/DragDropUpload";

import style from "./style.module.scss";
import FilePreview from "../../Components/FilePreview";
import { Stack } from "@mui/material";
import arrayHelper from "../../Utils/arrayHelper";
import DialogDeleteFile from "../../Components/CustomDialog/Components/DialogDeleteFile";

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
					{files.length > 0
						? files.map((file, index) => {
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
						  })
						: ""}

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
