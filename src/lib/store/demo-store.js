// In-memory store used for the demo.
//
// Everything lives in `globalThis` so edits survive hot reloads in dev and
// repeated requests on a single server process. They do NOT survive a restart,
// and on serverless hosting each instance gets its own copy — so treat every
// change here as a demonstration, not as saved data. Connect MongoDB (see
// src/lib/store/index.js) to make it real.

import DATA from "@/data.js";
import { collections, faqs, site } from "@/lib/site";
import { seedJournal, seedLeads } from "./demo-data";

const now = () => new Date().toISOString();
const id = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
const clone = (value) => JSON.parse(JSON.stringify(value));

function initial() {
  return {
    leads: seedLeads(),
    journal: seedJournal(),
    galleries: clone(DATA),
    uploads: [],
    settings: {
      name: site.name,
      tagline: site.tagline,
      city: site.city,
      email: site.email,
      phone: site.phone,
      replyHours: site.replyHours,
      datesLeft: site.datesLeft,
    },
    collections: clone(collections),
    faqs: clone(faqs),
  };
}

// One shared instance per process.
const db = (globalThis.__ishaDemoStore ??= initial());

export const demoStore = {
  isDemo: true,

  async listLeads() {
    return clone(db.leads).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async getLead(leadId) {
    return clone(db.leads.find((l) => l.id === leadId) ?? null);
  },

  async createLead(input) {
    const lead = { ...input, id: id("lead"), status: "new", createdAt: now() };
    db.leads.unshift(lead);
    return clone(lead);
  },

  async setLeadStatus(leadId, status) {
    const lead = db.leads.find((l) => l.id === leadId);
    if (!lead) return null;
    lead.status = status;
    return clone(lead);
  },

  async deleteLead(leadId) {
    const before = db.leads.length;
    db.leads = db.leads.filter((l) => l.id !== leadId);
    return db.leads.length < before;
  },

  async listUploads() {
    return clone(db.uploads);
  },

  async addUpload(upload) {
    db.uploads.unshift(upload);
    return clone(upload);
  },

  async removeUpload(name) {
    const before = db.uploads.length;
    db.uploads = db.uploads.filter((u) => u.name !== name);
    return db.uploads.length < before;
  },

  async listGalleries() {
    return clone(db.galleries);
  },

  async getGallery(slug) {
    return clone(db.galleries.find((g) => g.slug === slug) ?? null);
  },

  async saveGallery(input) {
    const existing = db.galleries.find((g) => g.slug === input.slug);
    if (existing) {
      Object.assign(existing, input);
      return clone(existing);
    }
    const gallery = { categories: [], cards: {}, ...input, id: db.galleries.length + 1 };
    db.galleries.push(gallery);
    return clone(gallery);
  },

  async addGalleryCategory(slug, name) {
    const gallery = db.galleries.find((g) => g.slug === slug);
    const category = String(name || "").trim();
    if (!gallery || !category) return null;

    gallery.categories ??= [];
    gallery.cards ??= {};
    if (!gallery.categories.includes(category)) gallery.categories.push(category);
    gallery.cards[category] ??= [];
    return clone(gallery);
  },

  async removeGalleryCategory(slug, name) {
    const gallery = db.galleries.find((g) => g.slug === slug);
    if (!gallery) return null;

    gallery.categories = (gallery.categories ?? []).filter((c) => c !== name);
    delete gallery.cards?.[name];
    return clone(gallery);
  },

  /** Attach already-uploaded photographs to one category of a gallery. */
  async addGalleryCards(slug, category, items) {
    const gallery = db.galleries.find((g) => g.slug === slug);
    if (!gallery || !category) return null;

    gallery.categories ??= [];
    gallery.cards ??= {};
    if (!gallery.categories.includes(category)) gallery.categories.push(category);
    gallery.cards[category] ??= [];

    const existing = Object.values(gallery.cards).flat();
    let nextId = existing.reduce((max, card) => Math.max(max, Number(card.id) || 0), 0);

    for (const item of items) {
      nextId += 1;
      gallery.cards[category].push({
        id: nextId,
        thumbnail: item.thumbnail,
        title: item.title || `${gallery.name} — ${category}`,
      });
    }

    return clone(gallery);
  },

  async removeGalleryCard(slug, category, cardId) {
    const gallery = db.galleries.find((g) => g.slug === slug);
    const cards = gallery?.cards?.[category];
    if (!cards) return null;

    gallery.cards[category] = cards.filter((card) => String(card.id) !== String(cardId));
    return clone(gallery);
  },

  async deleteGallery(slug) {
    const before = db.galleries.length;
    db.galleries = db.galleries.filter((g) => g.slug !== slug);
    return db.galleries.length < before;
  },

  async listPosts() {
    return clone(db.journal);
  },

  async getPost(postId) {
    return clone(db.journal.find((p) => p.id === postId) ?? null);
  },

  async savePost(input) {
    const existing = input.id && db.journal.find((p) => p.id === input.id);
    if (existing) {
      Object.assign(existing, input);
      return clone(existing);
    }
    const post = { status: "draft", publishedAt: null, ...input, id: id("post") };
    db.journal.unshift(post);
    return clone(post);
  },

  async deletePost(postId) {
    const before = db.journal.length;
    db.journal = db.journal.filter((p) => p.id !== postId);
    return db.journal.length < before;
  },

  async getSettings() {
    return { settings: clone(db.settings), collections: clone(db.collections), faqs: clone(db.faqs) };
  },

  async saveSettings(patch) {
    Object.assign(db.settings, patch);
    return clone(db.settings);
  },

  async saveCollection(patch) {
    const existing = db.collections.find((c) => c.id === patch.id);
    if (!existing) return null;
    Object.assign(existing, patch);
    return clone(existing);
  },
};
