import { Car, Spa, SportCar } from '../../assets/images';
import { Card } from '../../components';
import { ScrollToTop } from '../../utils';

const AboutUs = () => {
	return (
		<section className="w-full mb-12 ">
			<div className="bg-blue py-12 px-4 sm:px-[4rem] m-2 rounded-md">
				<h1 className="text-center text-white">About Us</h1>
			</div>

			{/* our story */}
			<div className={`${sectionStyles} flex flex-col gap-4`}>
				<h3 className="text-blue">Our Story</h3>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ratione alias quis doloremque
					laboriosam excepturi distinctio iusto esse deserunt nemo, tempore quasi ab totam ut earum
					assumenda, ex accusantium facere! Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Amet, itaque! Consectetur expedita culpa totam aspernatur. Lorem ipsum dolor, sit amet
					consectetur adipisicing elit. Natus quo soluta corporis ipsum, a cupiditate ipsam quod
					aspernatur ullam minima unde, tempore mollitia veniam ab.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ratione alias quis doloremque
					laboriosam excepturi distinctio iusto esse deserunt nemo, tempore quasi ab totam ut earum
					assumenda, ex accusantium facere! Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Amet, itaque! Consectetur expedita culpa totam aspernatur.
				</p>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ratione alias quis doloremque
					laboriosam excepturi distinctio iusto esse deserunt nemo, tempore quasi ab totam ut earum
					assumenda, ex accusantium facere! Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Amet, itaque! Consectetur expedita culpa totam aspernatur.
				</p>
			</div>

			<div
				className={`${sectionStyles} flex justify-between gap-6 max-md:flex-col max-md:items-center`}
			>
				<Card title={'Advertise with us'} img={Car} />
				<Card title={'Join us'} img={Spa} />
				<Card title={'Press'} img={SportCar} />
			</div>

			{/* our vision and misson */}
			<div className={`${sectionStyles} flex flex-col gap-4`}>
				<h3 className="text-blue">Our Vision & Mission</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus in quaerat nobis magnam
					veritatis. Voluptas?
				</p>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequatur, non debitis
					obcaecati et, reiciendis, laboriosam ut odit aliquam repellat repudiandae corporis ipsum.
					obcaecati et, reiciendis, laboriosam ut odit aliquam repellat repudiandae corporis ipsum.
					obcaecati et, reiciendis, laboriosam ut odit aliquam repellat repudiandae corporis ipsum.
				</p>

				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, deleniti aperiam non
					expedita accusantium tempora sit quod possimus quos.
				</p>
			</div>

			{/* our platform */}
			<div className={`${sectionStyles} flex flex-col gap-8`}>
				<h3 className="text-center text-blue">Our Platform</h3>

				<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
					<div className="px-8 py-8 border-r border-black/30">
						<span className="block text-4xl font-semibold text-blue">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 max-md:border-r max-md:border-black/30 lg:border-r lg:border-black/30">
						<span className="block text-4xl font-semibold text-blue">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 border-r border-black/30">
						<span className="block text-4xl font-semibold text-blue">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 max-md:border-r max-md:border-black/30">
						<span className="block text-4xl font-semibold text-blue">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 border-r border-black/30">
						<span className="block text-4xl font-semibold text-blue">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 max-md:border-r max-md:border-black/30 lg:border-r lg:border-black/30">
						<span className="block text-4xl font-semibold text-blue">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 border-r border-black/30">
						<span className="block text-4xl font-semibold text-blue">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 max-md:border-r max-md:border-black/30">
						<span className="block text-4xl font-semibold text-blue">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
				</div>

				<div className="text-center">
					<p className="font-thin">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, perspiciatis! Sapiente
						dolorem libero dicta sint ut fugit odio vero quod.
					</p>

					<button className="my-4 capitalize btn rounded-3xl border-black/30 hover:bg-blue hover:text-white">
						Advertise with us
					</button>
				</div>
			</div>

			{/* why choose us */}
			<div className={`${sectionStyles} flex flex-col gap-4`}>
				<h3 className="text-blue">Why choose us?</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam eum recusandae tenetur
					adipisci quibusdam architecto cupiditate at et quae laborum quod eaque earum delectus
					distinctio facilis, deleniti nisi atque nihil iste voluptatum alias repellendus ut ea! Debitis,
					nulla nesciunt quos provident repellendus nisi facilis libero deleniti quis excepturi minima.
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quasi repellendus! At
					voluptatum qui est! Nostrum eveniet velit eligendi consequuntur.
				</p>
			</div>

			<ScrollToTop />
		</section>
	);
};

export default AboutUs;

const sectionStyles = 'px-[4rem] py-8 max-sm:px-4';
