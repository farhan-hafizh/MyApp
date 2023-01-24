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
	isDeleting,
	onlyPreview,
	deleteOption,
	onClickDelete,
	fileLink,
}) {
	const [progress, setProgress] = useState(0);

	const getProgress = (prev) => {
		const plus = Math.floor(Math.random() * 60) + 25;
		if (prev + plus >= 100) return 100;
		return prev + plus;
	};
	useEffect(() => {
		if (!onlyPreview) {
			const timer = setInterval(() => {
				setProgress((prevProgress) => {
					if (prevProgress >= 100) {
						clearInterval(timer);
						return 100;
					}
					return getProgress(prevProgress);
				});
			}, 800);
			return () => {
				clearInterval(timer);
			};
		}
	}, []);
	const getContainerClass = () => {
		if (isDeleting) return style.containerRed;
		if (onlyPreview) return style.container;
		return style.containerUpload;
	};

	const onClickContainer = () => {
		if (onlyPreview) window.location.replace(fileLink);
	};

	return (
		<div className={getContainerClass()}>
			<div className={style.clickAble} onClick={onClickContainer}>
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
