import React from 'react';
import { HelpCircle } from 'lucide-react';
import { FAQItem } from './faq/FAQItem';

const faqs = [
  {
    question: "Qu'est-ce qui est inclus dans le package à 1000€ ?",
    answer: "Tout ce dont vous avez besoin pour une présence web professionnelle : design personnalisé, développement, mise en page responsive, tableau de bord client, partage de fichiers sécurisé et support post-lancement."
  },
  {
    question: "Comment fonctionne le tableau de bord du projet ?",
    answer: "Après avoir soumis votre demande de projet, vous recevrez un code d'accès unique par email. Ce code vous permet d'accéder à votre tableau de bord personnel pour suivre l'avancement, partager des fichiers et communiquer directement."
  },
  {
    question: "Quelle est la durée du processus de développement ?",
    answer: "La durée varie selon la complexité du projet. Vous pouvez choisir votre calendrier préféré lors de la demande : urgent (< 1 mois), normal (1-2 mois), détendu (2-3 mois), ou flexible."
  },
  {
    question: "Que se passe-t-il après avoir soumis ma demande de projet ?",
    answer: "Vous recevrez immédiatement une confirmation par email avec votre code d'accès au tableau de bord. Nous examinerons votre demande et commencerons le développement selon le calendrier spécifié."
  },
  {
    question: "Proposez-vous un support post-lancement ?",
    answer: "Oui, la maintenance et le support de base sont inclus dans le package à 1000€. Nous nous assurons que votre site web reste sécurisé et fonctionnel après le lancement."
  }
];

export function FAQ() {
  return (
    <section className="py-16 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-400">
            Réponses rapides aux questions courantes sur nos services de développement web
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}