export type ProgramItem = {
  id: number;
  timeSlot: string;
  title: string;
  description: string;
  orderIndex: number;
};

export function parseTimeSlot(timeSlot: string): number {
  const match = timeSlot.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return NaN;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

export function programStartMinutes(program: ProgramItem[]): number {
  return Math.min(
    ...program.map((item) => parseTimeSlot(item.timeSlot)).filter(Number.isFinite),
  );
}

export function programEndMinutes(program: ProgramItem[]): number {
  return Math.max(
    ...program.map((item) => parseTimeSlot(item.timeSlot)).filter(Number.isFinite),
  );
}

export function getCurrentPhase(
  program: ProgramItem[],
  now: Date,
): { index: number; isLive: boolean; inProgress: boolean } {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const start = programStartMinutes(program);
  const end = programEndMinutes(program);

  if (minutes < start) return { index: -1, isLive: false, inProgress: false };
  if (minutes > end + 30)
    return { index: program.length - 1, isLive: false, inProgress: false };

  let index = 0;
  for (let i = 0; i < program.length; i++) {
    const t = parseTimeSlot(program[i].timeSlot);
    if (Number.isFinite(t) && minutes >= t) index = i;
  }
  const current = parseTimeSlot(program[index].timeSlot);
  const next = program[index + 1] ? parseTimeSlot(program[index + 1].timeSlot) : Infinity;
  const isLive = Number.isFinite(current) && minutes >= current && minutes < next;

  return { index, isLive, inProgress: isLive };
}
