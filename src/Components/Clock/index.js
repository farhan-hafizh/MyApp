import React, { useEffect, useState } from "react";

import timeHelper from "../../Utils/timeHelper";

function Clock() {
	const [time, setTime] = useState(timeHelper.getCurrentFormattedTime());

	const refreshClock = () => {
		setTime(timeHelper.getCurrentFormattedTime());
	};

	useEffect(() => {
		const timer = setInterval(refreshClock, 1000);
		return () => {
			clearInterval(timer);
		};
	});

	return <div>{time}</div>;
}

export default Clock;
