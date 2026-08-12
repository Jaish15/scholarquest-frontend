/* ==========================================
   ScholarQuest Shop & Inventory Module
   Handles catalog rendering, purchasing, equips, bundles
   ========================================== */

import { state, saveState, updateUI, changeTheme, heal } from '../app.js';
import { updateAvatarRender } from './avatar.js';

// Pet companion passive perk definitions
export const PET_BONUSES = {
  hedwig_owl:     { perkText: '+2% Quiz XP',         type: 'quiz_xp',      multiplier: 1.02 },
  baby_dragon:    { perkText: '+2% CodeScroll XP',   type: 'codescroll_xp', multiplier: 1.02 },
  magic_cat:      { perkText: '+2% Focus XP',        type: 'focus_xp',     multiplier: 1.02 },
  silver_serpent: { perkText: '+5 Coins / Completed', type: 'flat_coins',   flatBonus: 5 }
};

// Catalog with real medieval asset graphics
export const SHOP_ITEMS = [
  // 🐾 Magical Pets & Companions
  { id: 'hedwig_owl',      name: 'Hedwig Snowy Owl',     category: 'pets', type: 'pet', price: 100, img: './assets/items/hedwig_owl.png',     desc: 'Faithful snowy owl companion (Perk: +2% XP from QuizForge quizzes)' },
  { id: 'baby_dragon',    name: 'Golden Baby Dragon',   category: 'pets', type: 'pet', price: 120, img: './assets/items/baby_dragon.png',    desc: 'Sparkling golden baby dragon companion (Perk: +2% XP from CodeScroll challenges)' },
  { id: 'magic_cat',      name: 'Wizard Black Cat',     category: 'pets', type: 'pet', price: 80,  img: './assets/items/magic_cat.png',      desc: 'Mystical black wizard cat wearing a pointed hat (Perk: +2% XP from Focus Arena)' },
  { id: 'silver_serpent', name: 'Slytherin Silver Serpent', category: 'pets', type: 'pet', price: 110, img: './assets/items/silver_serpent.png', desc: 'Noble green & silver winged serpent familiar (Perk: +5 bonus Coins per completed quiz/challenge)' },

  // 👕 Outfits, Cloaks & Apparel Pieces
  { id: 'gryffindor_cape',   name: 'Gryffindor Velvet Cape',     category: 'outfits', type: 'outfit', price: 60,  img: './assets/items/gryffindor_cape.png', desc: 'Scarlet & gold Gryffindor wizard cloak with gold clasp' },
  { id: 'slytherin_robe',    name: 'Slytherin Emerald Robe',    category: 'outfits', type: 'outfit', price: 60,  img: './assets/heroes/draco_malfoy.png',   desc: 'Emerald & silver Slytherin wizard robes with silver crest' },
  { id: 'scholar_vest',      name: 'Scholar Tweed Vest & Shirt',category: 'outfits', type: 'outfit', price: 40,  img: './assets/heroes/scholar.png',        desc: 'Pink & brown scholar vest and shirt with brass buttons' },
  { id: 'apprentice_apron',  name: 'Apprentice Leather Apron',  category: 'outfits', type: 'outfit', price: 40,  img: './assets/heroes/apprentice.png',     desc: 'Green craftsperson leather apron with tool loops' },
  { id: 'farmer_tunic',      name: 'Farmer Rustic Linen Tunic', category: 'outfits', type: 'outfit', price: 30,  img: './assets/heroes/peasant.png',        desc: 'Rustic brown linen farmer tunic for daily hard work' },
  { id: 'knight_tabard',     name: 'Guardian Armor Tabard',     category: 'outfits', type: 'outfit', price: 80,  img: './assets/heroes/knight.png',         desc: 'Silver & gold steel knight chest tabard armor' },
  { id: 'royal_gown',        name: 'Royal Purple Velvet Gown',  category: 'outfits', type: 'outfit', price: 120, img: './assets/heroes/royal.png',          desc: 'Royal purple velvet gown with gold embroidery' },

  // Head & Hand Medieval Accessories
  { id: 'scroll_quill',    name: 'Scholar Scroll & Quill',     category: 'accessories', type: 'hand', price: 60,  img: './assets/items/scroll_quill.png',    desc: 'Medieval leather scroll with gold seal & quill (+15 Quiz Power)' },
  { id: 'straw_hat',       name: 'Farmer Woven Straw Hat',     category: 'accessories', type: 'head', price: 50,  img: './assets/items/straw_hat.png',       desc: 'Protects from study fatigue and maintains focus streaks' },
  { id: 'explorer_compass',name: 'Explorer Brass Compass',     category: 'accessories', type: 'hand', price: 75,  img: './assets/items/explorer_compass.png', desc: 'Antique compass that enhances CodeScroll lesson speed' },
  { id: 'knight_shield',   name: 'Guardian Lion Shield',      category: 'accessories', type: 'hand', price: 90,  img: './assets/items/knight_shield.png',    desc: 'Wooden shield with gold lion crest. Blocks distraction damage' },
  { id: 'royal_crown',      name: 'Royal Velvet Crown',        category: 'accessories', type: 'head', price: 150, img: './assets/items/royal_crown.png',      desc: 'Golden royal crown with rubies for prestigious scholars' },
  
  // Custom Themes
  { id: 'theme_gold',  name: 'Golden Legend Theme', category: 'themes', type: 'theme', target: 'gold', price: 80, img: './assets/items/royal_crown.png', desc: 'Unlock royal gold medieval theme' },
  { id: 'theme_green', name: 'Emerald Guild Theme', category: 'themes', type: 'theme', target: 'green', price: 40, img: './assets/items/straw_hat.png', desc: 'Unlock peaceful emerald guild theme' },
  { id: 'theme_cyan',  name: 'Cyber Scholar Theme', category: 'themes', type: 'theme', target: 'cyan', price: 50, img: './assets/items/explorer_compass.png', desc: 'Unlock glowing cyan theme' },
  
  // Consumable Boosters
  { id: 'booster_potion', name: 'Elixir of Life Potion', category: 'boosters', type: 'consumable', price: 30, img: './assets/items/scroll_quill.png', desc: 'Drink to restore 40 HP instantly' }
];

// 📦 Starter Bundle Package Deals
export const STARTER_BUNDLES = [
  {
    id: 'bundle_starter_wizard',
    name: 'Wizard Scholar Starter Pack',
    desc: 'Complete novice wizard kit featuring Black Cat companion, Scroll & Quill, and Cyber Scholar UI Theme.',
    ribbon: 'SAVE 26% — STARTER PACK',
    items: ['magic_cat', 'scroll_quill', 'theme_cyan'],
    originalPrice: 190,
    bundlePrice: 140
  },
  {
    id: 'bundle_royal_champion',
    name: 'Royal Champion Bundle',
    desc: 'Prestige bundle featuring Golden Baby Dragon, Royal Velvet Crown, and Golden Legend UI Theme.',
    ribbon: 'SAVE 100 COINS — PRESTIGE',
    items: ['baby_dragon', 'royal_crown', 'theme_gold'],
    originalPrice: 350,
    bundlePrice: 250
  },
  {
    id: 'bundle_guardian_dungeon',
    name: 'Guardian Adventurer Pack',
    desc: 'Dungeon kit featuring Slytherin Silver Serpent, Lion Shield, and Emerald Guild UI Theme.',
    ribbon: 'SAVE 27% — POPULAR',
    items: ['silver_serpent', 'knight_shield', 'theme_green'],
    originalPrice: 240,
    bundlePrice: 175
  }
];

let activeCategory = 'accessories';

export function initShop() {
  setupShopTabs();
  updateShopAndInventoryUI();
}

function setupShopTabs() {
  const tabs = document.querySelectorAll('.shop-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      activeCategory = tab.getAttribute('data-category');
      renderShopCatalog();
    });
  });
}

export function updateShopAndInventoryUI() {
  renderShopCatalog();
  renderInventory();
}

export function updatePodiumDisplay(overrideState = null, previewItemName = '') {
  const equipped = overrideState || (state && state.equipped ? state.equipped : { head: 'none', hand: 'none', pet: 'none' });
  const isPreview = !!overrideState;

  const headEquip = equipped.head || 'none';
  const handEquip = equipped.hand || 'none';
  const petEquip = equipped.pet || 'none';

  const headItem = SHOP_ITEMS.find(item => item.id === headEquip);
  const handItem = SHOP_ITEMS.find(item => item.id === handEquip);
  const petItem = SHOP_ITEMS.find(item => item.id === petEquip);

  // Sync slot name labels on top of 3D Podium stage
  const slotHeadName = document.getElementById('slot-head-name');
  const slotHandName = document.getElementById('slot-hand-name');
  const slotPetName = document.getElementById('slot-pet-name');

  if (slotHeadName) {
    slotHeadName.textContent = headItem ? headItem.name : 'None';
    slotHeadName.style.color = (isPreview && overrideState.isHeadPreview) ? '#38bdf8' : '#f59e0b';
  }
  if (slotHandName) {
    slotHandName.textContent = handItem ? handItem.name : 'None';
    slotHandName.style.color = (isPreview && overrideState.isHandPreview) ? '#38bdf8' : '#f59e0b';
  }
  if (slotPetName) {
    slotPetName.textContent = petItem ? petItem.name : 'None';
    slotPetName.style.color = (isPreview && overrideState.isPetPreview) ? '#38bdf8' : '#f59e0b';
  }

  // Update podium image overlays
  const headImgEl = document.getElementById('shop-podium-head');
  if (headImgEl) {
    if (headItem) {
      headImgEl.src = headItem.img;
      headImgEl.style.display = 'block';
    } else {
      headImgEl.style.display = 'none';
    }
  }

  const handImgEl = document.getElementById('shop-podium-hand');
  if (handImgEl) {
    if (handItem) {
      handImgEl.src = handItem.img;
      handImgEl.style.display = 'block';
    } else {
      handImgEl.style.display = 'none';
    }
  }

  const petImgEl = document.getElementById('shop-podium-pet');
  if (petImgEl) {
    if (petItem) {
      petImgEl.src = petItem.img;
      petImgEl.style.display = 'block';
    } else {
      petImgEl.style.display = 'none';
    }
  }

  // Preview active badge indicator
  const previewBadge = document.getElementById('preview-active-badge');
  if (previewBadge) {
    if (isPreview) {
      previewBadge.style.display = 'block';
      previewBadge.innerHTML = `⚡ PREVIEW: ${previewItemName || 'Item'}`;
    } else {
      previewBadge.style.display = 'none';
    }
  }
}

export function previewItem(item) {
  if (!item) return;
  const currentEquipped = (state && state.equipped) ? state.equipped : {};
  const previewState = {
    head: currentEquipped.head || 'none',
    hand: currentEquipped.hand || 'none',
    pet: currentEquipped.pet || 'none',
    isHeadPreview: false,
    isHandPreview: false,
    isPetPreview: false
  };

  if (item.category === 'pets' || item.type === 'pet') {
    previewState.pet = item.id;
    previewState.isPetPreview = true;
  } else if (item.type === 'head') {
    previewState.head = item.id;
    previewState.isHeadPreview = true;
  } else if (item.type === 'hand') {
    previewState.hand = item.id;
    previewState.isHandPreview = true;
  }

  updatePodiumDisplay(previewState, item.name);
}

export function previewBundle(bundle) {
  if (!bundle || !bundle.items) return;
  const currentEquipped = (state && state.equipped) ? state.equipped : {};
  const previewState = {
    head: currentEquipped.head || 'none',
    hand: currentEquipped.hand || 'none',
    pet: currentEquipped.pet || 'none',
    isHeadPreview: false,
    isHandPreview: false,
    isPetPreview: false
  };

  bundle.items.forEach(itemId => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    if (item.category === 'pets' || item.type === 'pet') {
      previewState.pet = item.id;
      previewState.isPetPreview = true;
    } else if (item.type === 'head') {
      previewState.head = item.id;
      previewState.isHeadPreview = true;
    } else if (item.type === 'hand') {
      previewState.hand = item.id;
      previewState.isHandPreview = true;
    }
  });

  updatePodiumDisplay(previewState, bundle.name);
}

export function clearPreview() {
  updatePodiumDisplay(null);
}

function renderShopCatalog() {
  const container = document.getElementById('shop-items-container');
  if (!container) return;
  container.innerHTML = '';

  const countBadge = document.getElementById('owned-count');
  if (countBadge) {
    countBadge.textContent = state.inventory ? state.inventory.length : 0;
  }

  // 1. Bundles Tab Section
  if (activeCategory === 'bundles') {
    renderBundles(container);
    return;
  }

  // 2. My Collection / Owned Items Section
  if (activeCategory === 'owned') {
    const ownedItems = state.inventory.map(id => SHOP_ITEMS.find(item => item.id === id)).filter(Boolean);

    if (ownedItems.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 36px 20px; color: rgba(245,232,215,0.5);">
          <div style="font-size: 32px; margin-bottom: 8px;">🏆</div>
          <div style="font-size: 14px; font-weight: 800; color: #f5e8d7;">Your Collection is Currently Empty</div>
          <p style="font-size: 12px; margin-top: 4px;">Purchase gear, pets, or themes from the shop tabs to build your collection!</p>
        </div>
      `;
      return;
    }

    const categoryLabels = {
      'pets': '🐾 Magical Pet',
      'accessories': '⚔️ Avatar Upgrade',
      'themes': '🎨 UI Theme',
      'boosters': '🧪 Booster'
    };

    ownedItems.forEach(item => {
      const isEquipped = state.equipped && (state.equipped.head === item.id || state.equipped.hand === item.id || state.equipped.pet === item.id);

      const card = document.createElement('div');
      card.className = 'shop-item-card';
      card.style.cssText = 'display: flex; flex-direction: column; align-items: center; text-align: center; padding: 18px 14px; background: rgba(24,18,12,0.85); border: 1px solid rgba(245,158,11,0.35); border-radius: 16px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.5); cursor: pointer;';
      card.innerHTML = `
        <div style="font-size: 10px; font-weight: 800; color: #f59e0b; background: rgba(245,158,11,0.15); padding: 3px 8px; border-radius: 6px; margin-bottom: 8px; border: 1px solid rgba(245,158,11,0.3);">
          ${categoryLabels[item.category] || '🏆 Owned Item'}
        </div>
        <img src="${item.img}" class="item-img" alt="${item.name}" style="width: 72px; height: 72px; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6)); margin-bottom: 10px;">
        <h3 class="item-title" style="font-size: 13px; font-weight: 800; color: #f5e8d7; margin: 0 0 4px 0;">${item.name}</h3>
        <p class="item-desc" style="font-size: 11px; color: rgba(245,232,215,0.45); margin: 0 0 12px 0; line-height: 1.4; min-height: 30px;">${item.desc}</p>

        <button class="btn ${isEquipped ? 'secondary-btn' : 'primary-btn'} equip-owned-btn" 
                data-id="${item.id}" 
                style="width: 100%; border-radius: 10px; font-size: 11px; font-weight: 800;">
          ${isEquipped ? '✓ Equipped / Active' : 'Equip / Activate ✨'}
        </button>
      `;

      // Live Preview listeners
      card.addEventListener('mouseenter', () => previewItem(item));
      card.addEventListener('mouseleave', () => clearPreview());
      card.addEventListener('touchstart', () => previewItem(item), { passive: true });
      card.addEventListener('touchend', () => clearPreview(), { passive: true });

      card.querySelector('.equip-owned-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        equipOrActivateItem(item);
        renderShopCatalog();
      });

      container.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // 3. Regular Shop Categories
  const filtered = SHOP_ITEMS.filter(item => item.category === activeCategory);
  
  filtered.forEach(item => {
    const isOwned = state.inventory.includes(item.id);
    const petPerk = (item.category === 'pets' && PET_BONUSES[item.id]) ? PET_BONUSES[item.id].perkText : null;
    
    const card = document.createElement('div');
    card.className = 'shop-item-card';
    card.style.cssText = 'display: flex; flex-direction: column; align-items: center; text-align: center; padding: 18px 14px; background: rgba(14,11,8,0.7); border: 1px solid rgba(245,158,11,0.2); border-radius: 16px; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer;';
    card.innerHTML = `
      ${petPerk ? `<div style="font-size: 9px; font-weight: 800; color: #10b981; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); padding: 2px 6px; border-radius: 6px; margin-bottom: 6px;">🐾 ${petPerk}</div>` : ''}
      <img src="${item.img}" class="item-img" alt="${item.name}" style="width: 72px; height: 72px; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6)); margin-bottom: 10px;">
      <h3 class="item-title" style="font-size: 13px; font-weight: 800; color: #f5e8d7; margin: 0 0 4px 0;">${item.name}</h3>
      <p class="item-desc" style="font-size: 11px; color: rgba(245,232,215,0.45); margin: 0 0 12px 0; line-height: 1.4; min-height: 30px;">${item.desc}</p>
      
      <div class="item-price-row" style="display: flex; align-items: center; gap: 4px; font-weight: 800; color: #f59e0b; margin-bottom: 12px; font-size: 12px;">
        <i data-lucide="coins" style="width: 14px; height: 14px;"></i>
        <span>${item.price} Coins</span>
      </div>
      
      <button class="btn ${isOwned ? 'secondary-btn' : 'primary-btn'} buy-btn" 
              data-id="${item.id}" 
              style="width: 100%; border-radius: 10px; font-size: 11px; font-weight: 800;"
              ${isOwned && item.type !== 'consumable' ? 'disabled' : ''}>
        ${isOwned && item.type !== 'consumable' ? '✓ Owned' : 'Purchase'}
      </button>
    `;

    // Attach Live Preview listeners
    card.addEventListener('mouseenter', () => previewItem(item));
    card.addEventListener('mouseleave', () => clearPreview());
    card.addEventListener('touchstart', () => previewItem(item), { passive: true });
    card.addEventListener('touchend', () => clearPreview(), { passive: true });
    
    container.appendChild(card);
  });
  
  if (window.lucide) window.lucide.createIcons();
  
  // Attach purchase listeners
  container.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      buyItem(id);
    });
  });
}

function renderBundles(container) {
  STARTER_BUNDLES.forEach(bundle => {
    const includedObjects = bundle.items.map(id => SHOP_ITEMS.find(item => item.id === id)).filter(Boolean);
    const ownedCount = bundle.items.filter(id => state.inventory.includes(id)).length;
    const isFullyOwned = ownedCount === bundle.items.length;

    // Calculate dynamic price adjusted for unowned items
    const unownedItems = bundle.items.filter(id => !state.inventory.includes(id));
    const unownedOrigSum = unownedItems.reduce((acc, id) => {
      const obj = SHOP_ITEMS.find(i => i.id === id);
      return acc + (obj ? obj.price : 0);
    }, 0);
    
    const discountRatio = bundle.bundlePrice / bundle.originalPrice;
    const finalPrice = isFullyOwned ? 0 : (ownedCount > 0 ? Math.round(unownedOrigSum * discountRatio) : bundle.bundlePrice);

    const card = document.createElement('div');
    card.className = 'shop-item-card bundle-card';
    card.style.cssText = 'display: flex; flex-direction: column; align-items: center; text-align: center; padding: 20px 16px; background: linear-gradient(135deg, rgba(30,20,45,0.9) 0%, rgba(15,10,25,0.95) 100%); border: 1px solid rgba(168,85,247,0.4); border-radius: 18px; position: relative; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 6px 18px rgba(0,0,0,0.6); cursor: pointer; grid-column: span 1;';
    
    card.innerHTML = `
      <!-- Ribbon Badge -->
      <div style="position: absolute; top: 12px; right: 12px; background: linear-gradient(90deg, #8b5cf6, #d946ef); color: white; padding: 3px 10px; border-radius: 10px; font-weight: 800; font-size: 9px; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 2px 8px rgba(139,92,246,0.4);">
        ${bundle.ribbon}
      </div>

      <div style="font-size: 24px; margin-bottom: 4px;">🎁</div>
      <h3 class="item-title" style="font-size: 14px; font-weight: 800; color: #f3e8ff; margin: 0 0 6px 0;">${bundle.name}</h3>
      <p class="item-desc" style="font-size: 11px; color: rgba(243,232,255,0.6); margin: 0 0 14px 0; line-height: 1.4; min-height: 32px;">${bundle.desc}</p>

      <!-- Included Items Icons Row -->
      <div style="display: flex; gap: 10px; justify-content: center; align-items: center; margin-bottom: 14px; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 12px; width: 100%; border: 1px solid rgba(255,255,255,0.06);">
        ${includedObjects.map(item => {
          const isItemOwned = state.inventory.includes(item.id);
          return `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center;" title="${item.name}${isItemOwned ? ' (Owned)' : ''}">
              <img src="${item.img}" style="width: 42px; height: 42px; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5)); opacity: ${isItemOwned ? '0.5' : '1'};">
              ${isItemOwned ? '<span style="position: absolute; bottom: -2px; right: -2px; background: #10b981; color: white; font-size: 8px; border-radius: 50%; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; font-weight: 800;">✓</span>' : ''}
            </div>
          `;
        }).join('')}
      </div>

      <!-- Price Row -->
      <div class="item-price-row" style="display: flex; align-items: center; gap: 8px; font-weight: 800; margin-bottom: 14px;">
        ${!isFullyOwned && ownedCount > 0 ? `<span style="font-size: 10px; color: #a855f7;">(Covering ${unownedItems.length} unowned)</span>` : ''}
        <span style="font-size: 12px; color: rgba(243,232,255,0.4); text-decoration: line-through;">${isFullyOwned ? bundle.originalPrice : (ownedCount > 0 ? unownedOrigSum : bundle.originalPrice)} Coins</span>
        <div style="display: flex; align-items: center; gap: 4px; color: #f59e0b; font-size: 14px;">
          <i data-lucide="coins" style="width: 16px; height: 16px;"></i>
          <span>${finalPrice} Coins</span>
        </div>
      </div>

      <!-- Purchase Button -->
      <button class="btn ${isFullyOwned ? 'secondary-btn' : 'primary-btn'} buy-bundle-btn" 
              data-id="${bundle.id}" 
              style="width: 100%; border-radius: 10px; font-size: 11px; font-weight: 800; background: ${isFullyOwned ? '' : 'linear-gradient(90deg, #9333ea, #c084fc)'}; border: none;"
              ${isFullyOwned ? 'disabled' : ''}>
        ${isFullyOwned ? '✓ Bundle Fully Owned' : `Claim Bundle (${finalPrice} Coins)`}
      </button>
    `;

    // Live multi-preview on hover
    card.addEventListener('mouseenter', () => previewBundle(bundle));
    card.addEventListener('mouseleave', () => clearPreview());
    card.addEventListener('touchstart', () => previewBundle(bundle), { passive: true });
    card.addEventListener('touchend', () => clearPreview(), { passive: true });

    card.querySelector('.buy-bundle-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      buyBundle(bundle.id);
    });

    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

function buyBundle(bundleId) {
  const bundle = STARTER_BUNDLES.find(b => b.id === bundleId);
  if (!bundle) return;

  const unownedItems = bundle.items.filter(id => !state.inventory.includes(id));
  if (unownedItems.length === 0) {
    alert('🏆 You already own all items in this bundle!');
    return;
  }

  const unownedOrigSum = unownedItems.reduce((acc, id) => {
    const obj = SHOP_ITEMS.find(i => i.id === id);
    return acc + (obj ? obj.price : 0);
  }, 0);
  
  const discountRatio = bundle.bundlePrice / bundle.originalPrice;
  const finalPrice = Math.round(unownedOrigSum * discountRatio);

  if (state.coins < finalPrice) {
    alert(`❌ Insufficient coins! You need ${finalPrice} coins to claim this bundle deal.`);
    return;
  }

  // Deduct coins & add all unowned items to inventory
  state.coins -= finalPrice;
  unownedItems.forEach(id => {
    if (!state.inventory.includes(id)) {
      state.inventory.push(id);
    }
  });

  alert(`🎉 Success! Claimed ${bundle.name} for ${finalPrice} coins! All included items have been added to your collection.`);
  
  saveState();
  updateUI();
  updateShopAndInventoryUI();
}

function buyItem(id) {
  const item = SHOP_ITEMS.find(item => item.id === id);
  if (!item) return;
  
  if (state.coins < item.price) {
    alert('❌ Insufficient coins! Complete focus sessions, quizzes, or habits to earn more gold.');
    return;
  }
  
  // Subtract coins
  state.coins -= item.price;
  
  // Add to inventory if not already owned or if consumable
  if (item.type === 'consumable') {
    if (item.id === 'booster_potion') {
      heal(40);
      alert('🧪 You drank the Elixir of Life! Restored 40 HP.');
    }
  } else {
    if (!state.inventory.includes(item.id)) {
      state.inventory.push(item.id);
    }
    alert(`🎉 Purchased ${item.name}! Check your Equipment Drawer to equip it.`);
  }
  
  saveState();
  updateUI();
  updateShopAndInventoryUI();
}

function renderInventory() {
  const equippedContainer = document.getElementById('equipped-items-container');
  if (!equippedContainer) return;
  
  equippedContainer.innerHTML = '';
  
  // 1. Render Equipped Items slots
  const headEquip = (state.equipped && state.equipped.head) || 'none';
  const handEquip = (state.equipped && state.equipped.hand) || 'none';
  const petEquip = (state.equipped && state.equipped.pet) || 'none';
  
  const headItem = SHOP_ITEMS.find(item => item.id === headEquip);
  const handItem = SHOP_ITEMS.find(item => item.id === handEquip);
  const petItem = SHOP_ITEMS.find(item => item.id === petEquip);

  // Sync stage podium visuals to actual state
  updatePodiumDisplay(null);
  
  const petPerk = petItem && PET_BONUSES[petItem.id] ? PET_BONUSES[petItem.id].perkText : null;

  equippedContainer.innerHTML = `
    <div class="equip-box" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 60px; height: 60px; background: rgba(18,14,9,0.8); border: 1px dashed rgba(245,158,11,0.3); border-radius: 12px; padding: 4px;" title="${headItem ? headItem.name : 'Empty Head Slot'}">
      ${headItem ? `<img src="${headItem.img}" style="width: 34px; height: 34px; object-fit: contain;" title="${headItem.name}">` : '<span style="font-size: 10px; color: rgba(245,232,215,0.3);">Head</span>'}
      ${headItem ? `<button class="btn btn-sm secondary-btn unequip-btn" data-slot="head" style="position: absolute; top: -6px; right: -6px; font-size: 9px; width: 18px; height: 18px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #ef4444; color: white; border: none; cursor: pointer;">✕</button>` : ''}
    </div>
    <div class="equip-box" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 60px; height: 60px; background: rgba(18,14,9,0.8); border: 1px dashed rgba(245,158,11,0.3); border-radius: 12px; padding: 4px;" title="${handItem ? handItem.name : 'Empty Hand Slot'}">
      ${handItem ? `<img src="${handItem.img}" style="width: 34px; height: 34px; object-fit: contain;" title="${handItem.name}">` : '<span style="font-size: 10px; color: rgba(245,232,215,0.3);">Hand</span>'}
      ${handItem ? `<button class="btn btn-sm secondary-btn unequip-btn" data-slot="hand" style="position: absolute; top: -6px; right: -6px; font-size: 9px; width: 18px; height: 18px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #ef4444; color: white; border: none; cursor: pointer;">✕</button>` : ''}
    </div>
    <div class="equip-box" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 60px; height: 60px; background: rgba(18,14,9,0.8); border: 1px dashed rgba(245,158,11,0.3); border-radius: 12px; padding: 4px;" title="${petItem ? petItem.name : 'Empty Pet Slot'}">
      ${petItem ? `<img src="${petItem.img}" style="width: 34px; height: 34px; object-fit: contain;" title="${petItem.name}">` : '<span style="font-size: 10px; color: rgba(245,232,215,0.3);">Pet</span>'}
      ${petItem ? `<button class="btn btn-sm secondary-btn unequip-btn" data-slot="pet" style="position: absolute; top: -6px; right: -6px; font-size: 9px; width: 18px; height: 18px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #ef4444; color: white; border: none; cursor: pointer;">✕</button>` : ''}
    </div>
  `;
  
  // Existing perk badge element or new update
  let perkEl = document.getElementById('equipped-pet-perk-badge');
  if (!perkEl) {
    perkEl = document.createElement('div');
    perkEl.id = 'equipped-pet-perk-badge';
    equippedContainer.parentNode.appendChild(perkEl);
  }
  
  if (petItem && petPerk) {
    perkEl.style.cssText = 'width: 100%; margin-top: 8px; font-size: 10px; font-weight: 800; color: #10b981; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); padding: 4px 8px; border-radius: 8px; text-align: center; display: block;';
    perkEl.innerHTML = `🐾 Active Perk: <strong>${petPerk}</strong>`;
  } else {
    perkEl.style.display = 'none';
  }
  
  // Attach unequip click listeners
  equippedContainer.querySelectorAll('.unequip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = btn.getAttribute('data-slot');
      if (state.equipped) {
        state.equipped[slot] = 'none';
      }
      saveState();
      updateUI();
      renderInventory();
    });
  });
}

function equipOrActivateItem(item) {
  if (!state.equipped) {
    state.equipped = { head: 'none', hand: 'none', pet: 'none' };
  }
  
  if (item.category === 'accessories') {
    state.equipped[item.type] = item.id;
    alert(`🛡️ Equipped ${item.name} in your ${item.type} slot!`);
  } else if (item.category === 'outfits') {
  } else if (item.category === 'outfits') {
    state.equipped.outfit = item.id;
    alert(`👕 Equipped ${item.name}! Your hero is wearing ${item.name} on the 3D Projection Stage!`);
  } else if (item.category === 'pets') {
    state.equipped.pet = item.id;
    alert(`🐾 ${item.name} is now accompanying your hero!`);
  } else if (item.category === 'themes') {
    changeTheme(item.target);
    alert(`🎨 Visual theme changed to ${item.name}!`);
  }
  
  saveState();
  updateUI();
  renderInventory();
}
