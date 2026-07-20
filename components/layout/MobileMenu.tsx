"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/Button";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useUiStore } from "@/store/ui-store";

type MobileMenuProps = {
  items: readonly {
    label: string;
    href: string;
  }[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const isOpen = useUiStore((state) => state.isMobileMenuOpen);
  const openMobileMenu = useUiStore((state) => state.openMobileMenu);
  const closeMobileMenu = useUiStore((state) => state.closeMobileMenu);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const handleClose = useCallback(() => closeMobileMenu(), [closeMobileMenu]);

  useFocusTrap({
    active: isOpen,
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
    onEscape: handleClose,
  });
  useBodyScrollLock(isOpen);
  const menuOverlay = (
    <div
      aria-modal="true"
      aria-labelledby="novara-mobile-menu-title"
      className="motion-overlay fixed inset-0 z-[90] p-3 text-white"
      role="dialog"
    >
      <button
        aria-label="Close menu"
        className="absolute inset-0 h-full w-full cursor-default bg-novara-black/70 backdrop-blur-sm"
        onClick={handleClose}
        type="button"
      />
      <div className="motion-panel relative ml-auto grid min-h-full w-full max-w-md rounded-md bg-novara-black p-5 shadow-premium" ref={dialogRef}>
        <div className="mb-8 flex items-center justify-between">
          <span className="text-lg font-bold" id="novara-mobile-menu-title">
            NOVARA
          </span>
          <Button className="border-white/18 bg-white/8 px-4 text-white hover:bg-white/14" onClick={handleClose} ref={closeButtonRef} variant="secondary">
            Close
          </Button>
        </div>
        <nav className="grid content-start gap-1 overflow-y-auto pb-8">
          {items.map((item) => (
            <Link className="flex min-h-12 items-center rounded-sm px-1 text-xl font-semibold transition hover:text-novara-gold md:text-2xl" href={item.href} key={item.href} onClick={handleClose}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div>
      <Button aria-expanded={isOpen} aria-label="Open menu" className="px-3" onClick={openMobileMenu} variant="ghost">
        Menu
      </Button>
      {isOpen ? createPortal(menuOverlay, document.body) : null}
    </div>
  );
}
