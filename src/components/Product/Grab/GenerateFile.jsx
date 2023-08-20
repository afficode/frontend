import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  FaShareSquare,
  FaFileDownload,
  FaFilePdf,
  FaImage,
} from "react-icons/fa";
import { Tooltip } from "flowbite-react";
import jsPDF from "jspdf";

export default function GenerateFile({ screenshot }) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const download = () => {
    const download = document.getElementById("download");
    const img = screenshot.replace("image/png", "image/octet-stream");
    download.setAttribute("href", img);
  };

  const exportPDF = () => {
    const imgWidth = 208;
    const imgHeight = (500 * imgWidth) / 700;
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(screenshot, "PNG", "0", "0", imgWidth, imgHeight);
    pdf.save("advert.pdf");
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-blue-600"
      >
        <Tooltip content="Download Ad as Picture or PDF">
          <FaFileDownload />
        </Tooltip>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <a id="download" download={"advert.png"}>
                      <button
                        type="button"
                        onClick={download}
                        className="bg-blue-700 rounded-md text-white font-mavin  my-2 p-2"
                      >
                        <FaImage className="text-center" />
                      </button>
                    </a>
                    <button
                      className="bg-red-700 text-white font-nunito p-2 rounded-md mx-4"
                      onClick={exportPDF}
                    >
                      <FaFilePdf />
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div id="viewCanvas" className="p-8 mt-3">
                      <img src={screenshot} alt="" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
