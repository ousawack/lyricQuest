// import { useRouter } from "next/router";

// const navLinks = [
//   {
//     name: "Home",
//     path: "/",
//   },
// ];

// export default function Header() {
//   const router = useRouter();
//   const path = router.asPath;

//   return (
//     <p className="absolute top-0 flex w-full gap-2 p-6 py-4 font-sans text-sm text-orange-300 md:w-2/3 md:p-4 lg:w-1/2">
//       {navLinks.map((link, index) => {
//         if (link.path === path) {
//           return (
//             <a
//               key={index}
//               href={link.path}
//               className="rounded-md border border-zinc-600 bg-zinc-800/60 p-2 font-semibold text-orange-200 duration-200"
//             >
//               {link.name}
//             </a>
//           );
//         } else {
//           return (
//             <a
//               key={index}
//               href={link.path}
//               className="rounded-md p-2 duration-200 hover:bg-zinc-800/60"
//             >
//               {link.name}
//             </a>
//           );
//         }
//       })}
//     </p>
//   );
// }
