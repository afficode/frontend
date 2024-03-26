import React from 'react';
import { EditPencil } from '../../../assets/svgs';

const GrabSettings = () => {
	return (
		<section>
			<div className="flex justify-between py-2 border-b border-black/30">
				<h3>Grab Account settings</h3>
			</div>

			<div className="bg-gray-300 p-6 my-6 space-y-12">
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update email</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update Password</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update Social handle / Accounts</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update Phone Number</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update Location</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default GrabSettings;
