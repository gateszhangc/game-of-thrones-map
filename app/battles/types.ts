// Battle data type definition
export interface Battle {
  name: string;          // Battle name
  year: string;          // Year or period (e.g., "298 AC" or "War of Five Kings")
  location: string;      // Battle location
  participants: string;  // Main participants (e.g., "Stark vs Lannister")
  outcome: string;       // Battle outcome/victor
  icon: string;          // Battle icon (emoji)
  description: string;   // Description of battle significance
}
