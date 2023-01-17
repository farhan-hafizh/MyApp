import React, { useState } from "react";

import Dialog from "../../Components/Dialog";
import Button from "@mui/material/Button";

import styles from "./style.module.scss";

function Landing() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const onClickClose = () => {
		setIsDialogOpen(false);
	};
	return (
		<div className={styles.container}>
			<Button variant='contained' onClick={() => setIsDialogOpen(true)}>
				Upload File
			</Button>
			<Dialog isOpen={isDialogOpen} handleClose={onClickClose}>
				<div>sdfsdfsf</div>
			</Dialog>
		</div>
	);
}

export default Landing;
