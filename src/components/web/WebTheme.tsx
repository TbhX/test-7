import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Hero } from './sections/Hero';
import { SingleOffer } from './sections/SingleOffer';
import { SimpleProjectForm } from '../project/SimpleProjectForm';
import { ProjectSuccess } from '../project/ProjectSuccess';
import { FAQ } from './sections/FAQ';
import { TermsOfService } from './sections/terms/TermsOfService';
import type { ProjectFormData } from '@/types/project';

interface WebThemeProps {
  showTerms: boolean;
  onCloseTerms: () => void;
}

export function WebTheme({ showTerms, onCloseTerms }: WebThemeProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    email: '',
    paymentOption: 'full'
  });

  const handleStepComplete = (data: ProjectFormData) => {
    setFormData(data);
    setStep(prev => prev + 1);
  };

  const goHome = () => {
    setStep(0);
    setFormData({
      name: '',
      email: '',
      paymentOption: 'full'
    });
  };

  const startProject = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        <div key={`${step}-${showTerms}`}>
          {showTerms ? (
            <TermsOfService onClose={onCloseTerms} />
          ) : (
            <>
              {step === 0 && (
                <>
                  <Hero onStart={startProject} />
                  <SingleOffer onStartProject={startProject} />
                  <FAQ />
                </>
              )}
              {step === 1 && (
                <div className="min-h-screen flex items-center justify-center p-4">
                  <SimpleProjectForm onSubmit={handleStepComplete} />
                </div>
              )}
              {step === 2 && (
                <ProjectSuccess formData={formData} onReset={goHome} />
              )}
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}