/**
 * Aces Behavior Profiles - Custom Definition
 * Sourced from BattleTech Aces Alpha Strike
 */

const ACES_PROFILES = {
  roles: {
    Scout: {
      profile: "Aggressive Flanker",
      preferredRange: "short",
      movement: {
        healthy: "advance_fast",
        moderate: "flank_or_reposition",
        critical: "withdraw"
      },
      attack: {
        risk: {
          conservative: "take_safe_shots",
          balanced: "fire_primary_weapons",
          aggressive: "push_heat_and_fire_all"
        }
      }
    },

    Skirmisher: {
      profile: "Opportunistic Harasser",
      preferredRange: "medium",
      movement: {
        healthy: "circle_and_harass",
        moderate: "seek_cover_and_fire",
        critical: "withdraw"
      },
      attack: {
        risk: {
          conservative: "fire_when_safe",
          balanced: "fire_primary_weapons",
          aggressive: "take_low_odds_shots"
        }
      }
    },

    Brawler: {
      profile: "Direct Assault",
      preferredRange: "short",
      movement: {
        healthy: "close_distance",
        moderate: "maintain_pressure",
        critical: "fallback_or_hold"
      },
      attack: {
        risk: {
          conservative: "fire_primary_only",
          balanced: "fire_all_safe_weapons",
          aggressive: "alpha_strike_if_possible"
        }
      }
    },

    Sniper: {
      profile: "Long-Range Fire",
      preferredRange: "long",
      movement: {
        healthy: "maintain_range",
        moderate: "reposition",
        critical: "withdraw"
      },
      attack: {
        risk: {
          conservative: "fire_long_range_only",
          balanced: "fire_optimal_weapons",
          aggressive: "push_heat_for_range"
        }
      }
    },

    FireSupport: {
      profile: "Anchored Support",
      preferredRange: "long",
      movement: {
        healthy: "hold_position",
        moderate: "shift_to_cover",
        critical: "withdraw"
      },
      attack: {
        risk: {
          conservative: "indirect_fire_only",
          balanced: "fire_if_safe",
          aggressive: "fire_all_indirect_and_direct"
        }
      }
    },

    Assault: {
      profile: "Slow Advance",
      preferredRange: "medium",
      movement: {
        healthy: "advance_slowly",
        moderate: "anchor_position",
        critical: "fallback"
      },
      attack: {
        risk: {
          conservative: "fire_primary_only",
          balanced: "fire_all_safe_weapons",
          aggressive: "alpha_strike_if_possible"
        }
      }
    }
  },

  factions: {
    Clan: {
      quirks: {
        rangeDiscipline: true,
        avoidDishonorableShots: true
      },
      modifiers: {
        aggressive: 0,
        riskTolerance: "balanced"
      }
    },
    Kurita: {
      quirks: {
        berserkerOnDamage: true
      },
      modifiers: {
        aggressive: 1,
        riskTolerance: "high"
      }
    },
    Davion: {
      quirks: {
        focusFire: true
      },
      modifiers: {
        aggressive: 0,
        riskTolerance: "balanced"
      }
    },
    Liao: {
      quirks: {
        ambushPreference: true
      },
      modifiers: {
        aggressive: -1,
        riskTolerance: "low"
      }
    },
    Steiner: {
      quirks: {
        holdGround: true
      },
      modifiers: {
        aggressive: -1,
        riskTolerance: "low"
      }
    },
    Marik: {
      quirks: {
        opportunistic: true
      },
      modifiers: {
        aggressive: 0,
        riskTolerance: "balanced"
      }
    },
    Mercenary: {
      quirks: {
        variableDiscipline: true
      },
      modifiers: {
        aggressive: 0,
        riskTolerance: "variable"
      }
    }
  },

  objectives: {
    DestroyEnemy: {
      movementBias: "toward_enemy",
      targetPriority: ["highest_threat", "closest", "damaged_enemy"]
    },
    HoldGround: {
      movementBias: "stay_near_objective",
      targetPriority: ["closest", "threat_to_objective"]
    },
    CaptureObjective: {
      movementBias: "toward_objective",
      targetPriority: ["unit_blocking_objective", "closest"]
    },
    DelayEnemy: {
      movementBias: "harass_and_fall_back",
      targetPriority: ["fastest_enemy", "closest"]
    },
    Escort: {
      movementBias: "stay_with_vip",
      targetPriority: ["threat_to_vip", "closest"]
    }
  },

  roundEndTriggers: {
    damage: {
      light: null,
      moderate: "cautious",
      heavy: "defensive",
      critical: "withdraw"
    },
    enemyRangeShift: {
      enemy_close: "switch_to_short_range_behavior",
      enemy_far: "switch_to_long_range_behavior"
    },
    objectiveShift: {
      urgent: "switch_to_objective_runner",
      irrelevant: "switch_to_aggressive"
    },
    factionTriggers: {
      Kurita: {
        heavyDamage: "berserker"
      },
      Clan: {
        enemyTooClose: "reposition"
      },
      Liao: {
        enemyExposed: "ambush"
      }
    }
  }
};

/**
 * Evaluate behavior effects based on simple questions
 * @param {Object} answers - User answers to simple questions
 * @returns {Object} Behavior decision and TN modifiers
 */
function evaluateAcesBehavior(answers) {
  const {
    role = "Skirmisher",
    faction = "Davion",
    objective = "DestroyEnemy",
    unitHealth = "healthy",
    enemyDistance = "medium",
    riskTolerance = "balanced"
  } = answers;

  // Get profile and faction data
  const roleProfile = ACES_PROFILES.roles[role];
  const factionData = ACES_PROFILES.factions[faction];
  const objectiveData = ACES_PROFILES.objectives[objective];

  if (!roleProfile || !factionData || !objectiveData) {
    return { error: "Invalid role, faction, or objective" };
  }

  // Determine movement behavior
  let movementBehavior = roleProfile.movement[unitHealth] || "hold_position";
  let attackBehavior =
    roleProfile.attack.risk[riskTolerance] || roleProfile.attack.risk.balanced;

  // Calculate TN modifiers based on behavior
  let tnModifier = 0;
  let rationale = [];

  // Faction modifier
  tnModifier += factionData.modifiers.aggressive;
  if (factionData.modifiers.aggressive > 0) {
    rationale.push(`${faction} aggressive behavior (+${factionData.modifiers.aggressive})`);
  } else if (factionData.modifiers.aggressive < 0) {
    rationale.push(`${faction} cautious behavior (${factionData.modifiers.aggressive})`);
  }

  // Role-based modifier
  switch (role) {
    case "Scout":
      tnModifier -= 1; // Aggressive, good at close range
      rationale.push("Scout: aggressive flanker (-1)");
      break;
    case "Skirmisher":
      // Balanced, no modifier
      rationale.push("Skirmisher: balanced tactics (0)");
      break;
    case "Brawler":
      tnModifier -= 1; // Good at melee/close
      rationale.push("Brawler: direct assault (-1)");
      break;
    case "Sniper":
      tnModifier -= 1; // Careful aiming
      rationale.push("Sniper: calculated shots (-1)");
      break;
    case "FireSupport":
      tnModifier += 1; // Less direct engagement
      rationale.push("FireSupport: anchored support (+1)");
      break;
    case "Assault":
      // Balanced, no modifier
      rationale.push("Assault: slow advance (0)");
      break;
  }

  // Health state modifier
  let healthMod = 0;
  switch (unitHealth) {
    case "healthy":
      healthMod = 0;
      break;
    case "moderate":
      healthMod = 1;
      rationale.push("Moderate damage: cautious (+1)");
      break;
    case "critical":
      healthMod = 2;
      rationale.push("Critical damage: defensive (+2)");
      break;
  }
  tnModifier += healthMod;

  // Enemy distance modifier (affects preferred range engagement)
  let distanceMod = 0;
  const preferredRange = roleProfile.preferredRange;
  if (enemyDistance === "close" && preferredRange !== "short") {
    distanceMod = 1;
    rationale.push("Enemy closer than preferred range (+1)");
  } else if (enemyDistance === "far" && preferredRange === "short") {
    distanceMod = 1;
    rationale.push("Enemy farther than preferred range (+1)");
  } else if (enemyDistance === "optimal") {
    distanceMod = -1;
    rationale.push("Engagement at preferred range (-1)");
  }
  tnModifier += distanceMod;

  // Risk tolerance modifier
  if (riskTolerance === "aggressive") {
    tnModifier -= 1;
    rationale.push("Aggressive risk tolerance (-1)");
  } else if (riskTolerance === "conservative") {
    tnModifier += 1;
    rationale.push("Conservative risk tolerance (+1)");
  }

  return {
    role,
    faction,
    objective,
    unitHealth,
    enemyDistance,
    riskTolerance,
    movementBehavior,
    attackBehavior,
    tnModifier,
    rationale,
    profile: roleProfile.profile,
    factionQuirks: Object.keys(factionData.quirks).filter(k => factionData.quirks[k])
  };
}

// Export for use in HTML
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ACES_PROFILES,
    evaluateAcesBehavior
  };
}
