import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShopAdvert = () => {
  const [modal, setModal] = useState(false);
  //bg-[#CAC5A3]
  return (
    <section className="w-full bg-yellow-300  p-3 text-center">
      <span className="font-bold">Do you know? </span> You can own an online
      store customized for your product? &nbsp;
      <span
        onClick={() => {
          setModal(true);
        }}
        className="underline font-bold cursor-help"
      >
        learn more...
      </span>{" "}
      <Modal
        show={modal}
        size="md"
        popup={true}
        onClose={() => {
          setModal(false);
        }}
      >
        <Modal.Header>
          <span className="font-bold px-3">Terms of Service</span>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 text-justify">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="mx-auto">
            <Button
              onClick={() => {
                setModal(false);
              }}
            >
              Done &nbsp;
              <FontAwesomeIcon
                icon={faFaceSmile}
                className="my-auto text-lg text-yellow-300"
              />{" "}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ShopAdvert;
