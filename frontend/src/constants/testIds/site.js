export const SITE = {
  // Nav
  navLogo: "nav-logo",
  navPill: "nav-pill",
  navHome: "nav-item-home",
  navServices: "nav-item-services",
  navWork: "nav-item-work",
  navPricing: "nav-item-pricing",
  navAbout: "nav-item-about",
  navContactBtn: "nav-contact-btn",
  navMobileToggle: "nav-mobile-toggle",

  // Hero
  heroSection: "hero-section",
  heroTitleLine1: "hero-title-line-1",
  heroTitleLine2: "hero-title-line-2",
  heroCta: "hero-cta",
  heroSecondaryCta: "hero-secondary-cta",

  // About
  aboutSection: "about-section",
  aboutPhoto: "about-photo",
  aboutHeading: "about-heading",
  aboutBio: "about-bio",

  // Services
  servicesSection: "services-section",
  servicesHeading: "services-heading",
  serviceCard: (slug) => `service-card-${slug}`,
  serviceCardLink: (slug) => `service-card-link-${slug}`,

  // Service detail page
  serviceDetail: (slug) => `service-detail-${slug}`,
  serviceDetailBack: "service-detail-back",
  serviceDetailContact: "service-detail-contact",

  // Testimonials / case studies
  testimonialsSection: "testimonials-section",
  caseStudiesSection: "case-studies-section",

  // Pricing
  pricingSection: "pricing-section",
  pricingCard: (tier) => `pricing-card-${tier}`,
  pricingCta: (tier) => `pricing-cta-${tier}`,

  // Contact
  contactSection: "contact-section",
  contactForm: "contact-form",
  contactName: "contact-name-input",
  contactEmail: "contact-email-input",
  contactCompany: "contact-company-input",
  contactInterest: "contact-interest-select",
  contactMessage: "contact-message-textarea",
  contactSubmit: "contact-submit-btn",
  contactSuccess: "contact-success",

  // Footer
  footer: "footer",

  // Chatbot
  chatToggle: "chat-toggle",
  chatPanel: "chat-panel",
  chatInput: "chat-input",
  chatSend: "chat-send",
  chatMessages: "chat-messages",
  chatClose: "chat-close",

  // Login / Admin
  loginForm: "login-form",
  loginEmail: "login-email",
  loginPassword: "login-password",
  loginSubmit: "login-submit",
  adminNav: "admin-nav",
  adminLogout: "admin-logout",
  adminProjectsTab: "admin-projects-tab",
  adminSettingsTab: "admin-settings-tab",
  adminCategoriesTab: "admin-categories-tab",
  adminAddProject: "admin-add-project",
  adminSaveSettings: "admin-save-settings",
  adminSaveCategories: "admin-save-categories",
};
