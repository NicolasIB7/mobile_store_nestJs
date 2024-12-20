const MAX_TAKE_PER_QUERY = 50

export const formatTake = (value: string): number => {
  let x = Number(value)
  if (x > MAX_TAKE_PER_QUERY || Number.isNaN(x)) {
    x = MAX_TAKE_PER_QUERY
  }

  return x
}


