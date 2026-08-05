import React, { useState } from 'react';
import { AVATAR_CHARACTERS, checkUnlock } from '../avatarConfig';

const AvatarSelector = ({
  level = 1,
  golds = 0,
  habitStreakPoints = 0,
  focusPoints = 0,
  studySyncStatus = 'disconnected',
  selectedAvatarId = null,
  onSelect = () => {}
}) => {
  // Current statistics compiled for checks
  const currentStats = {
    level,
    golds,
    habitStreakPoints,
    focusPoints,
    studySyncStatus
  };

  // State management
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  // Tabs structure
  const tabs = [
    { id: 'all', label: 'All Heroes' },
    { id: 'starter', label: 'Starter Pack' },
    { id: 'level', label: 'Level Milestones' },
    { id: 'gold', label: 'Merchant Exchange' },
    { id: 'milestone', label: 'Streaks & Focus' },
    { id: 'misc', label: 'Special Sync' }
  ];

  // Filtering characters based on search and active tab
  const filteredCharacters = AVATAR_CHARACTERS.filter(char => {
    const matchesSearch =
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'starter') return char.tier === 'Base Starter';
    if (activeTab === 'level') {
      return char.tier === 'Level Reward' || char.tier === 'Prestige Tier' || char.tier === 'Legendary';
    }
    if (activeTab === 'gold') return char.tier === 'Gold Exchange';
    if (activeTab === 'milestone') {
      return char.tier === 'Habit Milestone' || char.tier === 'Focus Milestone';
    }
    if (activeTab === 'misc') return char.tier === 'StudySync Link';
    return true;
  });

  // Helper to determine active preview details (hovered character first, then selected character, then default first character)
  const activePreviewChar = hoveredCharacter ||
    AVATAR_CHARACTERS.find(c => c.id === selectedAvatarId) ||
    AVATAR_CHARACTERS[0];

  const previewUnlockStatus = activePreviewChar ? checkUnlock(activePreviewChar, currentStats) : { unlocked: true, reason: '' };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 rounded-2xl bg-[#13110e] border border-amber-950/40 text-amber-100/90 font-sans shadow-2xl max-w-7xl mx-auto selection:bg-amber-800 selection:text-amber-100">
      
      {/* LEFT AREA: Character Selection Controls & Grid */}
      <div className="flex-1 flex flex-col gap-5">
        
        {/* Header and User Stats Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950/60 border border-amber-900/10 p-5 rounded-xl">
          <div>
            <h2 className="text-2xl font-extrabold text-amber-400 font-serif tracking-wide flex items-center gap-2">
              🛡️ Scholar Dojo
            </h2>
            <p className="text-xs text-amber-200/50 mt-1">
              Complete quests, forge habits, and focus to unlock legendary avatars.
            </p>
          </div>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-[#1c1914] px-3 py-1.5 rounded-lg border border-amber-950/40" title="Scholar Level">
              <span className="text-lg">⭐</span>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-amber-200/40 font-semibold leading-none">Level</p>
                <p className="text-sm font-bold text-amber-300 leading-none mt-1">{level}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-[#1c1914] px-3 py-1.5 rounded-lg border border-amber-950/40" title="Gold Coins">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-yellow-500">
                <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.1" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.251-.026a3.375 3.375 0 002.499-3.264V10.75m-3-2.818h3.375c1.196 0 2.207.83 2.455 2.006l.166.784M12 18H9m3-12h3" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-amber-200/40 font-semibold leading-none">Gold</p>
                <p className="text-sm font-bold text-yellow-400 leading-none mt-1">{golds}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#1c1914] px-3 py-1.5 rounded-lg border border-amber-950/40" title="Habit Streak (Bricks)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-red-500">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.1" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="12" y1="3" x2="12" y2="9" />
                <line x1="8" y1="9" x2="8" y2="15" />
                <line x1="16" y1="9" x2="16" y2="15" />
                <line x1="12" y1="15" x2="12" y2="21" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-amber-200/40 font-semibold leading-none">Bricks</p>
                <p className="text-sm font-bold text-red-400 leading-none mt-1">{habitStreakPoints}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#1c1914] px-3 py-1.5 rounded-lg border border-amber-950/40" title="Focus Points (Honey)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8 5h8M6 9h12M4 13h16M6 17h12M8 19h8" />
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-amber-200/40 font-semibold leading-none">Honey</p>
                <p className="text-sm font-bold text-amber-400 leading-none mt-1">{focusPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Filters and Search Box */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Scrollable Category Filter */}
          <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin scrollbar-thumb-amber-950 scrollbar-track-transparent">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-amber-700/25 border-amber-500/60 text-amber-200 shadow-md shadow-amber-900/10'
                    : 'bg-zinc-950/40 border-amber-950/30 text-amber-100/50 hover:text-amber-100/80 hover:bg-[#1a1713]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/60 border border-amber-950/40 rounded-lg px-3.5 py-1.5 pl-9 text-xs text-amber-100 focus:outline-none focus:border-amber-500/50 placeholder:text-amber-100/20"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-100/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-100/40 hover:text-amber-100/80"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Character Selection Grid */}
        <div className="bg-zinc-950/40 border border-amber-950/30 rounded-xl p-4 min-h-[360px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-900/30 scrollbar-track-zinc-950/10">
          {filteredCharacters.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3.5">
              {filteredCharacters.map(char => {
                const { unlocked, reason } = checkUnlock(char, currentStats);
                const isSelected = char.id === selectedAvatarId;

                return (
                  <button
                    key={char.id}
                    onClick={() => unlocked && onSelect(char.id)}
                    onMouseEnter={() => setHoveredCharacter(char)}
                    onMouseLeave={() => setHoveredCharacter(null)}
                    disabled={!unlocked}
                    className={`avatar-grid-btn ${isSelected ? 'selected' : ''}`}
                  >
                    
                    {/* Character Sprite Display Container */}
                    <div 
                      className={`sprite-container ${
                        !unlocked ? 'opacity-40 grayscale contrast-75 brightness-75' : ''
                      }`}
                    >
                      <img
                        src={char.sprite}
                        alt={char.name}
                        className="sprite-image"
                      />
                    </div>

                    {/* Character Name Label */}
                    <span 
                      className={`text-[10px] font-bold text-center mt-2.5 tracking-wider truncate w-full ${
                        isSelected ? 'text-amber-300' : unlocked ? 'text-amber-100/70' : 'text-zinc-600'
                      }`}
                    >
                      {char.name.replace('Mini', '')}
                    </span>

                    {/* Locked State Overlay and Tooltip */}
                    {!unlocked && (
                      <>
                        {/* Tiny Lock Icon Overlay */}
                        <div className="absolute top-1.5 right-1.5 bg-black/80 p-0.5 border border-zinc-800/80 rounded-md text-zinc-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                        </div>
                        
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50 bg-zinc-950 border border-amber-900/30 text-amber-200/90 text-[10px] font-medium rounded-lg py-1.5 px-2.5 w-36 shadow-xl text-center pointer-events-none">
                          <p className="font-semibold text-red-400">Locked</p>
                          <p className="mt-0.5 text-zinc-400 leading-tight">{reason}</p>
                          <div className="w-1.5 h-1.5 bg-zinc-950 border-b border-r border-amber-900/30 transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1"></div>
                        </div>
                      </>
                    )}

                    {/* Unlocked / Selected Indicators */}
                    {unlocked && isSelected && (
                      <div className="absolute top-1.5 right-1.5 bg-amber-500/10 p-0.5 border border-amber-500/40 rounded-md text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-2.5 h-2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-3xl mb-2">🔍</span>
              <p className="text-xs font-semibold text-amber-200/30">No matching characters found.</p>
              <button 
                onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
                className="mt-3 text-[10px] text-amber-400 hover:text-amber-300 font-bold tracking-wider uppercase border border-amber-900/30 rounded-lg px-3 py-1 bg-amber-900/10"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT AREA: Character Details Card / Sidebar */}
      <div className="w-full lg:w-80 bg-zinc-950/60 border border-amber-950/30 rounded-xl p-5 flex flex-col justify-between shadow-lg">
        
        {activePreviewChar ? (
          <div className="flex flex-col h-full justify-between gap-6">
            
            {/* Title / Badge Block */}
            <div className="text-center">
              <div className="inline-block bg-amber-950/20 border border-amber-900/30 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-amber-400">
                {activePreviewChar.tier}
              </div>
              <h3 className="text-xl font-extrabold text-amber-200 font-serif mt-2 tracking-wide">
                {activePreviewChar.name.replace('Mini', '')}
              </h3>
              <p className="text-[10px] text-amber-200/40 uppercase tracking-widest mt-0.5 font-bold">
                {activePreviewChar.pack.replace('villagers', 'Folks: Villagers ')}
              </p>
            </div>

            {/* Render Large Sprite Preview */}
            <div className="flex items-center justify-center py-6 bg-gradient-to-b from-[#181512]/50 to-[#221c17]/30 border border-amber-950/20 rounded-xl relative overflow-hidden group shadow-inner">
              <div 
                className={`sprite-preview-container transition-transform duration-300 group-hover:scale-110 ${
                  !previewUnlockStatus.unlocked ? 'grayscale contrast-50 brightness-50 opacity-40' : ''
                }`}
              >
                <img
                  src={activePreviewChar.sprite}
                  alt={activePreviewChar.name}
                  className="sprite-preview-image"
                />
              </div>

              {/* Locked Overlay Icon on Preview */}
              {!previewUnlockStatus.unlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0a08]/40">
                  <div className="bg-zinc-950 p-2.5 border border-zinc-800 rounded-full text-zinc-500 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Description / Lore and Requirements */}
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div>
                <p className="text-[10px] text-amber-200/35 uppercase font-bold tracking-widest mb-1.5 text-left">Description</p>
                <p className="text-xs text-amber-100/70 leading-relaxed text-left bg-zinc-900/40 p-3 rounded-lg border border-amber-950/10 italic">
                  "{activePreviewChar.description}"
                </p>
              </div>

              <div className="bg-[#1a1612]/60 border border-amber-950/20 p-3 rounded-lg text-left">
                <p className="text-[10px] text-amber-200/35 uppercase font-bold tracking-widest mb-1">Unlock Rule</p>
                {previewUnlockStatus.unlocked ? (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">Unlocked & Ready</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-red-400 font-semibold mt-1 flex items-center gap-1">
                      <span>⚠️ Locked</span>
                    </p>
                    <p className="text-[10px] text-amber-100/60 mt-1 leading-relaxed">{previewUnlockStatus.reason}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4">
              {previewUnlockStatus.unlocked ? (
                <button
                  onClick={() => onSelect(activePreviewChar.id)}
                  disabled={activePreviewChar.id === selectedAvatarId}
                  className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                    activePreviewChar.id === selectedAvatarId
                      ? 'bg-amber-950/25 text-amber-500 border border-amber-900/40 cursor-default'
                      : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-zinc-950 shadow-md shadow-amber-900/20 border border-amber-500/25 active:translate-y-0.5'
                  }`}
                >
                  {activePreviewChar.id === selectedAvatarId ? 'Currently Equipped' : 'Equip Character'}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider bg-zinc-900 text-zinc-600 border border-zinc-950 cursor-not-allowed"
                >
                  Locked
                </button>
              )}
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 text-zinc-500">
            <span className="text-2xl mb-1">🛡️</span>
            <p className="text-xs font-semibold">Hover over a hero to inspect details.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AvatarSelector;
