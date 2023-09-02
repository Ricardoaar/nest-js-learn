export function serializeQuery({ limit, offset }: any) {
  return {
    limit: Number(limit),
    offset: Number(offset),
  };

}