import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { ProjectFormData } from '@/types/project';

interface ProjectSuccessProps {
  formData: ProjectFormData;
  onReset: () => void;
}

export function ProjectSuccess({ formData, onReset }: ProjectSuccessProps) {
  React.useEffect(() => {
    // Trigger confetti animation on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8 animate-bounce">
          <CheckCircle className="w-24 h-24 mx-auto text-green-400" />
        </div>

        <h2 className="text-4xl font-bold mb-6">
          Merci, {formData.name} !
        </h2>

        <p className="text-xl text-gray-300 mb-8">
          Votre demande de projet a été reçue. Nous vous contacterons bientôt à l'adresse
          <span className="text-white font-semibold"> {formData.email} </span>
          pour discuter des détails.
        </p>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-semibold mb-4">Récapitulatif</h3>
          <div className="space-y-4 text-left">
            <p><strong>Timeline :</strong> {formData.timeline}</p>
            <p><strong>Option de paiement :</strong> {formData.paymentOption}</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}