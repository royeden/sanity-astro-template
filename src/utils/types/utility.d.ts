export type ExplicitOmit<T extends object, K extends keyof T> = Omit<T, K>;

export type Trim<S extends string, Separator extends string = " "> = S extends
  | `${Separator}${infer T}`
  | `${infer T}${Separator}`
  ? Trim<T, Separator>
  : S;

type DeepRequired<T> = T extends object
  ? {
      [Key in keyof T]-?: DeepRequired<T[Key]>;
    }
  : T;

export type WalkObjectPath<
  Source extends object,
  Path extends string,
> = Path extends keyof Source
  ? Source[Path]
  : Path extends `${infer MaybeKey}.${infer RemainingPath}`
    ? MaybeKey extends keyof Source
      ? Source[MaybeKey] extends object
        ? WalkObjectPath<Source[MaybeKey], RemainingPath>
        : never
      : never
    : never;

export type UnionToIntersection<Union> = (
  Union extends unknown ? (arg: Union) => 0 : never
) extends (arg: infer Intersection) => 0
  ? Intersection
  : never;

export type LastInUnion<Union> =
  UnionToIntersection<Union extends unknown ? (x: Union) => 0 : never> extends (
    x: infer Last
  ) => 0
    ? Last
    : never;
