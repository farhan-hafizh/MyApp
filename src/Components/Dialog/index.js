import React from "react";

function Dialog({ isOpen, handleClose, children }) {
	return (
		<Dialog onClose={handleClose} open={isOpen}>
			{children}
		</Dialog>
	);
}

export default Dialog;
