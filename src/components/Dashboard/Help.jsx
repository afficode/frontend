import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="flex flex-col mt-5 divide-gray-300  items-start justify-start w-full md:w-[70%] mx-auto">
      <h1 className="text-4xl tracking-wide font-bold my-3 p-2">Help</h1>
      <hr className="bg-gray-500 mx-auto w-full my-2" />
      <p className="my-4 text-justify text-lg leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        placeat a odio porro officia tempora enim totam, vel omnis in
        reprehenderit est adipisci blanditiis harum eum debitis quo temporibus
        tenetur. Assumenda veniam illo, optio vitae sit qui maxime officia.
        Sapiente dolore in molestiae repellat nulla cum vel, recusandae rem
        dolor corporis consequatur et distinctio illo, pariatur iste.
        Voluptates, esse assumenda. Porro nostrum eos sunt amet incidunt aut
        possimus voluptas quo, officia nemo aliquid mollitia, ratione quia
        consequatur, fuga nam. Corporis eos soluta ad ab molestiae rerum
        aspernatur, odit vitae architecto. Culpa optio praesentium ea voluptas
        explicabo eos officiis ratione fugiat ut reiciendis, dolore obcaecati
        placeat, pariatur quidem quisquam enim aperiam laudantium? Aspernatur
        suscipit error eaque sit vero porro repudiandae quam. Placeat suscipit
        facilis sapiente culpa illo? Recusandae ex quidem ipsa vero distinctio
        officiis voluptatum rem voluptatibus! Eum, consectetur a eos eligendi,
        dolorum doloremque odio rerum omnis sint enim quasi ut! Dolore obcaecati
        omnis ea iusto perspiciatis voluptas vel voluptatum asperiores vitae
        adipisci voluptatem excepturi quae maxime, temporibus eos? Sequi ducimus
        maiores vitae suscipit corrupti saepe alias hic fugit magni temporibus.
        Ipsam dicta vitae beatae unde commodi voluptatum praesentium laborum
        ipsum?
        <br />
        Ipsam dicta vitae beatae unde commodi voluptatum praesentium laborum{" "}
        <Link to={"/"}>
          <span className="text-blue-500 font-bold">Isowo.ng blog</span>
        </Link>
      </p>
    </div>
  );
};

export default Help;
