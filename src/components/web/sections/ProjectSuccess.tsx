import React, { useState, useEffect } from 'react';
import { CheckCircle, Mail, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { handleProjectSubmission } from '@/utils/project/submission';
import type { ProjectFormData } from '@/types/project';

interface ProjectSuccessProps {
  formData: ProjectFormData;
  onReset: () => void;
}

export function ProjectSuccess({ formData, onReset }: ProjectSuccessProps) {
  const [accessCode, setAccessCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSuccess = async () => {
      try {
        const result = await handleProjectSubmission(formData);
        
        if (result.success) {
          setAccessCode(result.accessCode);
          setIsEmailSent(result.emailSent);
          
          // Trigger confetti animation
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          setError(result.error || 'Une erreur est survenue');
        }
      } catch (err) {
        setError('Une erreur est survenue. Veuillez contacter le support.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeSuccess();
  }, [formData]);

  const copyAccessCode = () => {
    navigator.clipboard.writeText(accessCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

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
          Votre demande de projet a été reçue. Vérifiez votre email
          <span className="text-white font-semibold"> ({formData.email}) </span>
          pour obtenir votre code d'accès au tableau de bord.
        </p>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-semibold mb-4">Votre Code d'Accès</h3>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <code className="px-4 py-2 bg-black/30 rounded-lg text-xl font-mono">
              {accessCode}
            </code>
            <button
              onClick={copyAccessCode}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Copier le code d'accès"
            >
              {isCopied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-300">
            <Mail className="w-6 h-6" />
            <span>
              {isEmailSent ? 'Code d\'accès envoyé par email' : error || 'Envoi du code d\'accès...'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-400">
            Vous n'avez pas reçu l'email ? Vérifiez vos spams ou contactez{' '}
            <a 
              href="mailto:support@tamsir.fr"
              className="text-indigo-400 hover:text-indigo-300"
            >
              support@tamsir.fr
            </a>
          </p>
          
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}