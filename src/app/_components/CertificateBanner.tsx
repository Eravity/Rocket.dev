import Image from "next/image";
import Certificate from "@/app/_images/Certificate.svg";

export default function CertificateBanner() {
  return (
    <div className="flex relative items-center justify-end">
      <Image className="absolute mr-6" src={Certificate} alt="certificate" />

      <div className="overflow-hidden flex items-center h-32 justify-end w-full border-2 rounded-lg">
        <div className="w-full h-full flex flex-col pl-5 justify-center pt-4 absolute">
          <h1 className="font-bold text-lg">Obtain a Career Certificate!</h1>
            <div className="flex flex-col mt-auto pb-6">
            <p className="text-sm">
              Add these credentials to your LinkedIn profile, resume or CV.
            </p>
            <p className="text-sm">
              Highlight your achievements and let others know about your new skills and certifications.
            </p>
            </div>
        </div>
        <div className="w-20 h-full absolute -z-10 bg-neutral-100"></div>
        <div className="h-[220px] w-[400px] bg-neutral-100 -rotate-[135deg] border-t-2 -z-10"></div>
      </div>
    </div>
  );
}
