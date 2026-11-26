export interface CAItem {
  id: string;
  date: string;
  category: string;
  headline: string;
  detail: string;
  exam: string[];
}

export const currentAffairs: CAItem[] = [
  { id: "ca-1", date: "2024-11-25", category: "Defence", headline: "INS Nirdeshak commissioned into Indian Navy", detail: "INS Nirdeshak, the second vessel of the Survey Vessel (Large) project, was commissioned into the Indian Navy at Visakhapatnam, enhancing hydrographic survey capabilities.", exam: ["CDS", "AFCAT"] },
  { id: "ca-2", date: "2024-11-20", category: "International Relations", headline: "India and France sign deal for 26 Rafale Marine jets", detail: "India and France signed a government-to-government deal for 26 Rafale Marine aircraft for the Indian Navy, strengthening bilateral defence cooperation.", exam: ["CDS", "AFCAT"] },
  { id: "ca-3", date: "2024-11-18", category: "Government Schemes", headline: "PM announces expansion of Agniveer Scheme", detail: "The government announced revisions to the Agnipath Scheme including enhanced benefits and lateral entry options for Agniveers into central paramilitary forces.", exam: ["CDS"] },
  { id: "ca-4", date: "2024-11-15", category: "Defence Exercises", headline: "Exercise Tasman Saber 2024 concludes", detail: "The bilateral military exercise between India and Australia, Tasman Saber 2024, concluded successfully with joint operational training in maritime security.", exam: ["CDS", "AFCAT"] },
  { id: "ca-5", date: "2024-11-10", category: "Space Technology", headline: "ISRO successfully tests cryogenic engine for GSLV Mk III", detail: "ISRO conducted a successful hot test of the CE-20 cryogenic engine at the ISRO Propulsion Complex, Mahendragiri, clearing the path for future Chandrayaan missions.", exam: ["AFCAT"] },
  { id: "ca-6", date: "2024-11-05", category: "Appointments", headline: "New Chief of Naval Staff appointed", detail: "Vice Admiral Dinesh Kumar Tripathi was promoted to the rank of Admiral and assumed charge as the 26th Chief of Naval Staff of the Indian Navy.", exam: ["CDS", "AFCAT"] },
  { id: "ca-7", date: "2024-10-28", category: "Military Operations", headline: "Operation Sindoor: IAF strikes terror camps", detail: "The Indian Air Force conducted precision strikes on terror infrastructure across the border in a swift 23-minute operation, demonstrating the IAF's reach and accuracy.", exam: ["CDS", "AFCAT"] },
  { id: "ca-8", date: "2024-10-20", category: "Important Dates", headline: "Dussehra celebrated with 'Shastra Puja' by Armed Forces", detail: "The Indian Army, Navy and Air Force observed Dussehra by performing the traditional 'Shastra Puja' (worship of weapons), marking the significance of the festival for warrior traditions.", exam: ["CDS", "AFCAT"] },
  { id: "ca-9", date: "2024-10-15", category: "Defence Exercises", headline: "INDRA 2024: India-Russia joint exercise begins", detail: "INDRA 2024, the annual India-Russia joint military exercise, commenced at the Pune Military Station, focusing on counter-terrorism operations in a UN mandate scenario.", exam: ["CDS"] },
  { id: "ca-10", date: "2024-10-08", category: "Awards", headline: "Param Vir Chakra awardees honoured", detail: "In a special ceremony, next-of-kin of Param Vir Chakra awardees were hosted by the President of India at Rashtrapati Bhavan in a tribute to India's highest military honour recipients.", exam: ["CDS", "AFCAT"] },
];

export const defenceExercises = [
  { name: "Tasman Saber", countries: "India-Australia", type: "Army", year: 2024 },
  { name: "INDRA", countries: "India-Russia", type: "Army", year: 2024 },
  { name: "Shakti", countries: "India-France", type: "Army", year: 2024 },
  { name: "Mitra Shakti", countries: "India-Sri Lanka", type: "Army", year: 2024 },
  { name: "Surya Kiran", countries: "India-Nepal", type: "Army", year: 2024 },
  { name: "Garuda", countries: "India-France", type: "Air Force", year: 2024 },
  { name: "Cope India", countries: "India-USA", type: "Air Force", year: 2024 },
  { name: "Vajra Prahar", countries: "India-USA", type: "Special Forces", year: 2024 },
  { name: "Malabar", countries: "India-USA-Japan", type: "Navy", year: 2024 },
  { name: "Tasman Saber", countries: "India-Australia-USA", type: "Navy", year: 2024 },
];
