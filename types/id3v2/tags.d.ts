
import type * as frames from './frames';

export interface MP3TagTagsV2Defined {
  v2: {
    APIC?: frames.MP3TagAPICFrame;
    COMM?: Array<frames.MP3TagLangDescFrame>;
    ETCO?: frames.MP3TagETCOFrame;
    GEOB?: Array<frames.MP3TagGEOBFrame>;
    IPLS?: Array<string>;
    MCDI?: frames.MP3TagMCDIFRame;
    OWNE?: frames.MP3TagOWNEFrame;
    PCNT?: frames.MP3TagTextFrame;
    PRIV?: Array<frames.MP3TagPRIVFrame>;
    RVAD?: frames.MP3TagRVADFrame;
    RVA2?: Array<frames.MP3TagRVA2Frame>;
    SIGN?: Array<frames.MP3TagSIGNFrame>;
    SYLT?: Array<frames.MP3TagSYLTFrame>;
    SYTC?: frames.MP3TagSYTCFrame;
    TALB?: frames.MP3TagTextFrame;
    TBPM?: frames.MP3TagTextFrame;
    TCOM?: frames.MP3TagTextFrame;
    TCON?: frames.MP3TagTextFrame;
    TCOP?: frames.MP3TagTextFrame;
    TDAT?: frames.MP3TagTextFrame;
    TDEN?: frames.MP3TagTextFrame;
    TDLY?: frames.MP3TagTextFrame;
    TDOR?: frames.MP3TagTextFrame;
    TDRC?: frames.MP3TagTextFrame;
    TDRL?: frames.MP3TagTextFrame;
    TDTG?: frames.MP3TagTextFrame;
    TENC?: frames.MP3TagTextFrame;
    TEXT?: frames.MP3TagTextFrame;
    TFLT?: frames.MP3TagTextFrame;
    TIME?: frames.MP3TagTextFrame;
    TIPL?: frames.MP3TagTextFrame;
    TIT1?: frames.MP3TagTextFrame;
    TIT2?: frames.MP3TagTextFrame;
    TIT3?: frames.MP3TagTextFrame;
    TKEY?: frames.MP3TagTextFrame;
    TLAN?: frames.MP3TagTextFrame;
    TLEN?: frames.MP3TagTextFrame;
    TMCL?: frames.MP3TagTextFrame;
    TMED?: frames.MP3TagTextFrame;
    TMOO?: frames.MP3TagTextFrame;
    TOAL?: frames.MP3TagTextFrame;
    TOFN?: frames.MP3TagTextFrame;
    TOLY?: frames.MP3TagTextFrame;
    TOPE?: frames.MP3TagTextFrame;
    TORY?: frames.MP3TagTextFrame;
    TOWN?: frames.MP3TagTextFrame;
    TPE1?: frames.MP3TagTextFrame;
    TPE2?: frames.MP3TagTextFrame;
    TPE3?: frames.MP3TagTextFrame;
    TPE4?: frames.MP3TagTextFrame;
    TPOS?: frames.MP3TagTextFrame;
    TPRO?: frames.MP3TagTextFrame;
    TPUB?: frames.MP3TagTextFrame;
    TRCK?: frames.MP3TagTextFrame;
    TRDA?: frames.MP3TagTextFrame;
    TRSN?: frames.MP3TagTextFrame;
    TRSO?: frames.MP3TagTextFrame;
    TSIZ?: frames.MP3TagTextFrame;
    TSOA?: frames.MP3TagTextFrame;
    TSOC?: frames.MP3TagTextFrame;
    TSOP?: frames.MP3TagTextFrame;
    TSOT?: frames.MP3TagTextFrame;
    TSRC?: frames.MP3TagTextFrame;
    TSSE?: frames.MP3TagTextFrame;
    TSST?: frames.MP3TagTextFrame;
    TYER?: frames.MP3TagTextFrame;
    TXXX?: Array<frames.MP3TagTXXXFrame>;
    UFID?: Array<frames.MP3TagUFIDFrame>;
    USER?: frames.MP3TagUFIDFrame;
    USLT?: Array<frames.MP3TagLangDescFrame>;
    WCOM?: frames.MP3TagTextFrame;
    WCOP?: frames.MP3TagTextFrame;
    WOAF?: frames.MP3TagTextFrame;
    WOAR?: frames.MP3TagTextFrame;
    WOAS?: frames.MP3TagTextFrame;
    WORS?: frames.MP3TagTextFrame;
    WPAY?: frames.MP3TagTextFrame;
    WPUB?: frames.MP3TagTextFrame;
    WXXX?: Array<frames.MP3TagWXXXFrame>;
    WFED?: frames.MP3TagTextFrame;
    TGID?: frames.MP3TagTextFrame;
  };
  v2Details: {
    version: Array<number>;
    size: number;
    flags: {
      unsynchronisation: boolean;
      extendedHeader: boolean;
      experimentalIndicator: boolean;
    }
  };
}

export type MP3TagTagsV2 = MP3TagTagsV2Defined | never;
