// ScholarQuest Avatar Configuration and Unlock System
// Mapped from MiniFolks assets (humans, villagers, villagers2/original)

// Imports for Villagers 2 (Original)
import miniBlacksmith from './assets/characters/villagers2/original/MiniBlacksmith.png';
import miniGatherer from './assets/characters/villagers2/original/MiniGatherer.png';
import miniGraveDigger from './assets/characters/villagers2/original/MiniGraveDigger.png';
import miniHunter from './assets/characters/villagers2/original/MiniHunter.png';
import miniLumberjack from './assets/characters/villagers2/original/MiniLumberjack.png';
import miniMerchant from './assets/characters/villagers2/original/MiniMerchant.png';
import miniMiner from './assets/characters/villagers2/original/MiniMiner.png';
import miniNun from './assets/characters/villagers2/original/MiniNun.png';
import miniSuspiciousMerchant from './assets/characters/villagers2/original/MiniSuspiciousMerchant.png';
import miniThief from './assets/characters/villagers2/original/MiniThief.png';

// Imports for Humans
import miniShieldMan from './assets/characters/humans/MiniShieldMan.png';
import miniMage from './assets/characters/humans/MiniMage.png';
import miniArcherMan from './assets/characters/humans/MiniArcherMan.png';
import miniCavalierMan from './assets/characters/humans/MiniCavalierMan.png';
import miniSwordMan from './assets/characters/humans/MiniSwordMan.png';
import miniCrossBowMan from './assets/characters/humans/MiniCrossBowMan.png';
import miniKingMan from './assets/characters/humans/MiniKingMan.png';
import miniHalberdMan from './assets/characters/humans/MiniHalberdMan.png';
import miniSpearMan from './assets/characters/humans/MiniSpearMan.png';
import miniPrinceMan from './assets/characters/humans/MiniPrinceMan.png';
import miniArchMage from './assets/characters/humans/MiniArchMage.png';
import miniHorseMan from './assets/characters/humans/MiniHorseMan.png';

// Imports for Villagers
import miniNobleWoman from './assets/characters/villagers/MiniNobleWoman.png';
import miniOldWoman from './assets/characters/villagers/MiniOldWoman.png';
import miniWorker from './assets/characters/villagers/MiniWorker.png';
import miniPeasant from './assets/characters/villagers/MiniPeasant.png';
import miniNobleMan from './assets/characters/villagers/MiniNobleMan.png';
import miniOldMan from './assets/characters/villagers/MiniOldMan.png';
import miniVillagerMan from './assets/characters/villagers/MiniVillagerMan.png';
import miniPrincess from './assets/characters/villagers/MiniPrincess.png';
import miniVillagerWoman from './assets/characters/villagers/MiniVillagerWoman.png';
import miniQueen from './assets/characters/villagers/MiniQueen.png';

export const AVATAR_CHARACTERS = [
  // --- BASE / STARTER TIER (Unlocked by Default) ---
  {
    id: 'peasant',
    name: 'Peasant',
    sprite: miniPeasant,
    pack: 'villagers',
    tier: 'Base Starter',
    unlockType: 'default',
    unlockValue: null,
    description: 'A humble beginner scholar. Honest work and eager to learn.',
  },
  {
    id: 'worker',
    name: 'Worker',
    sprite: miniWorker,
    pack: 'villagers',
    tier: 'Base Starter',
    unlockType: 'default',
    unlockValue: null,
    description: 'Builds their knowledge foundation brick by brick.',
  },
  {
    id: 'villager_man',
    name: 'Villager Scholar (M)',
    sprite: miniVillagerMan,
    pack: 'villagers',
    tier: 'Base Starter',
    unlockType: 'default',
    unlockValue: null,
    description: 'A standard scholar avatar dedicated to daily learning tasks.',
  },
  {
    id: 'villager_woman',
    name: 'Villager Scholar (F)',
    sprite: miniVillagerWoman,
    pack: 'villagers',
    tier: 'Base Starter',
    unlockType: 'default',
    unlockValue: null,
    description: 'An enthusiastic student ready to complete core quizzes.',
  },

  // --- COGNITIVE / LEVEL UNLOCKS ---
  {
    id: 'gatherer',
    name: 'Gatherer',
    sprite: miniGatherer,
    pack: 'villagers2',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 2,
    description: 'Gathers notes and references from all online tutorials.',
  },
  {
    id: 'lumberjack',
    name: 'Lumberjack',
    sprite: miniLumberjack,
    pack: 'villagers2',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 3,
    description: 'Chops down complex problems into manageable micro-tasks.',
  },
  {
    id: 'miner',
    name: 'Miner',
    sprite: miniMiner,
    pack: 'villagers2',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 4,
    description: 'Digs deep into textbooks and core documentation.',
  },
  {
    id: 'shield_man',
    name: 'Shield Defender',
    sprite: miniShieldMan,
    pack: 'humans',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 5,
    description: 'Defends their study streak from external distractions.',
  },
  {
    id: 'hunter',
    name: 'Hunter',
    sprite: miniHunter,
    pack: 'villagers2',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 6,
    description: 'Hunts down rare bugs and solves performance leaks.',
  },
  {
    id: 'sword_man',
    name: 'Sword Fighter',
    sprite: miniSwordMan,
    pack: 'humans',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 8,
    description: 'Slashes through complex code challenges with confidence.',
  },
  {
    id: 'grave_digger',
    name: 'Grave Digger',
    sprite: miniGraveDigger,
    pack: 'villagers2',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 9,
    description: 'Buries outdated concepts and deprecated libraries.',
  },
  {
    id: 'prince',
    name: 'Prince',
    sprite: miniPrinceMan,
    pack: 'humans',
    tier: 'Prestige Tier',
    unlockType: 'level',
    unlockValue: 10,
    description: 'Royal descendant who has mastered mid-tier curriculum.',
  },
  {
    id: 'princess',
    name: 'Princess',
    sprite: miniPrincess,
    pack: 'villagers',
    tier: 'Prestige Tier',
    unlockType: 'level',
    unlockValue: 10,
    description: 'Noble scholar excelling in algorithmic synchronization.',
  },
  {
    id: 'old_man',
    name: 'Sage Mentor (M)',
    sprite: miniOldMan,
    pack: 'villagers',
    tier: 'Prestige Tier',
    unlockType: 'level',
    unlockValue: 12,
    description: 'A wise advisor who guides students through difficult semesters.',
  },
  {
    id: 'old_woman',
    name: 'Sage Mentor (F)',
    sprite: miniOldWoman,
    pack: 'villagers',
    tier: 'Prestige Tier',
    unlockType: 'level',
    unlockValue: 12,
    description: 'Possesses decades of experience in software engineering concepts.',
  },
  {
    id: 'noble_man',
    name: 'Noble Lord',
    sprite: miniNobleMan,
    pack: 'villagers',
    tier: 'Prestige Tier',
    unlockType: 'level',
    unlockValue: 15,
    description: 'Patron of the arts and compiler optimizations.',
  },
  {
    id: 'noble_woman',
    name: 'Noble Lady',
    sprite: miniNobleWoman,
    pack: 'villagers',
    tier: 'Prestige Tier',
    unlockType: 'level',
    unlockValue: 15,
    description: 'Exquisite scholar who drafts elegant structural designs.',
  },
  {
    id: 'king',
    name: 'King',
    sprite: miniKingMan,
    pack: 'humans',
    tier: 'Legendary',
    unlockType: 'level',
    unlockValue: 20,
    description: 'Ruler of the ScholarQuest leaderboards.',
  },
  {
    id: 'queen',
    name: 'Queen',
    sprite: miniQueen,
    pack: 'villagers',
    tier: 'Legendary',
    unlockType: 'level',
    unlockValue: 20,
    description: 'Supreme organizer of multiplayer study sync strategies.',
  },

  // --- GOLD SHOP UNLOCKS ---
  {
    id: 'merchant',
    name: 'Gold Shop Merchant',
    sprite: miniMerchant,
    pack: 'villagers2',
    tier: 'Gold Exchange',
    unlockType: 'gold',
    unlockValue: 150,
    description: 'Owner of the Honesty Gold Shop. Unlocks for custom trade.',
  },
  {
    id: 'blacksmith',
    name: 'Blacksmith',
    sprite: miniBlacksmith,
    pack: 'villagers2',
    tier: 'Gold Exchange',
    unlockType: 'gold',
    unlockValue: 200,
    description: 'Forges powerful learning habits and workspace themes.',
  },
  {
    id: 'suspicious_merchant',
    name: 'Suspicious Merchant',
    sprite: miniSuspiciousMerchant,
    pack: 'villagers2',
    tier: 'Gold Exchange',
    unlockType: 'gold',
    unlockValue: 250,
    description: 'Offers mysterious items and secret cheat sheets.',
  },
  {
    id: 'thief',
    name: 'Thief',
    sprite: miniThief,
    pack: 'villagers2',
    tier: 'Gold Exchange',
    unlockType: 'gold',
    unlockValue: 300,
    description: 'Steals focus back from endless social media scrolling.',
  },

  // --- HABIT STREAK (BRICKS) UNLOCKS ---
  {
    id: 'archer',
    name: 'Habit Archer',
    sprite: miniArcherMan,
    pack: 'humans',
    tier: 'Habit Milestone',
    unlockType: 'habit',
    unlockValue: 5,
    description: 'Hits habit goals with precision. Streak level 5 required.',
  },
  {
    id: 'crossbow_man',
    name: 'Crossbow Marksman',
    sprite: miniCrossBowMan,
    pack: 'humans',
    tier: 'Habit Milestone',
    unlockType: 'habit',
    unlockValue: 12,
    description: 'Rapid-fires study sessions. Streak level 12 required.',
  },

  // --- FOCUS POINTS (HONEY) UNLOCKS ---
  {
    id: 'mage',
    name: 'Study Mage',
    sprite: miniMage,
    pack: 'humans',
    tier: 'Focus Milestone',
    unlockType: 'focus',
    unlockValue: 50,
    description: 'Manipulates time to maximize focus. 50 Focus Points required.',
  },
  {
    id: 'arch_mage',
    name: 'Grand Archmage',
    sprite: miniArchMage,
    pack: 'humans',
    tier: 'Focus Milestone',
    unlockType: 'focus',
    unlockValue: 150,
    description: 'Transcends simple Pomodoros. 150 Focus Points required.',
  },

  // --- STUDY SYNC STATUS (HOUSE) UNLOCKS ---
  {
    id: 'nun',
    name: 'Wellness Cleric',
    sprite: miniNun,
    pack: 'villagers2',
    tier: 'StudySync Link',
    unlockType: 'studysync',
    unlockValue: 'connected',
    description: 'Ensures wellness breaks during group study. Active StudySync Room required.',
  },

  // --- OTHER EXTRAS FOR EXTENSIBILITY ---
  {
    id: 'halberd_man',
    name: 'Halberdier',
    sprite: miniHalberdMan,
    pack: 'humans',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 7,
    description: 'Guards the entrance to the Focus Arena.',
  },
  {
    id: 'spear_man',
    name: 'Spear Guardsman',
    sprite: miniSpearMan,
    pack: 'humans',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 6,
    description: 'Keeps track of daily tasks and minor quests.',
  },
  {
    id: 'horse_man',
    name: 'Horse Rider',
    sprite: miniHorseMan,
    pack: 'humans',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 11,
    description: 'Travels between CodeScroll compiler layers.',
  },
  {
    id: 'cavalier_man',
    name: 'Cavalier Knight',
    sprite: miniCavalierMan,
    pack: 'humans',
    tier: 'Level Reward',
    unlockType: 'level',
    unlockValue: 14,
    description: 'Honored academician who defends standard protocols.',
  }
];

export const checkUnlock = (character, stats) => {
  const {
    level = 1,
    golds = 0,
    habitStreakPoints = 0,
    focusPoints = 0,
    studySyncStatus = 'disconnected'
  } = stats;

  switch (character.unlockType) {
    case 'default':
      return { unlocked: true, reason: 'Starter Avatar' };
    case 'level':
      return {
        unlocked: level >= character.unlockValue,
        reason: `Requires Level ${character.unlockValue} (Current: ${level})`
      };
    case 'gold':
      return {
        unlocked: golds >= character.unlockValue,
        reason: `Requires ${character.unlockValue} Gold Coins (Current: ${golds})`
      };
    case 'habit':
      return {
        unlocked: habitStreakPoints >= character.unlockValue,
        reason: `Requires Habit Streak of ${character.unlockValue} (Current: ${habitStreakPoints})`
      };
    case 'focus':
      return {
        unlocked: focusPoints >= character.unlockValue,
        reason: `Requires ${character.unlockValue} Focus Points (Current: ${focusPoints})`
      };
    case 'studysync':
      const isConnected = studySyncStatus === 'connected' || studySyncStatus === 'active' || studySyncStatus === true;
      return {
        unlocked: !!isConnected,
        reason: `Requires active StudySync room connection`
      };
    default:
      return { unlocked: true, reason: '' };
  }
};
