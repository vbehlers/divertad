import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const T = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

  const cards = [
    {
      href: '/pages/about.html',
      title: 'About AVHS',
      desc: 'Learn more about our school and programs.'
    },
    {
      href: '/pages/academics.html',
      title: 'Academics',
      desc: 'Explore courses, departments, and resources.'
    },
    {
      href: 'https://powerschool.avhsd.org/public/',
      title: 'PowerSchool',
      desc: 'Check grades, attendance, and more.',
      external: true,
    }
  ];

  return (
    <motion.div className="w-full" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={T}>
      <section className="mx-auto max-w-[1100px] px-4 md:px-6 lg:px-8 py-10">
        <motion.div layout transition={T} className="mb-6">
          <motion.h1 layout className="text-3xl md:text-4xl font-semibold text-[#0051d2]" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={T}>
            Welcome to AVHS
          </motion.h1>
          <motion.p className="mt-3 text-gray-700 text-base md:text-lg" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ ...T, delay: 0.05 }}>
            A React “island” powering a richer homepage — using your Tailwind styles.
          </motion.p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {cards.map((c, i) => (
              <motion.a
                key={c.title}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener' : undefined}
                className="block rounded-lg border border-gray-200 p-5 hover:border-[#0051d2] transition-colors bg-white/80"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ ...T, delay: 0.05 * i }}
                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="text-lg font-medium text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  );
}
