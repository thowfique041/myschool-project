import type { ImageAsset } from "@/types";

/**
 * Central image registry. All photos are free-to-use images from Unsplash
 * (Unsplash License — https://unsplash.com/license). They are representative
 * photographs from Bangladesh and India; none of them shows Webnion School &
 * College, which is fictional. Every component reads images from this file,
 * so swapping in the institution's own photos only means editing entries here.
 */
const unsplash = (
  id: string,
  alt: string,
  credit: { page: string; author?: string; location?: string },
  ratio: [number, number] = [3, 2],
): ImageAsset => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=75`,
  alt,
  width: 1600,
  height: Math.round((1600 * ratio[1]) / ratio[0]),
  credit: { ...credit, page: `https://unsplash.com/photos/${credit.page}` },
});

export const images = {
  /** Supplied by the site owner. */
  heroCampus: {
    src: "/images/hero-campus.jpg",
    alt: "A tall cream and green academic building behind a row of palm trees",
    width: 571,
    height: 350,
  },
  campus: unsplash(
    "photo-1726390414421-37a9efdf13ee",
    "A large white college building behind a green lawn and trees in Sylhet",
    { page: "5dPiNXAEW-U", author: "Sheikh Abir Ali", location: "MC College, Sylhet, Bangladesh" },
  ),
  classroom: unsplash(
    "photo-1709290749293-c6152a187b14",
    "A classroom full of students sitting at their desks",
    { page: "I4lLt9g8i3k", author: "CIMT Hooghly", location: "Chinsurah, West Bengal, India" },
  ),
  primaryClass: unsplash(
    "photo-1692269725836-fbd72e98883f",
    "A group of young children in school uniform sitting in a classroom",
    { page: "nFx5TuNxz64", author: "Swastik Arora" },
  ),
  scienceLab: unsplash(
    "photo-1758685734030-a31d96462eec",
    "A teacher and a student conducting a science experiment in a classroom",
    { page: "UStQpco0TWo" },
  ),
  computerLab: unsplash(
    "photo-1719159381981-1327b22aff9b",
    "Students working at desktop computers in a bright school computer lab",
    { page: "LKySOH0mr38", author: "Haseeb Modi", location: "Chennai, India" },
  ),
  library: unsplash(
    "photo-1721702754494-fdd7189f946c",
    "A large library with long shelves filled with books",
    { page: "r0U2y0HhdGE" },
  ),
  sports: unsplash(
    "photo-1565787112882-4e7d9d29269c",
    "Young people playing cricket in an open field during the day",
    { page: "q_4Z54xyUFI" },
  ),
  football: unsplash(
    "photo-1565787154274-c8d076ad34e7",
    "Young people playing a game in an open field",
    { page: "DvreeyPXQww" },
  ),
  students: unsplash(
    "photo-1524069290683-0457abfe42c3",
    "A group of school children posing together for a photograph",
    { page: "j9jZSqfH5YI" },
  ),
  studentAnswering: unsplash(
    "photo-1572847748080-bac263fae977",
    "A girl in school uniform standing to answer in class while her classmates look on",
    { page: "nWpTGnP_jWE", author: "Raj Rana", location: "Alibag, India" },
  ),
  deskStudy: unsplash(
    "photo-1692269725911-87697c558be1",
    "Two young girls studying together at a classroom desk",
    { page: "TcKmus54ij0", author: "Swastik Arora" },
  ),
  bookStudy: unsplash(
    "photo-1692269725827-699e04a11cdf",
    "Two young boys sitting at a desk reading a book",
    { page: "xMYq46yAetM", author: "Swastik Arora" },
  ),
  groupWork: unsplash(
    "photo-1692269725976-2bebd4622fd4",
    "A group of children working together at a table",
    { page: "geAqYpYbK80", author: "Swastik Arora" },
  ),
  admission: unsplash(
    "photo-1760821668304-4ec106518e30",
    "Two young children in school uniforms standing outdoors",
    { page: "7VUWlLy_-9A", author: "Anees Ur Rehman" },
  ),
  scienceFair: unsplash(
    "photo-1758685733987-54952cd1c8c6",
    "A teacher showing a young student a science experiment in a lab",
    { page: "2tudsaEBXgw" },
  ),
  flag: unsplash(
    "photo-1723056416947-4ca0f01c229a",
    "A person holding the green and red flag of Bangladesh",
    { page: "4Mmh94qB0do" },
  ),
  speaker: unsplash(
    "photo-1551731409-43eb3e517a1a",
    "A young woman speaking into a microphone",
    { page: "w1s5H_3Zn48" },
  ),
  teaGarden: unsplash(
    "photo-1742106852724-0faf505b7797",
    "Rolling hills covered with green tea plantations",
    { page: "vbTM-A1Q5j4" },
  ),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
