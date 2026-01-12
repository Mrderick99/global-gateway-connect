import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Building2, Mail, Phone, Package, Globe, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const EnquirySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Enquiry submitted successfully! We will get back to you soon.');
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const formFields = [
    { name: 'name', label: 'Your Name', type: 'text', icon: null, placeholder: 'John Doe', required: true },
    { name: 'company', label: 'Company Name', type: 'text', icon: Building2, placeholder: 'ABC Industries', required: true },
    { name: 'email', label: 'Email Address', type: 'email', icon: Mail, placeholder: 'john@company.com', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: Phone, placeholder: '+91 98765 43210', required: true },
    { name: 'country', label: 'Country', type: 'text', icon: Globe, placeholder: 'India', required: true },
    { name: 'quantity', label: 'Quantity', type: 'text', icon: Hash, placeholder: '1000 units', required: false },
  ];

  return (
    <section id="enquiry" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Start
              <span className="text-gradient"> Trading?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fill out the enquiry form and our team will get back to you within 24 hours 
              with a customized solution for your business needs.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                'Free consultation on your requirements',
                'Competitive pricing with bulk discounts',
                'Reliable shipping and logistics support',
                'Quality assurance on all products',
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative p-8 md:p-10 rounded-3xl glass border-glow shadow-card">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-50" />
              
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={field.name === 'quantity' ? '' : ''}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </label>
                      <div className="relative">
                        {field.icon && (
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        )}
                        <Input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          required={field.required}
                          className={`bg-background/50 border-border focus:border-primary transition-colors ${field.icon ? 'pl-10' : ''}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Product Requirement */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Product Requirement <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      name="requirement"
                      placeholder="Describe the products you're looking for, specifications, and any other details..."
                      required
                      rows={4}
                      className="bg-background/50 border-border focus:border-primary transition-colors pl-10 resize-none"
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:shadow-glow-lg group"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        Submit Enquiry
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
