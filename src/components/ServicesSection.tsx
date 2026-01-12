import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Ship, Plane, Truck, Warehouse, FileCheck, Clock } from 'lucide-react';

const services = [
  {
    icon: Ship,
    title: 'Sea Freight',
    description: 'Cost-effective ocean shipping for bulk cargo between Chinese and Indian ports.',
    features: ['Full Container Load (FCL)', 'Less Container Load (LCL)', 'Port-to-Port Delivery'],
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Express air cargo services for time-sensitive shipments.',
    features: ['Door-to-Door Delivery', 'Express Shipping', 'Temperature Control'],
  },
  {
    icon: Truck,
    title: 'Land Transport',
    description: 'Reliable ground transportation and last-mile delivery solutions.',
    features: ['Cross-Border Transit', 'Local Distribution', 'Real-time Tracking'],
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Secure storage facilities with inventory management.',
    features: ['Climate Control', 'Inventory Management', 'Order Fulfillment'],
  },
  {
    icon: FileCheck,
    title: 'Customs Clearance',
    description: 'Expert handling of customs documentation and compliance.',
    features: ['Documentation', 'Duty Optimization', 'Regulatory Compliance'],
  },
  {
    icon: Clock,
    title: 'Express Delivery',
    description: '24-48 hour delivery for urgent business shipments.',
    features: ['Priority Handling', 'Real-time Updates', 'Guaranteed Delivery'],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 gradient-sky relative overflow-hidden">
      {/* Animated background ships */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: `${20 + i * 30}%` }}
            animate={{
              x: ['-100px', 'calc(100vw + 100px)'],
            }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5,
            }}
          >
            <Ship className="w-20 h-20 text-primary" />
          </motion.div>
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
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            End-to-End
            <span className="text-gradient"> Logistics Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From sourcing to delivery, we handle every aspect of your international trade requirements 
            with precision and reliability.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-500 relative overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl gradient-ocean flex items-center justify-center mb-6 shadow-glow"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
