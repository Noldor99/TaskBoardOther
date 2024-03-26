import dayjs from 'dayjs'

export const dateHelpers = {
  getDayMonthYear: (date?: Date | string) => dayjs(date).format('DD/MM/YYYY'),
  getMonthDayHour: (date?: Date | string) => dayjs(date).format('MMMM DD, HH:mm'),
}
