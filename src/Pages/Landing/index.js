import React, { useState } from "react";

import Button from "@mui/material/Button";

import DialogUploadFiles from "./Components/DialogUploadFile";

import styles from "./style.module.scss";

function Landing() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<div className={styles.container}>
			<Button variant='contained' onClick={() => setIsDialogOpen(true)}>
				Upload File
			</Button>

			<DialogUploadFiles
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
			/>
		</div>
	);
}

export default Landing;
