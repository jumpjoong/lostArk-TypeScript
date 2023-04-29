export interface ObjectCharacter {
  CharacterClassName: string;
  CharacterImage?: string;
  CharacterLevel: number;
  CharacterName: string;
  ExpeditionLevel: number;
  GuildMemberGrade?: string;
  GuildName?: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
  PvpGradeName?: string;
  ServerName: string;
  Stats: object[];
  Tendencies: object[];
  Title?: string | null;
  TotalSkillPoint: number;
  TownLevel: number;
  TownName: string;
  UsingSkillPoint: number;
}

export interface Effects {
  Description: string;
  GemSlot: number;
  Icon: string;
  Name: string;
  Tooltip: string;
}

export interface Gems {
  Grade: string;
  Icon: string;
  Level: number;
  Name: string;
  Slot: number;
  Tooltip: number;
}