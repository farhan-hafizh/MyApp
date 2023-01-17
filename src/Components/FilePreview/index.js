import React, { useEffect, useState } from "react";

import { IconButton } from "@mui/material";
import { FileIcon, defaultStyles } from "react-file-icon";
import CustomLinearProgress from "./components/CustomLinearProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import style from "./style.module.scss";

function FilePreview({
	file,
	extension,
	onClickDelete,
	isDeleting,
	onlyPreview,
	index,
}) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress >= 100) {
					clearInterval(timer);
					return 100;
				}
				return prevProgress + 10;
			});
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className={isDeleting ? style.containerRed : style.container}>
			<div className={style.icon}>
				<FileIcon extension={extension} {...defaultStyles[extension]} />
			</div>
			<div className={style.fileinfo}>
				<div className={onlyPreview ? style.filenamePreview : ""}>
					{file.name}
				</div>
				{!onlyPreview && <CustomLinearProgress value={progress} />}
			</div>
			{!onlyPreview && progress === 100 && (
				<div>
					<IconButton
						className={style.iconDelete}
						onClick={() => onClickDelete(index)}
					>
						<HighlightOffIcon />
					</IconButton>
				</div>
			)}
		</div>
	);
}

export default FilePreview;
