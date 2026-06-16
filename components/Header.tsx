'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeaderData } from '@/lib/types';

interface HeaderProps {
  data: HeaderData | null;
}

export default function Header({ data }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const brandName = data?.brand_name || 'Portfolio';
  const navItems = Array.isArray(data?.navigation_items) ? data.navigation_items : [];
  const primaryCta = data?.primary_cta;
  const secondaryCta = data?.secondary_cta;

  return (
    <header className="sticky top-0 z-50 bg-bg-base/90 backdrop-blur-sm border-b border-border-light">
      <div className="max-w-container mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-white font-bold text-base tracking-tight hover:text-primary transition-colors duration-150 flex-shrink-0"
        >
          {brandName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems?.map?.((item, index) => (
            <a
              key={index}
              href={item?.anchor_target ? `#${item.anchor_target}` : '#'}
              className="text-text-muted hover:text-white text-xs font-normal transition-colors duration-150"
            >
              {item?.label || item?.anchor_target || 'Link'}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          {secondaryCta?.button_text && (
            <Link
              href={secondaryCta?.button_url || '#'}
              className="px-4 py-1.5 rounded-full border border-[#555] text-[#cccccc] text-xs font-normal hover:border-white hover:text-white transition-all duration-150"
            >
              {secondaryCta.button_text}
            </Link>
          )}
          {primaryCta?.button_text && (
            <Link
              href={primaryCta?.button_url || '#'}
              className="px-4 py-1.5 rounded-full bg-primary border border-primary text-white text-xs font-medium hover:bg-primary-dark transition-all duration-150"
            >
              {primaryCta.button_text}
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-muted hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-bg-card border-t border-border-light px-6 py-4 flex flex-col gap-3">
          {navItems?.map?.((item, index) => (
            <a
              key={index}
              href={item?.anchor_target ? `#${item.anchor_target}` : '#'}
              className="text-text-secondary hover:text-white text-sm transition-colors duration-150"
              onClick={() => setMenuOpen(false)}
            >
              {item?.label || item?.anchor_target || 'Link'}
            </a>
          ))}
          <div className="flex gap-2 pt-2 border-t border-border-light">
            {secondaryCta?.button_text && (
              <Link
                href={secondaryCta?.button_url || '#'}
                className="px-4 py-1.5 rounded-full border border-[#555] text-[#cccccc] text-xs"
              >
                {secondaryCta.button_text}
              </Link>
            )}
            {primaryCta?.button_text && (
              <Link
                href={primaryCta?.button_url || '#'}
                className="px-4 py-1.5 rounded-full bg-primary text-white text-xs"
              >
                {primaryCta.button_text}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}