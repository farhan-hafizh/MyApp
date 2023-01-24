import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFiles } from "./selector";

import { Button, Divider, List, Paper } from "@mui/material";

import UploadFiles from "./Components/UploadFile";
import FilePreview from "../../Components/FilePreview";
import Clock from "../../Components/Clock";
import uploadHelper from "../../Utils/uploadHelper";
import DialogDeleteFile from "./Components/DialogDeleteFile";
import CustomDialog from "../../Components/CustomDialog";

import timeHelper from "../../Utils/timeHelper";
import arrayHelper from "../../Utils/arrayHelper";

import styles from "./style.module.scss";
import { getAllFilesAction } from "./action";

function Landing({ files }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [data, setData] = useState([]);
	const [isDeleting, setIsDeleting] = useState(false);
	const [deletingFile, setDeletingFile] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllFilesAction());
		setData(files);
	}, [files?.length, data?.length]);

	const handleSubmit = (files) => {
		const newData = uploadHelper.fileUploadNoApi(files, data.length - 1);
		setData([...data, ...newData]);
	};

	const handleDelete = () => {
		setIsDeleting(false);
		setData([...arrayHelper.removeItemById(data, deletingFile.id)]);
	};

	return (
		<div className={styles.container}>
			<div className={styles.containerTop}>
				<Clock />
				<Button
					className={styles.btnUpload}
					variant='contained'
					onClick={() => setIsDialogOpen(true)}
				>
					Upload File
				</Button>
			</div>
			<div className={styles.contentContainer}>
				<Paper className={styles.uploadedContainer}>
					<List className={styles.uploadedFile} style={{ overflow: "auto" }}>
						{data &&
							data.length > 0 &&
							data.map((file, index) => (
								<FilePreview
									filename={file.name}
									extension={file.extension}
									onlyPreview={true}
									deleteOption={true}
									uploadedAt={timeHelper.getTimeFromNow(file.uploadedAt)}
									index={file.id}
									fileLink={file.link}
									key={index}
									onClickDelete={() => {
										setDeletingFile(file);
										setIsDeleting(true);
									}}
								/>
							))}
					</List>
				</Paper>
				<Divider className={styles.divider} orientation='vertical' flexItem />
				<div className={styles.uploadForm}>
					<UploadFiles onSubmit={handleSubmit} />
				</div>
			</div>
			{isDeleting && data.length > 0 && (
				<DialogDeleteFile
					isDeleting={isDeleting}
					closeDelete={() => setIsDeleting(false)}
					onDeleteFile={handleDelete}
					file={deletingFile}
				/>
			)}
			<CustomDialog
				isOpen={isDialogOpen}
				handleClose={() => setIsDialogOpen(false)}
				isUpload={true}
				fullScreen={true}
			>
				<UploadFiles onSubmit={handleSubmit} />
			</CustomDialog>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	files: selectFiles,
});

export default connect(mapStateToProps)(Landing);
