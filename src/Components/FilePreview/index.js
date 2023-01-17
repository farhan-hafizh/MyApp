import { IconButton } from "@mui/material";
import React from "react";

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
	return (
		<div className={isDeleting ? style.containerRed : style.container}>
			<div className={style.icon}>
				<FileIcon extension={extension} {...defaultStyles[extension]} />
			</div>
			<div className={style.fileinfo}>
				<div className={onlyPreview ? style.filenamePreview : ""}>
					{file.name}
				</div>
				{!onlyPreview && <CustomLinearProgress value={100} />}
			</div>
			{!onlyPreview && (
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
