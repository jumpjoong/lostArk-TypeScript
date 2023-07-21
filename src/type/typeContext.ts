//로스트아크 api 넘어올 때 대문자로 넘어옴
export interface ObjectCharacter {
  CharacterClassName: string;
  CharacterImage: string;
  CharacterLevel: number;
  CharacterName: string;
  ExpeditionLevel: number;
  GuildMemberGrade: string | null;
  GuildName: string | null;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
  PvpGradeName: string | null;
  ServerName: string;
  Stats: object[];
  Tendencies: {
    MaxPoint: number;
    Point: number;
    Type : string;
  }[];
  Title: string | null;
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

export interface GemsType {
  Grade: string | null;
  Icon: string | null;
  Level: number | null;
  Name: string | null | TrustedHTML;
  Slot: number | null;
  Tooltip: ElementNumber | null;
}

export interface Weapon {
  Grade: string | null;
  Icon: string | null;
  Name: string | null;
  Tooltip: string | null;
  Type: string | null;
}

export interface AblillityStoneDetail {
  type: string ,
  value: AblillityStoneDetailValue
}

export interface QualityCurrent {
  Element_001: QualityCurrentDetail,
  Element_002: QualityCurrentDetail,
  Element_003: QualityCurrentDetail,
  Element_004: QualityCurrentDetail,
  [key: string]: QualityCurrentDetail
}

interface AblillityStoneDetailValue {
  Element_000: ContentStr;
}

interface ContentStr {
  contentStr: ElementNumber;
}

export interface ElementNumber {
  Element_001: GemsDetails;
  Element_002: GemsDetails;
  Element_003: GemsDetails;
  Element_004: GemsDetails;
  [key: string]: any | GemsDetails;
}

interface GemsDetails {
  type: string,
  value: GemsDeatailsElement,
}

interface GemsDeatailsElement {
  Element_000: string;
  Element_001: string;
}

interface QualityCurrentDetail {
  type: string,
  value: QualityCurrentDetailValue
}

interface QualityCurrentDetailValue {
  leftStr0: string,
  leftStr1: string,
  leftStr2: string,
  qualityValue: number,
  rightStr0: string,
  slotData: object
}