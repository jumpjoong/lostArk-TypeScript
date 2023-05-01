//로스트아크 api 넘어올 때 대문자로 넘어옴
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
  Tendencies: {
    MaxPoint: number;
    Point: number;
    Type : string;
  }[];
  Title?: string | null;
  TotalSkillPoint: number;
  TownLevel: number;
  TownName: string;
  UsingSkillPoint: number;
}

export interface Effects {
  Description: string | null;
  GemSlot: number | null;
  Icon: string | null;
  Name: string | null ;
  Tooltip: string | null;
}

export interface Gems {
  Effects: [{
    Description: string | null;
    GemSlot: number | null;
    Icon: string | null;
    Name: string | null;
    Tooltip: string | null;
  }] | null;
  Gems: Array<{
    Grade: string | null;
    Icon: string | null;
    Level: number | null;
    Name: string | null | TrustedHTML;
    Slot: number | null;
    Tooltip: number | null;
  }>;
}

export interface Weapon {
  Grade: string | null;
  Icon: string | null;
  Name: string | null;
  Tooltip: string | null;
  Type: string | null;
}
