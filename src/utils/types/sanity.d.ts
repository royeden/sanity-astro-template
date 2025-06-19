import type { SanityQueries } from "@sanity/client";
import type * as Sanity from "../../sanity/types";
import type {
  DeepRequired,
  LastInUnion,
  Trim,
  WalkObjectPath,
} from "./utility";

export type SanityTypedSchemas = Extract<
  Sanity.AllSanitySchemaTypes,
  { _type: any }
>;

export type AllSanityTypedNamedspaceSchemas = keyof {
  [Key in SanityTypedSchemas["_type"] as Key extends `${infer Start}.${infer Rest}`
    ? Start
    : Key]: Key;
};

export type GetSanityTypedSchemasFor<
  Namespace extends AllSanityTypedNamedspaceSchemas,
> = {
  [Key in SanityTypedSchemas["_type"] as Key extends `${Namespace}${infer Rest}`
    ? Key
    : never]: Extract<SanityTypedSchemas, { _type: Key }>;
};

// Really basic params parser for some basic query cases, supports up to one typed param for now...
type SanityQueryTermSeparator = "&&" | "||";
type SanityQueryStartSeparator = "[" | SanityQueryTermSeparator;
type SanityQueryEndSeparator = "]" | SanityQueryTermSeparator;

export type GetSanityTypedQueryType<Query extends keyof SanityQueries> =
  Query extends `${infer Start}_type == "${infer SanityType}"${infer Rest}`
    ? SanityType
    : Query extends `${infer Start}"${infer SanityType}" == _type${infer Rest}`
      ? SanityType
      : never;

type ParseSanityTypedParamName<S extends string> =
  S extends `${string}$${infer SectionWithParamName}`
    ? SectionWithParamName extends `${infer StringWithParamName} == ${string}`
      ? StringWithParamName extends `${infer ParamName}${SanityQueryTermSeparator}${string}`
        ? Trim<ParamName>
        : StringWithParamName
      : SectionWithParamName extends `${infer ParamName}${SanityQueryEndSeparator}${string}`
        ? ParamName
        : never
    : never;
// type ParseSanityTypedParamName<S extends string> =
//   S extends `${string}${SanityQueryStartSeparator}${infer Match}${SanityQueryEndSeparator}`
//     ? Match extends `${infer Start} == ${infer End}`
//       ? Start extends `$${infer ParamName}${SanityQueryTermSeparator | " "}`
//         ? ParamName
//         : End extends ?`${string}${SanityQueryTermSeparator}${infer Rest}`
//           ? ParseSanityTypedParamName<Trim<Rest>>
//           : "never1"
//       : "never2"
//     : S extends `${infer Match}${SanityQueryEndSeparator}${string}`
//       ? Match extends `${infer Start} == ${infer End}`
//         ? Start extends `$${infer ParamName}${SanityQueryTermSeparator | " "}`
//           ? ParamName
//           : End extends ?`${string}${SanityQueryTermSeparator}${infer Rest}`
//             ? ParseSanityTypedParamName<Trim<Rest>>
//             : Match
//         : "never4"
//       : "S";

export type GetSanityTypedQueryParamNames<Query extends keyof SanityQueries> =
  ParseSanityTypedParamName<Query>;

export type GetSanityTypedQueryParamMatch<
  Query extends keyof SanityQueries,
  ParamName extends string = GetSanityTypedQueryParamNames<Query>,
> = Query extends `${string}$${ParamName} == ${infer SectionWithParamMatch}`
  ? SectionWithParamMatch extends `${infer StringWithParamMatch}${SanityQueryEndSeparator}${string}`
    ? StringWithParamMatch extends `${infer ParamMatch}${SanityQueryTermSeparator}${string}`
      ? Trim<ParamMatch>
      : Trim<StringWithParamMatch>
    : never
  : Query extends `${infer SectionWithParamMatch} == $${ParamName}${string}`
    ? SectionWithParamMatch extends `${string}${SanityQueryStartSeparator}${infer StringWithParamMatch}`
      ? StringWithParamMatch extends `${string}${SanityQueryTermSeparator}${infer ParamMatch}`
        ? Trim<ParamMatch>
        : Trim<StringWithParamMatch>
      : never
    : never;

// Debug
// export type GetSanityTypedQueryParamsForDebug<
//   Query extends keyof SanityQueries,
// > = [
//   GetSanityTypedQueryType<Query>,
//   GetSanityTypedQueryParamNames<Query>,
//   GetSanityTypedQueryParamMatch<Query>,
// ];

export type GetSanityTypedQueryParamsFor<
  Query extends keyof SanityQueries,
  ParamName extends string = GetSanityTypedQueryParamNames<Query>,
> = {
  [Key in ParamName]: WalkObjectPath<
    DeepRequired<
      Extract<
        Sanity.AllSanitySchemaTypes,
        {
          _type: GetSanityTypedQueryType<Query>;
        }
      >
    >,
    GetSanityTypedQueryParamMatch<Query, ParamName>
  >;
};
