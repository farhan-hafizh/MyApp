import React, { useState } from "react";

import Button from "@mui/material/Button";

import DialogUploadFiles from "./Components/DialogUploadFile";

import styles from "./style.module.scss";
import FilePreview from "../../Components/FilePreview";
import timeHelper from "../../Utils/timeHelper";
import Clock from "../../Components/Clock";
import uploadHelper from "../../Utils/uploadHelper";

//mock
const mock = [
	{
		id: 0,
		name: "file1.pdf",
		extension: "pdf",
		uploadedAt: Date.now(),
	},
	{
		id: 1,
		name: "file2.jpeg",
		extension: "jpeg",
		uploadedAt: Date.now(),
	},
	{
		id: 2,
		name: "file3.pptx",
		extension: "pptx",
		uploadedAt: Date.now(),
	},
	{
		id: 3,
		name: "file4.docx",
		extension: "docx",
		uploadedAt: Date.now(),
	},
	{
		id: 4,
		name: "file5.xlsx",
		extension: "xlsx",
		uploadedAt: Date.now(),
	},
	{
		id: 5,
		name: "file6.xls",
		extension: "xls",
		uploadedAt: Date.now(),
	},
];

function Landing() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [data, setData] = useState(mock);

	const handleSubmit = (files) => {
		const newData = uploadHelper.fileUploadNoApi(files, data.length - 1);
		setData([...data, ...newData]);
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
			<div className={styles.uploadedFile}>
				{data.map((data, index) => (
					<FilePreview
						filename={data.name}
						extension={data.extension}
						onlyPreview={true}
						deleteOption={true}
						uploadedAt={timeHelper.getTimeFromNow(data.uploadedAt)}
						index={data.id}
						key={index}
					/>
				))}
			</div>
			<DialogUploadFiles
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}

export default Landing;
