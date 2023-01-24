import React, { useEffect, useState } from "react";

import { IconButton } from "@mui/material";
import { FileIcon, defaultStyles } from "react-file-icon";
import CustomLinearProgress from "./components/CustomLinearProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import style from "./style.module.scss";

function FilePreview({
	filename,
	extension,
	index,
	uploadedAt,
	file,
	isDeleting,
	onlyPreview,
	deleteOption,
	onClickDelete,
}) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!onlyPreview) {
			const timer = setInterval(() => {
				setProgress((prevProgress) => {
					if (prevProgress >= 100) {
						clearInterval(timer);
						return 100;
					}
					return prevProgress + 25;
				});
			}, 800);
			return () => {
				clearInterval(timer);
			};
		}
	}, [file]);

	return (
		<div className={isDeleting ? style.containerRed : style.container}>
			<div className={style.icon}>
				<FileIcon extension={extension} {...defaultStyles[extension]} />
			</div>
			<div className={style.fileinfo}>
				{uploadedAt && <div>{uploadedAt}</div>}
				<div className={onlyPreview ? style.filenamePreview : ""}>
					{filename}
				</div>
				{!onlyPreview && <CustomLinearProgress value={progress} />}
			</div>
			{(deleteOption && progress === 100) || (deleteOption && onlyPreview) ? (
				<div>
					<IconButton
						className={style.iconDelete}
						onClick={() => onClickDelete(index)}
					>
						<HighlightOffIcon />
					</IconButton>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default FilePreview;
