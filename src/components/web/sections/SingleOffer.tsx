import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const features = [
  "Développement & Design Web Personnalisé",
  "Mise en Page Responsive Mobile-First",
  "Tableau de Bord Personnel",
  "Système de Partage de Fichiers Sécurisé",
  "Mises à Jour en Temps Réel",
  "Canal de Communication Direct",
  "Support & Maintenance Post-lancement",
  "Optimisation SEO",
  "Optimisation des Performances",
  "Sécurisation Renforcée"
];

interface SingleOfferProps {
  onStartProject: () => void;
}

export function SingleOffer({ onStartProject }: SingleOfferProps) {
  const handleCtaClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onStartProject();
  };

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Rest of the component remains the same */}
    </section>
  );
}