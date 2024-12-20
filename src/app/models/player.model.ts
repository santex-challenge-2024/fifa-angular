export interface Player {
  id: number;
  face_url: string;
  name: string;
  position: string;
  club: string;
  age?: number;
  attacking_crossing?: number;
  attacking_finishing?: number;
  attacking_heading_accuracy?: number;
  attacking_short_passing?: number;
  attacking_volleys?: number;
  body_type?: string;
  defending?: number;
  defending_marking?: number | null;
  defending_sliding_tackle?: number;
  defending_standing_tackle?: number;
  dribbling?: number;
  fifa_update?: string;
  fifa_version?: string;
  goalkeeping_diving?: number;
  goalkeeping_handling?: number;
  goalkeeping_kicking?: number;
  goalkeeping_positioning?: number;
  goalkeeping_reflexes?: number;
  goalkeeping_speed?: number;
  height_cm?: number;
  international_reputation?: number;
  long_name?: string;
  mentality_aggression?: number;
  mentality_composure?: number;
  mentality_interceptions?: number;
  mentality_penalties?: number;
  mentality_positioning?: number;
  mentality_vision?: number;
  movement_acceleration?: number;
  movement_agility?: number;
  movement_balance?: number;
  movement_reactions?: number;
  movement_sprint_speed?: number;
  nationality_name?: string;
  overall?: number;
  pace?: number;
  passing?: number;
  physic?: number;
  player_positions?: string;
  player_traits?: string;
  potential?: number;
  power_jumping?: number;
  power_long_shots?: number;
  power_shot_power?: number;
  power_stamina?: number;
  power_strength?: number;
  preferred_foot?: string;
  shooting?: number;
  skill_ball_control?: number;
  skill_curve?: number;
  skill_dribbling?: number;
  skill_fk_accuracy?: number;
  skill_long_passing?: number;
  skill_moves?: number;
  value_eur?: number;
  wage_eur?: number;
  weak_foot?: number;
  weight_kg?: number;
  work_rate?: string;
}
