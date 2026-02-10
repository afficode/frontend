import { Link } from 'react-router-dom';
import { DashboardHeader } from '../../../components';

const Help = () => {
    return (
        <div>
            <DashboardHeader />

            {/* Help container */}
            <div className="flex flex-col my-8 md:px-2 lg:px-4">
                <div className="flex justify-between border-b border-black/30">
                    <h4>Help</h4>
                </div>

                <div className="py-4 space-y-4">
                    <p className="p-lg">
						We are poised to ensuring you get the best of experiences in your buying and selling on our
						platform. When there is (are) challenge(s) or questions that need answering or addressing, we
						are going to be here for switch resolution of all complaints and issues. On our help desk, you
						can learn how to navigate this site for optimum result, such as read through our safety
						guides, find information on our policies, or contact our customer support team.
                    </p>{' '}
                    <p className="p-lg">
						For optimum experience on our platform, kindly see our blogs, articles, tips and more on{' '}
                        <Link to={'/'} className="text-primary">
							Boonfu.com blog
                        </Link>{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Help;
