import React from "react";
// import AMRAP from './AMRAP';
import FORTIME from './FORTIME';
// import EMOM from './EMOM';
// import TABATA from './TABATA';
// import MIX from './MIX';


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			{/* <AMRAP /> */}
			{/* <EMOM /> */}
			{/* <TABATA />
			<MIX /> */}
			<FORTIME />
		</div>
	);
};

export default Home;
