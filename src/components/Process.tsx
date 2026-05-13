import { motion } from 'framer-motion';
import { processSteps, siteConfig } from '../data/siteData';

export default function Process() {
  return (
    <section className="section-gap section-padding">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="label-sm mb-5 block">How It Works</span>
          <h2 className="font-heading text-hero font-light text-espresso">
            Your <span className="italic">Journey</span>
          </h2>
          <p className="mt-6 section-intro mx-auto">
            From consultation to aftercare, we guide you through every step of your transformation.
          </p>
        </motion.div>

        {/* Steps — timeline layout */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-champagne via-muted-gold/30 to-champagne hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                className="relative flex gap-6 sm:gap-10 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {/* Number circle */}
                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-champagne shadow-card flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-xl sm:text-2xl text-muted-gold italic">{step.step}</span>
                </div>

                {/* Content */}
                <div className="pt-1 sm:pt-3 pb-2">
                  <h4 className="font-heading text-2xl sm:text-[1.7rem] text-espresso mb-2">{step.title}</h4>
                  <p className="text-[14px] sm:text-[15px] text-warm-gray font-body leading-relaxed max-w-md">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a href={siteConfig.bookingUrl} className="btn-primary">
            Start Your Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
}
