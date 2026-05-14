import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { instagramPosts, siteConfig } from '../data/siteData';

export default function InstagramPreview() {
  return (
    <section className="py-24 sm:py-32 section-padding relative overflow-hidden bg-[#FAF7F3]">
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-muted-gold/[0.03] rounded-full blur-[120px]" />

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-[1.5px] bg-muted-gold" />
            <span className="label-sm">Follow Along</span>
            <div className="w-10 h-[1.5px] bg-muted-gold" />
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-espresso">
            <em>{siteConfig.instagram}</em>
          </h2>
          <p className="mt-4 text-[14px] text-warm-gray/60 font-body font-light">
            {siteConfig.instagramFollowers} followers &middot; {siteConfig.instagramPosts} posts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={post.src}
                alt={post.alt}
                className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/30 transition-colors duration-400 flex items-center justify-center">
                <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-body font-medium text-espresso/50 hover:text-muted-gold transition-colors duration-300"
          >
            View on Instagram <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
