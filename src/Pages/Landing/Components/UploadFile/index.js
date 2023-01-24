import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getLinkAction, submitFileAction } from "../../action";

import { Button, List } from "@mui/material";
import { Stack } from "@mui/system";

import DragDropUpload from "../../../../Components/DragDropUpload";
import FilePreview from "../../../../Components/FilePreview";
import arrayHelper from "../../../../Utils/arrayHelper";
import DialogDeleteFile from "../DialogDeleteFile";

import styles from "./style.module.scss";
import uploadHelper from "../../../../Utils/uploadHelper";

function UploadFiles({ onSubmit }) {
	const dispatch = useDispatch();

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
		let data = [];
		let link;
		const submit = new Promise((resolve, reject) => {
			files.map((file, index) => {
				const ext = file.name.split(".").pop();
				dispatch(
					getLinkAction(file.name, ext, (url) => {
						uploadHelper.fileUploadS3(url, file.buffer);
						link = url.split("?")[0];
						const uploaded = {
							name: file.name,
							extension: ext,
							link,
						};
						console.log(uploaded);
						console.log(data);
						data.push(uploaded);
						console.log(data);
						if (index === files.length - 1) resolve();
					})
				);
			});
		});
		submit.then(() => {
			dispatch(submitFileAction(data));
			setFiles([]);
			onSubmit(data);
		});
	};

	const onClickCancel = () => {
		setFiles([]);
	};

	return (
		<>
			{isDeleting && files.length > 0 && (
				<DialogDeleteFile
					isDeleting={isDeleting}
					closeDelete={closeDelete}
					onDeleteFile={onDeleteFile}
					file={files[fileIndex]}
				/>
			)}
			<div className={styles.uploadFormContainer}>
				<div>
					<b>Upload a file</b>
				</div>
				<div>
					<p>Attach the file below</p>
					<DragDropUpload
						handleFiles={async (items) => {
							const newFiles = await uploadHelper.handleUploadFile(items);
							setFiles([...files, ...newFiles]);
						}}
					/>
				</div>
				{files.length > 0 ? (
					<>
						<div className={styles.listContainer}>
							<List className={styles.fileList} style={{ overflow: "auto" }}>
								{files.map((file, index) => {
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
								})}
							</List>
						</div>
						<Stack
							spacing={2}
							direction='row'
							className={styles.buttonContainer}
						>
							<Button
								onClick={onClickCancel}
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
					</>
				) : (
					""
				)}
			</div>
		</>
	);
}

export default UploadFiles;
