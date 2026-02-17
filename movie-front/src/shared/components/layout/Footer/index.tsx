// Pied de page global inspiré du screen fourni.
// Utilise lucide-react pour les icônes sociales.

import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr,1fr,1fr,1fr]">
          {/* Colonne logo + réseaux sociaux */}
          <div className="flex flex-col gap-6">
            {/* Logo approximatif, carré ~40x40px */}
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300">
              <span className="text-lg font-semibold text-gray-800">F</span>
            </div>

            {/* Icônes sociales alignées horizontalement (taille ~24px) */}
            <div className="flex items-center gap-4 text-gray-700">
              <Twitter className="h-5 w-5" aria-label="Twitter / X" />
              <Instagram className="h-5 w-5" aria-label="Instagram" />
              <Youtube className="h-5 w-5" aria-label="YouTube" />
              <Linkedin className="h-5 w-5" aria-label="LinkedIn" />
            </div>
          </div>

          {/* Colonne Use cases */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-semibold text-gray-900">Use cases</h3>
            <ul className="space-y-1.5 text-gray-700">
              <li>UI design</li>
              <li>UX design</li>
              <li>Wireframing</li>
              <li>Diagramming</li>
              <li>Brainstorming</li>
              <li>Online whiteboard</li>
              <li>Team collaboration</li>
            </ul>
          </div>

          {/* Colonne Explore */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-semibold text-gray-900">Explore</h3>
            <ul className="space-y-1.5 text-gray-700">
              <li>Design</li>
              <li>Prototyping</li>
              <li>Development features</li>
              <li>Design systems</li>
              <li>Collaboration features</li>
              <li>Design process</li>
              <li>FigJam</li>
            </ul>
          </div>

          {/* Colonne Resources */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="space-y-1.5 text-gray-700">
              <li>Blog</li>
              <li>Best practices</li>
              <li>Colors</li>
              <li>Color wheel</li>
              <li>Support</li>
              <li>Developers</li>
              <li>Resource library</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};