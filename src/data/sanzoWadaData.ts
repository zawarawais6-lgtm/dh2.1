export interface SanzoWadaPalette {
  id: number;
  name: string;
  colors: string[];
}

export interface CyberPalette {
  name: string;
  colors: string[];
}

export const SANZO_WADA_PALETTES: SanzoWadaPalette[] = [
  {
    id: 1,
    name: 'Sumi Soot & Gold Leaf',
    colors: ['#121316', '#2A2D34', '#D4AF37', '#E8A13A', '#F7F4EB']
  },
  {
    id: 2,
    name: 'Asagi Celadon & Indigo',
    colors: ['#0F171E', '#1F3A4B', '#4EAE8D', '#9CD9C2', '#E8F5F1']
  },
  {
    id: 3,
    name: 'Beni Lacquer & Vermilion',
    colors: ['#181014', '#38161D', '#E63946', '#F4A261', '#FDF0ED']
  },
  {
    id: 4,
    name: 'Kariyasu Ochre & Tea',
    colors: ['#1A1713', '#3B3326', '#C89D42', '#E5C07B', '#F8F5EE']
  },
  {
    id: 5,
    name: 'Kurotsurubami Slate Soot',
    colors: ['#14171A', '#262D35', '#6C7A89', '#95A5A6', '#ECEFF1']
  },
  {
    id: 6,
    name: 'Rikyucha Wasabi & Moss',
    colors: ['#131913', '#2D3A2C', '#588157', '#A3B18A', '#DAD7CD']
  },
  {
    id: 7,
    name: 'Ebi-iro Wild Grape Plum',
    colors: ['#19121E', '#3A2445', '#7B2CBF', '#C77DFF', '#F3E8FF']
  },
  {
    id: 8,
    name: 'Akane Madder Root Dusk',
    colors: ['#1A1315', '#3C1B23', '#9D0208', '#D00000', '#FCEADE']
  },
  {
    id: 9,
    name: 'Toki Pink & Charcoal',
    colors: ['#15171C', '#282E3A', '#EE969A', '#F6C1C4', '#FDF2F4']
  },
  {
    id: 10,
    name: 'Shinbashi Cyan River',
    colors: ['#0D1920', '#183848', '#00A896', '#028090', '#F0FDF4']
  }
];

export const FUTURISTIC_CYBER_PALETTES: CyberPalette[] = [
  {
    name: 'Cyberpunk Neon 2077',
    colors: ['#0B0E14', '#05070B', '#F1F5F9', '#00E5FF', '#FF007F', '#1F0B18']
  },
  {
    name: 'Synthwave Sunset Overdrive',
    colors: ['#13091F', '#090410', '#FDE047', '#FF7A00', '#F43F5E', '#25081A']
  },
  {
    name: 'Matrix Digital Phosphor',
    colors: ['#061008', '#020603', '#E6FFE6', '#00FF66', '#00E5FF', '#081C0D']
  },
  {
    name: 'Deep Oceanic Obsidian',
    colors: ['#080E18', '#03060A', '#E0F2FE', '#38BDF8', '#818CF8', '#0D1B2A']
  },
  {
    name: 'Solarized Aerospace Monolith',
    colors: ['#12161A', '#0A0C0E', '#F8FAFC', '#F59E0B', '#EF4444', '#1F1410']
  }
];
