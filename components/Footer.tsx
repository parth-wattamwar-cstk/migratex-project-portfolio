'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FooterData } from '@/lib/types';

interface FooterProps {
  data: FooterData | null;
}

export default function Footer({ data }: FooterProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const sectionHeading = data?.section_heading || "Let's Have a Chat";
  const contactForm = data?.contact_form;
  const bgImage = data?.contact_section_background_image?.url;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="border-t border-border-light mt-16">
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="bg-bg-card rounded-xl shadow-card overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left image panel */}
            {bgImage && (
              <div className="relative md:w-2/5 h-48 md:h-auto">
                <Image
                  src={bgImage}
                  alt="Contact background"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            )}

            {/* Form */}
            <div className={`p-6 ${bgImage ? 'md:w-3/5' : 'w-full'}`}>
              <h2 className="text-white font-bold text-xl mb-5">
                {sectionHeading}
              </h2>

              {submitted ? (
                <div className="text-accent-green text-sm font-medium py-8 text-center">
                  ✓ Thanks! I'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <label className="block text-text-muted text-xs mb-1 uppercase tracking-widest">
                      {contactForm?.name_field_label || 'Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="w-full bg-[#0f1a2e] border border-border-subtle rounded-lg px-3 py-2 text-white text-sm placeholder-[#445566] focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs mb-1 uppercase tracking-widest">
                      {contactForm?.email_field_label || 'Email'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-[#0f1a2e] border border-border-subtle rounded-lg px-3 py-2 text-white text-sm placeholder-[#445566] focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs mb-1 uppercase tracking-widest">
                      {contactForm?.message_field_label || 'Message'}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      required
                      rows={4}
                      className="w-full bg-[#0f1a2e] border border-border-subtle rounded-lg px-3 py-2 text-white text-sm placeholder-[#445566] focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="self-start bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-150"
                  >
                    {contactForm?.submit_button_text || 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-text-muted text-xs mt-6">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}