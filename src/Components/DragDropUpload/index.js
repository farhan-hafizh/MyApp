import React, { useRef, useState } from "react";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import style from "./style.module.scss";

function DragDropUpload({ handleFiles }) {
	const [isDrag, setIsDrag] = useState(false);

	const inputRef = useRef(null);

	// handle drag events
	const handleDrag = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setIsDrag(true);
		} else if (e.type === "dragleave") {
			setIsDrag(false);
		}
	};

	// triggers when file is dropped
	const handleDrop = function (e) {
		e.preventDefault();
		e.stopPropagation();
		setIsDrag(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFiles(e.dataTransfer.files);
		}
	};

	// triggers when file is selected with click
	const handleChange = function (e) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			handleFiles(e.target.files);
		}
	};

	// triggers the input when the button is clicked
	const onButtonClick = () => {
		inputRef.current.click();
	};

	return (
		<form
			id='form-file-upload'
			onDragEnter={handleDrag}
			onDragLeave={handleDrag}
			onDragExit={handleDrag}
			onDragOver={handleDrag}
			onDrop={handleDrop}
			onSubmit={(e) => e.preventDefault()}
			className={style.formFileUpload}
		>
			<input
				ref={inputRef}
				type='file'
				id='input-file-upload'
				style={{ display: "none" }}
				multiple={true}
				onChange={handleChange}
			/>
			<label
				id='label-file-upload'
				htmlFor='input-file-upload'
				className={`${style.labelFileUpload} ${isDrag ? style.dragActive : ""}`}
			>
				<div className={style.containerUpload}>
					<FileUploadOutlinedIcon className={style.uploadIcon} />
					<p>Drag files here to upload</p>
					<div>
						<p className={style.altText}>
							Alternatively, you can select file by
						</p>
						<button className={style.uploadButton} onClick={onButtonClick}>
							Click here
						</button>
					</div>
				</div>
			</label>
		</form>
	);
}

export default DragDropUpload;
