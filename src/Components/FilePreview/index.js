import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { IconButton } from "@mui/material";
import { FileIcon, defaultStyles } from "react-file-icon";
import CustomLinearProgress from "./components/CustomLinearProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import style from "./style.module.scss";
import { getLinkAction } from "../../Pages/Landing/action";
import uploadHelper from "../../Utils/uploadHelper";

function FilePreview({
	filename,
	extension,
	onClickDelete,
	isDeleting,
	onlyPreview,
	index,
	deleteOption,
	uploadedAt,
	file,
}) {
	const dispatch = useDispatch();
	const [progress, setProgress] = useState(0);

	const cbSuccess = async (link) => {
		setProgress(20);
		await uploadHelper.fileUploadS3(link, file);
		setProgress(100);
	};

	useEffect(() => {
		if (!onlyPreview) {
			dispatch(getLinkAction({ filename, extension }, cbSuccess));
		}
	}, []);

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
