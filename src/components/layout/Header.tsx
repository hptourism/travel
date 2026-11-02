import { HeaderNav } from "@/components/layout/HeaderNav";
import { site } from "@/lib/site";
import { container } from "@/lib/styles";

type HeaderProps = {
  fleetStand?: string;
  officeShort?: string;
  shortName?: string;
  name?: string;
};

export function Header({
  fleetStand = site.fleetStand,
  officeShort = site.officeShort,
  shortName = site.shortName || "HP Tourism",
  name = site.name || "Himalayan Travels",
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-40">
      <div className="bg-pine text-[12px] text-white/80">
        <div
          className={`${container} flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between`}
        >
          {fleetStand ? <p>Taxi fleet stand: {fleetStand}</p> : null}
          {officeShort ? <p>Corporate office: {officeShort}</p> : null}
        </div>
      </div>
      <HeaderNav shortName={shortName} name={name} />
    </div>
  );
}
