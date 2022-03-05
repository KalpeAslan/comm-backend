export const utils = {
  getDifferentTime(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date1.getTime() - date2.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600));
    return diffDays
  }
}