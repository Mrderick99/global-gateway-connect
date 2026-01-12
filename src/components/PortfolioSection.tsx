import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Factory, Cpu, Cog, Boxes, ShoppingBag } from 'lucide-react';

const portfolioItems = [
  {
    icon: Factory,
    title: 'Industrial Goods',
    description: 'Heavy machinery parts, industrial equipment, and manufacturing components.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Cpu,
    title: 'Electronics',
    description: 'Consumer electronics, components, semiconductors, and smart devices.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cog,
    title: 'Machinery',
    description: 'Production machinery, automation equipment, and precision tools.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Boxes,
    title: 'Raw Materials',
    description: 'Metals, plastics, chemicals, and other manufacturing inputs.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: ShoppingBag,
    title: 'Consumer Products',
    description: 'Finished goods, textiles, home appliances, and retail items.',
    color: 'from-rose-500 to-red-500',
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 gradient-dark text-primary-foreground relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 border border-primary/10 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            What We Deal In
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Our Trading
            <span className="text-gradient"> Portfolio</span>
          </h2>
          <p className="text-lg text-primary-foreground/70">
            We specialize in sourcing and trading a diverse range of products, 
            connecting Chinese suppliers with Indian businesses across multiple industries.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl glass-dark overflow-hidden transition-all duration-500 hover:shadow-glow-lg">
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Glow effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold text-primary-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative group"
          >
            <div className="h-full p-8 rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-center hover:border-primary/60 transition-colors duration-300">
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ type: "spring" }}
              >
                <span className="text-3xl text-primary">+</span>
              </motion.div>
              <h3 className="text-lg font-display font-semibold text-primary-foreground mb-2">
                Looking for Something Else?
              </h3>
              <p className="text-primary-foreground/60 text-sm mb-4">
                We can source any product you need
              </p>
              <motion.a
                href="#enquiry"
                className="text-primary font-medium hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                Contact Us →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
