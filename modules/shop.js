/* ==========================================
   ScholarQuest Shop & Inventory Module
   Handles catalog rendering, purchasing, equips
   ========================================== */

import { state, saveState, updateUI, changeTheme, heal } from '../app.js';
import { updateAvatarRender } from './avatar.js';

// Catalog with real medieval asset graphics
const SHOP_ITEMS = [
  // 🐾 Magical Pets & Companions
  { id: 'hedwig_owl',      name: 'Hedwig Snowy Owl',     category: 'pets', type: 'pet', price: 100, img: './assets/items/hedwig_owl.png',     desc: 'Faithful snowy owl companion with Gryffindor scarf (Level 3 Companion)' },
  { id: 'baby_dragon',    name: 'Golden Baby Dragon',   category: 'pets', type: 'pet', price: 120, img: './assets/items/baby_dragon.png',    desc: 'Sparkling golden baby dragon companion with wings (Level 5 Companion)' },
  { id: 'magic_cat',      name: 'Wizard Black Cat',     category: 'pets', type: 'pet', price: 80,  img: './assets/items/magic_cat.png',      desc: 'Mystical black wizard cat wearing a pointed witch hat' },
  { id: 'silver_serpent', name: 'Slytherin Silver Serpent', category: 'pets', type: 'pet', price: 110, img: './assets/items/silver_serpent.png', desc: 'Noble green & silver winged serpent familiar with gold crown' },

  // 👕 Outfits & Tunics
  { id: 'outfit_scholar',   name: 'Scholar Tunic & Scarf',     category: 'outfits', type: 'outfit', heroId: 'peasant',        price: 50,  img: './assets/heroes/scholar.png',      desc: 'Pink & brown medieval scholar tunic with scarf and pouch' },
  { id: 'outfit_apprentice',name: 'Apprentice Craft Apron',    category: 'outfits', type: 'outfit', heroId: 'villager_woman', price: 50,  img: './assets/heroes/apprentice.png',   desc: 'Green craftsperson apron with leather belt and tools' },
  { id: 'outfit_farmer',    name: 'Peasant Farmer Linen Tunic',category: 'outfits', type: 'outfit', heroId: 'worker',         price: 50,  img: './assets/heroes/peasant.png',      desc: 'Rustic brown farmer tunic built for hard daily work' },
  { id: 'outfit_explorer',  name: 'Explorer Blue Travel Cloak',category: 'outfits', type: 'outfit', heroId: 'gatherer',       price: 80,  img: './assets/heroes/explorer.png',     desc: 'Blue hooded travel cloak with shoulder satchel' },
  { id: 'outfit_knight',    name: 'Guardian Armor Tabard',     category: 'outfits', type: 'outfit', heroId: 'shield_man',     price: 100, img: './assets/heroes/knight.png',       desc: 'Silver & gold tunic tabard with wooden shield' },
  { id: 'outfit_royal',     name: 'Royal Velvet Gown',         category: 'outfits', type: 'outfit', heroId: 'prince',         price: 150, img: './assets/heroes/royal.png',        desc: 'Purple velvet royal gown with gold embroidery' },
  { id: 'outfit_gryffindor',name: 'Gryffindor Wizard Robes',   category: 'outfits', type: 'outfit', heroId: 'harry_potter',   price: 150, img: './assets/heroes/harry_potter.png', desc: 'Scarlet & gold Gryffindor wizard robes with lightning crest' },
  { id: 'outfit_slytherin', name: 'Slytherin Velvet Cloak',    category: 'outfits', type: 'outfit', heroId: 'draco_malfoy',   price: 150, img: './assets/heroes/draco_malfoy.png',  desc: 'Emerald & silver Slytherin velvet cloak with silver trim' },

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

function renderShopCatalog() {
  const container = document.getElementById('shop-items-container');
  if (!container) return;
  container.innerHTML = '';
  
  const filtered = SHOP_ITEMS.filter(item => item.category === activeCategory);
  
  filtered.forEach(item => {
    const isOwned = state.inventory.includes(item.id);
    
    const card = document.createElement('div');
    card.className = 'shop-item-card';
    card.style.cssText = 'display: flex; flex-direction: column; align-items: center; text-align: center; padding: 18px 14px; background: rgba(14,11,8,0.7); border: 1px solid rgba(245,158,11,0.2); border-radius: 16px; transition: transform 0.2s;';
    card.innerHTML = `
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
    
    container.appendChild(card);
  });
  
  if (window.lucide) window.lucide.createIcons();
  
  // Attach listeners
  container.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      buyItem(id);
    });
  });
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
    // Consumables are activated instantly on purchase for simplicity
    if (item.id === 'booster_potion') {
      heal(40);
      alert('🧪 You drank the Elixir of Life! Restored 40 HP.');
    }
  } else {
    state.inventory.push(item.id);
    alert(`🎉 Purchased ${item.name}! Check your Equipment Drawer to equip it.`);
  }
  
  saveState();
  updateUI();
  updateShopAndInventoryUI();
}

function renderInventory() {
  const backpackContainer = document.getElementById('backpack-items-container');
  const equippedContainer = document.getElementById('equipped-items-container');
  if (!backpackContainer || !equippedContainer) return;
  
  backpackContainer.innerHTML = '';
  equippedContainer.innerHTML = '';
  
  // 1. Render Equipped Items slots
  const headEquip = state.equipped.head || 'none';
  const handEquip = state.equipped.hand || 'none';
  
  const headItem = SHOP_ITEMS.find(item => item.id === headEquip);
  const handItem = SHOP_ITEMS.find(item => item.id === handEquip);
  
  // Sync slot name labels on top of 3D Podium stage
  const slotHeadName = document.getElementById('slot-head-name');
  const slotHandName = document.getElementById('slot-hand-name');
  if (slotHeadName) slotHeadName.textContent = headItem ? headItem.name : 'None';
  if (slotHandName) slotHandName.textContent = handItem ? handItem.name : 'None';

  equippedContainer.innerHTML = `
    <div class="equip-box" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(18,14,9,0.8); border: 1px dashed rgba(245,158,11,0.3); border-radius: 12px; padding: 6px;">
      ${headItem ? `<img src="${headItem.img}" style="width: 36px; height: 36px; object-fit: contain;">` : '<span style="font-size: 10px; color: rgba(245,232,215,0.3);">Head</span>'}
      ${headItem ? `<button class="btn btn-sm secondary-btn unequip-btn" data-slot="head" style="position: absolute; top: -8px; right: -8px; font-size: 9px; padding: 2px 6px; border-radius: 50%; background: #ef4444; color: white; border: none;">✕</button>` : ''}
    </div>
    <div class="equip-box" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(18,14,9,0.8); border: 1px dashed rgba(245,158,11,0.3); border-radius: 12px; padding: 6px;">
      ${handItem ? `<img src="${handItem.img}" style="width: 36px; height: 36px; object-fit: contain;">` : '<span style="font-size: 10px; color: rgba(245,232,215,0.3);">Hand</span>'}
      ${handItem ? `<button class="btn btn-sm secondary-btn unequip-btn" data-slot="hand" style="position: absolute; top: -8px; right: -8px; font-size: 9px; padding: 2px 6px; border-radius: 50%; background: #ef4444; color: white; border: none;">✕</button>` : ''}
    </div>
  `;
  
  // Attach unequip click listeners
  equippedContainer.querySelectorAll('.unequip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = btn.getAttribute('data-slot');
      state.equipped[slot] = 'none';
      saveState();
      updateUI();
      renderInventory();
    });
  });
  
  // 2. Render backpack slots (owned items that are not equipped)
  const backpackItems = state.inventory.filter(itemId => itemId !== headEquip && itemId !== handEquip);
  
  if (backpackItems.length === 0) {
    backpackContainer.innerHTML = '<span class="text-muted text-sm" style="font-size: 11px; color: rgba(245,232,215,0.4); font-style: italic;">Backpack is empty. Purchase gear to equip!</span>';
    return;
  }
  
  backpackItems.forEach(itemId => {
    const itemObj = SHOP_ITEMS.find(item => item.id === itemId);
    if (!itemObj) return;
    
    const slot = document.createElement('div');
    slot.className = 'inventory-slot tooltip';
    slot.style.cssText = 'width: 54px; height: 54px; background: rgba(20,16,11,0.7); border: 1px solid rgba(245,158,11,0.25); border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;';
    slot.setAttribute('data-tooltip', `${itemObj.name} (${itemObj.desc}) - Click to Equip/Activate`);
    slot.innerHTML = `<img src="${itemObj.img}" alt="${itemObj.name}" style="width: 38px; height: 38px; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));">`;
    
    slot.addEventListener('click', () => {
      equipOrActivateItem(itemObj);
    });
    
    backpackContainer.appendChild(slot);
  });
}

function equipOrActivateItem(item) {
  if (item.category === 'accessories') {
    state.equipped[item.type] = item.id;
    alert(`🛡️ Equipped ${item.name} in your ${item.type} slot!`);
  } else if (item.category === 'outfits') {
    if (!state.avatar) state.avatar = {};
    state.avatar.id = item.heroId;
    alert(`👕 Equipped ${item.name}! Your hero is now customized on the Spotlight Podium!`);
  } else if (item.category === 'pets') {
    state.equipped.pet = item.id;
    alert(`🐾 ${item.name} is now accompanying your hero on the Spotlight Podium!`);
  } else if (item.category === 'themes') {
    changeTheme(item.target);
    alert(`🎨 Interface visual theme changed to ${item.name}!`);
  }
  
  // Sync live pet companion image on the Spotlight Podium
  const petImgEl = document.getElementById('shop-podium-pet');
  if (petImgEl && state.equipped.pet) {
    const petObj = SHOP_ITEMS.find(i => i.id === state.equipped.pet);
    if (petObj) {
      petImgEl.src = petObj.img;
      petImgEl.style.display = 'block';
    }
  }

  saveState();
  updateUI();
  renderInventory();
}
