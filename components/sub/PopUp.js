import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Confetti from "react-confetti";
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/x'
import 'react-social-icons/discord'

export default function PopUp({ tx }) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-4 ">
                    <video
                      autoPlay
                      muted
                      loop
                      alt="Trainer"
                      src="https://storage.googleapis.com/mintpass/mintpass.mp4"
                      className="h-80 w-full object-cover md:h-full"
                    />

                    <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                      <p className="text-sm text-black font-semibold uppercase tracking-widest">
                        Congratulations!
                      </p>

                      <h2 className="mt-3 text-black uppercase">
                        <span className="text-4xl text-black sm:text-2xl lg:text-5xl">
                          Mint Successful
                        </span>
                      </h2>
                      <a
                        className="button cursor-pointer mt-3 mb-3 inline-block w-full bg-black py-2 text-sm font-bold uppercase tracking-widest text-white"
                        href="https://shorturl.at/kopF7"
                      >
                        
                        Share on 
                        <SocialIcon network="x" style ={{height:35, width:35}}/>
                      </a>
                    
                      <a
                        className="sm:text-large mt-5 underline text-gray-900"
                        href={`https://sepolia.etherscan.io/tx/${tx}`}
                      >
                        View on Etherscan
                      </a>
                    </div>
                    <div className="px-4  sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
            <Confetti />
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
