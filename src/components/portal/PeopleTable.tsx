import { DefaultAvatar } from "@/components/ui/DefaultAvatar";
import type { Teacher } from "@/types";
import { num } from "@/lib/utils";
import { table, tableWrap, td, th } from "./table";

const copy = {
  en: { photo: "Photo", name: "Name", designation: "Designation", subject: "Subject", qualification: "Qualification", joined: "Joined" },
  bn: { photo: "ছবি", name: "নাম", designation: "পদবি", subject: "বিষয়", qualification: "শিক্ষাগত যোগ্যতা", joined: "যোগদান" },
};

/** Teachers or staff as a table: photo, name, designation, subject, qualification, year joined. */
export function PeopleTable({ people, lang, caption }: { people: Teacher[]; lang: "en" | "bn"; caption: string }) {
  const c = copy[lang];
  return (
    <div className={tableWrap} tabIndex={0} role="region" aria-label={caption}>
      <table className={`${table} min-w-[44rem]`}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={th}>{c.photo}</th>
            <th scope="col" className={th}>{c.name}</th>
            <th scope="col" className={th}>{c.designation}</th>
            <th scope="col" className={th}>{c.subject}</th>
            <th scope="col" className={th}>{c.qualification}</th>
            <th scope="col" className={th}>{c.joined}</th>
          </tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.id} className="hover:bg-tint">
              <td className={`${td} w-16`}>
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photo} alt="" className="h-14 w-12 border border-line object-cover object-top" />
                ) : (
                  <DefaultAvatar gender={p.gender} className="h-14 w-12 rounded-none" />
                )}
              </td>
              <th scope="row" className={`${td} font-semibold text-heading`}>{p.name}</th>
              <td className={td}>{p.designation}</td>
              <td className={td}>{p.subjects.join(", ")}</td>
              <td className={td}>{p.qualification}</td>
              <td className={`${td} whitespace-nowrap`}>{p.joined ? num(p.joined, lang) : "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
