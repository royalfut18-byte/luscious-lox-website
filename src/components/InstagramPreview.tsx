import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { siteConfig, instagramPosts } from '../data/siteData';

export default function InstagramPreview() {
  return (
    <section className="section-gap section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-rose-tint/20 to-cream pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header — left-aligned editorial */}
        <motion.div
          className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Instagram size={16} className="text-muted-gold" />
              <span className="label-sm">{siteConfig.instagram}</span>
            </div>
            <h2 className="font-heading text-hero font-light text-espresso">
              Follow the <span className="italic">Transformations</span>
            </h2>
            <p className="mt-4 text-[15px] text-warm-gray font-body">
              {siteConfig.instagramFollowers} followers · {siteConfig.instagramPosts} posts of real client results
            </p>
          </div>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex btn-secondary"
          >
            <Instagram size={15} />
            Follow on Instagram
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Instagram grid — REPLACE: Add real Instagram post image URLs to instagramPosts in siteData.ts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group aspect-square rounded-2xl bg-gradient-to-br from-champagne/50 via-warm-beige/30 to-rose-tint/40 border border-champagne/20 overflow-hidden relative shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[10px] text-espresso/15 font-body">{post.placeholder}</span>
              </div>
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-all duration-500 flex items-center justify-center">
                <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          className="lg:hidden text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Instagram size={15} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
