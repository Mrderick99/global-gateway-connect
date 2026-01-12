import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Package, Truck, Globe2, Shield, TrendingUp, Users } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Import & Export',
    description: 'Seamless international trade solutions connecting manufacturers with global markets.',
  },
  {
    icon: Truck,
    title: 'Logistics Support',
    description: 'End-to-end logistics management ensuring timely and secure delivery worldwide.',
  },
  {
    icon: Globe2,
    title: 'B2B Trading',
    description: 'Strategic partnerships facilitating bulk transactions between businesses.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Rigorous quality control processes maintaining the highest product standards.',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Data-driven market analysis helping you make informed trading decisions.',
  },
  {
    icon: Users,
    title: 'Bulk Product Sourcing',
    description: 'Access to verified suppliers for large-scale procurement needs.',
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Your Trusted Partner in
            <span className="text-gradient"> Global Trade</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            With years of experience in international B2B trading, Global Input bridges the gap between 
            Chinese manufacturers and Indian businesses, providing comprehensive logistics and trading solutions.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom border glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '500+', label: 'Clients Served' },
            { value: '50K+', label: 'Shipments Delivered' },
            { value: '15+', label: 'Years Experience' },
            { value: '99.5%', label: 'Delivery Success' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1, type: "spring" }}
                className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
