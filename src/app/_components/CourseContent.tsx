import { ReactNode } from "react";
import Clock from "./Icons/Clock";
import Points from "./Icons/Points";
import Language from "./Icons/Language";
import Certificate from "./Icons/Certificate";
import Calendar from "./Icons/Calendar";
import Image from "next/image";
import picture from "@/app/images/1.jpg"

const ContentRow = ({ icon, title }: { icon: ReactNode; title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8">{icon}</div>
      <h1>{title}</h1>
    </div>
  );
};

export default function CourseContent() {
  return (
    <aside className="w-3/12 h-fit border-2 flex flex-col gap-4 rounded-lg p-5">
      <h1 className="font-bold text-lg">Course Content</h1>
      <div className="flex flex-col font-semibold text-neutral-600 gap-2">
        <ContentRow
          icon={<Clock width={25} height={25} color="black" stroke={1.5} />}
          title={`${3} Hours Estimation`}
        />
        <ContentRow
          icon={<Points color="black" width={25} />}
          title={`${100} Points`}
        />
        <ContentRow icon={<Language width={30} />} title="English" />
        <ContentRow
          icon={<Certificate stroke={1.5} color="black" width={30} />}
          title="Certificate of completion"
        />
        <ContentRow
          icon={<Calendar width={25} height={25} stroke={1.5} />}
          title="No due date for this content"
        />
      </div>
      <h1 className="font-bold text-lg mt-5">Trainer</h1>
      <div className="flex gap-3">
        <div className="flex items-center bg-cover width-[75px] height-[75px] overflow-hidden">
          <Image className="bg-cover rounded-full" src={picture} alt="" width={75} height={75} />
        </div>
        <div>
          <h1 className="font-semibold">Cristian Cebotari</h1>
          <p className="text-sm">
            Front-End Developer and Founder of Rocket.dev
          </p>
          <h1></h1>
        </div>
      </div>
    </aside>
  );
}
