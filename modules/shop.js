/* ==========================================
   ScholarQuest Shop & Inventory Module
   Handles catalog rendering, purchasing, equips
   ========================================== */

import { state, saveState, updateUI, changeTheme, heal } from '../app.js';
import { updateAvatarRender } from './avatar.js';

// Catalog
const SHOP_ITEMS = [
  // Head accessories
  { id: 'wizard_hat', name: 'Wizard Hat', category: 'accessories', type: 'head', price: 60, icon: '🧙', desc: 'Adds +15 Focus power' },
  { id: 'knight_helmet', name: 'Knight Helmet', category: 'accessories', type: 'head', price: 80, icon: '🪖', desc: 'Increases streak protection' },
  { id: 'headphones', name: 'Coder Headphones', category: 'accessories', type: 'head', price: 50, icon: '🎧', desc: 'Enhances logic compilation speed' },
  
  // Hand weapons/shields
  { id: 'light_sword', name: 'Light Sword', category: 'accessories', type: 'hand', price: 100, icon: '⚔️', desc: 'Slashes through difficult code challenges' },
  { id: 'wizard_staff', name: 'Wizard Staff', category: 'accessories', type: 'hand', price: 90, icon: '🪄', desc: 'Cast focus spells during Pomodoro' },
  { id: 'focus_shield', name: 'Focus Shield', category: 'accessories', type: 'hand', price: 75, icon: '🛡️', desc: 'Blocks distractions and maintains streaks' },
  
  // Custom Themes
  { id: 'theme_cyan', name: 'Cyberpunk Cyan Theme', category: 'themes', type: 'theme', target: 'cyan', price: 40, icon: '🎨', desc: 'Unlock glowing cyan theme' },
  { id: 'theme_gold', name: 'Golden Legend Theme', category: 'themes', type: 'theme', target: 'gold', price: 80, icon: '👑', desc: 'Unlock royal gold theme' },
  { id: 'theme_red', name: 'Berserk Red Theme', category: 'themes', type: 'theme', target: 'red', price: 50, icon: '🩸', desc: 'Unlock fire-red combat theme' },
  { id: 'theme_green', name: 'Emerald Forest Theme', category: 'themes', type: 'theme', target: 'green', price: 40, icon: '🌲', desc: 'Unlock peaceful forest theme' },
  
  // Consumable Boosters
  { id: 'booster_potion', name: 'Elixir of Life', category: 'boosters', type: 'consumable', price: 30, icon: '🧪', desc: 'Drink to restore 40 HP instantly' }
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
    card.innerHTML = `
      <span class="item-icon">${item.icon}</span>
      <h3 class="item-title">${item.name}</h3>
      <p class="item-desc">${item.desc}</p>
      
      <div class="item-price-row">
        <i data-lucide="coins" style="width: 12px; height: 12px;"></i>
        <span>${item.price} Coins</span>
      </div>
      
      <button class="btn ${isOwned ? 'secondary-btn' : 'primary-btn'} buy-btn" 
              data-id="${item.id}" 
              ${isOwned && item.type !== 'consumable' ? 'disabled' : ''}>
        ${isOwned && item.type !== 'consumable' ? 'Owned' : 'Purchase'}
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
  
  equippedContainer.innerHTML = `
    <div class="equip-box">
      ${headItem ? headItem.icon : ''}
      <span class="equip-label">Head</span>
      ${headItem ? `<button class="btn btn-sm secondary-btn unequip-btn" data-slot="head" style="position: absolute; top: -10px; right: -10px; font-size: 8px; padding: 2px 4px;">x</button>` : ''}
    </div>
    <div class="equip-box">
      ${handItem ? handItem.icon : ''}
      <span class="equip-label">Hand</span>
      ${handItem ? `<button class="btn btn-sm secondary-btn unequip-btn" data-slot="hand" style="position: absolute; top: -10px; right: -10px; font-size: 8px; padding: 2px 4px;">x</button>` : ''}
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
  // Only accessories and themes can reside in backpack
  const backpackItems = state.inventory.filter(itemId => itemId !== headEquip && itemId !== handEquip);
  
  if (backpackItems.length === 0) {
    backpackContainer.innerHTML = '<span class="text-muted text-sm">Your backpack is empty.</span>';
    return;
  }
  
  backpackItems.forEach(itemId => {
    const itemObj = SHOP_ITEMS.find(item => item.id === itemId);
    if (!itemObj) return;
    
    const slot = document.createElement('div');
    slot.className = 'inventory-slot tooltip';
    slot.setAttribute('data-tooltip', `${itemObj.name} (${itemObj.desc}) - Click to Equip/Activate`);
    slot.innerText = itemObj.icon;
    
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
  } else if (item.category === 'themes') {
    changeTheme(item.target);
    alert(`🎨 Interface visual theme changed to ${item.name}!`);
  }
  
  saveState();
  updateUI();
  renderInventory();
}
