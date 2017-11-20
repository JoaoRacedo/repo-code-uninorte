// @flow

const numSecondsPerInterval = [
  {
    numSeconds: 31536000,
    unit: 'years',
  },
  {
    numSeconds: 2592000,
    unit: 'months',
  },
  {
    numSeconds: 86400,
    unit: 'days',
  },
  {
    numSeconds: 3600,
    unit: 'hours',
  },
  {
    numSeconds: 60,
    unit: 'minutes',
  },
];

export default function timeSince(date: Date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  const result = numSecondsPerInterval
    .map(item => ({
      ...item,
      value: Math.floor(seconds / item.numSeconds),
    }))
    .find(item => item.value > 1);

  return result ? ({
    unit: result.unit,
    value: result.value,
  }) : ({
    unit: 'seconds',
    value: Math.floor(seconds),
  });
}
